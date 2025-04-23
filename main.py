from langchain_community.document_loaders import PyPDFLoader  
from langchain.text_splitter import RecursiveCharacterTextSplitter 
from langchain_huggingface import HuggingFaceEmbeddings
import numpy as np
import os  
from transformers import AutoModelForCausalLM, AutoTokenizer
from langchain_community.vectorstores import FAISS
from langchain_core.runnables import RunnableLambda, RunnablePassthrough
from langchain_openai import ChatOpenAI
from langchain_core.prompts import PromptTemplate 
from langchain.memory import ConversationBufferMemory
from langchain.chains import LLMChain, RetrievalQA
from fastapi import FastAPI
from pydantic import BaseModel
import faiss
from config import OPENAI_API_KEY, MODEL_NAME, TEMPERATURE 
from fastapi_app.main import fastapi_handler  
from pydantic import BaseModel

# Set environment variables
os.environ["OPENAI_API_KEY"] = OPENAI_API_KEY
os.environ["MODEL_NAME"] = MODEL_NAME
os.environ["TEMPERATURE"] = str(TEMPERATURE)

# Define the prompt structure
PROMPT_STRUCTURE = """
You are Doulala, a highly knowledgeable and deeply empathetic medical assistant who specializes in supporting women during pregnancy — across all trimesters.

Your role is to:
- Provide clear, medically accurate information rooted in trusted health sources.
- Respond in a tone that is warm, validating, reassuring, and emotionally intelligent.
- Recognize that pregnancy is not only a medical journey, but also a physical, emotional, and mental one.
- Help the person feel seen, safe, and genuinely cared for.

Tone guidelines:
- Speak with gentle confidence and emotional sensitivity.
- Acknowledge feelings, not just symptoms.
- Avoid robotic or clinical phrasing — sound like a wise, kind friend who's well-informed.
- Never judge. Always reassure and empower.

Citation guidelines:
- Cite sources in MLA format using the title of the source
- Include the title in parentheses after the relevant information

User Question: {input}

Doulala's Response: 
Please include citations or references to the sources that informed your response, especially if retrieved from external documents.
"""

class DoulalaLoader(PyPDFLoader, RecursiveCharacterTextSplitter): 
    def __init__(self, path): 
        self.path = path 
        self.docs = [i for i in os.listdir(self.path) if i.endswith(".pdf")]
        self.loaded_docs = [] 
        for doc in self.docs: 
            pdf_path = PyPDFLoader(os.path.join(self.path, doc)) 
            docs = pdf_path.load() 
            self.loaded_docs.extend(docs)
        spliter = RecursiveCharacterTextSplitter(chunk_size=500, chunk_overlap=50) 
        self.loaded_docs = spliter.split_documents(self.loaded_docs)
    def load(self):
        return self.loaded_docs

class Vectorstore: 
    def __init__(self, loaded_docs,): 
        # builds out VS which stores any docs for acess
        self.embedding_model = HuggingFaceEmbeddings(model_name="sentence-transformers/all-MiniLM-L6-v2")
        self.document_embeddings = self.embedding_model.embed_documents([doc.page_content for doc in loaded_docs]) 
        dim = len(self.document_embeddings[0]) 
        self.index = faiss.IndexFlatL2(dim) 
        self.index.add(np.array(self.document_embeddings))  
        self.vectorstore = FAISS.from_documents(loaded_docs, self.embedding_model) 
        self.retriever = self.vectorstore.as_retriever() 
        self.vectorstore.save_local("Doulala_VectorStore") 
    
    def load(self, path="Doulala_VectorStore"):
        return FAISS.load_local(path, self.embedding_model)
class Doulala_model_build:  
    def __init__(self):  
        base_dir = os.path.dirname(os.path.abspath(__file__))
        doc_path = os.path.join(base_dir, "Doulala_Docs")
        self.loaded_docs = DoulalaLoader(path=doc_path).load()
        self.vectorstore = Vectorstore(loaded_docs=self.loaded_docs)
        
        # Get configuration from environment variables
        self.model_name = os.getenv("MODEL_NAME", "gpt-3.5-turbo")
        self.temperature = float(os.getenv("TEMPERATURE", "0.3"))
        
        # Initialize the LLM with environment variables
        self.llm = ChatOpenAI(
            model_name=self.model_name,
            temperature=self.temperature,
            openai_api_key=os.getenv("OPENAI_API_KEY")
        )
        
        self.RagLayer = RetrievalQA.from_chain_type(llm=self.llm, 
                                                   retriever=self.vectorstore.retriever) 
        # Prompt Template 
        self.prompt_template = PromptTemplate(template=PROMPT_STRUCTURE)
        
        # Memory
        self.memory = ConversationBufferMemory()
        
        #Chain Prompt Template model and memory
        self.llm_chain = LLMChain(llm=self.llm, prompt=self.prompt_template, memory=self.memory)
        
    def build(self):  
        self.Lala = (
            self.llm_chain 
            | RunnableLambda(lambda x: {"query": x["text"]}) 
            | self.RagLayer
        )
        return self.Lala

# Initialize the model without passing prompt_structure
model = Doulala_model_build() 
model.build()  # Build the model before using it

# Simple test command
test_input = "What are the common symptoms in the first trimester of pregnancy?"
test_response = model.Lala.invoke({"input": test_input})
print("\nTest Response:")
print(test_response)

Lala_API = FastAPI() 
class UserQuery(BaseModel):
    input: str 
class ModelResponse():
    response: str

# POST endpoint
@Lala_API.post("/query",  response_model=ModelResponse)
async def query_model(data: UserQuery):
    response = model.Lala.invoke({"input": data.input})
    return {"response": response}




        




    



        
 



