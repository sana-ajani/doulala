from langchain.document_loaders import PyPDFLoader  
from langchain.text_splitter import RecursiveCharacterTextSplitter 
from langchain.embeddings import HuggingFaceEmbeddings  
import faiss
import numpy as np
import os  
from transformers import AutoModelForCausalLM, AutoTokenizer 
from langchain.chains import RunnableLambda, RunnablePassthrough
from langchain.chat_models import ChatOpenAI
from langchain.vector_store import FAISS 
from langchain.prompts import PromptTemplate


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
        self.loaded_docs = spliter.split(self.loaded_docs)
    def load(self):
        return self.loaded_docs  
class Vectorstore: 
    def __init__(self, loaded_docs,): 
        # builds out VS which stores any docs for acess
        self.embedding_model = HuggingFaceEmbeddings(model_name="sentence-transformers/all-MiniLM-L6-v2")
        self.document_embeddings = self.embedding_model.embed_documents([doc.page_content for doc in document_chunks]) 
        dim = len(self.document_embeddings[0]) 
        self.index = faiss.IndexFlatL2(dim) 
        self.index.add(np.array(self.document_embeddings))  
        self.vectorstore = FAISS.from_documents(self.document_chunks, self.document_embeddingsembedding_model) 
        retriever = self.vectorstore.as_retriever()
        self.retriever = self.vector_store.as_retriever() 
        self.vectorstore.save_local("Doulala_VectorStore") 
    def load(self, path="Doulala_VectorStore"):
        return FAISS.load_local(path, self.embedding_model)
class Doulala_model_build:  
    def __init__(self, vectorstore, prompt_structure):  
        self.loaded_docs = DoulalaLoader(path="/folder/path")
        self.vectorstore = Vectorstore(document_chunks=self.loaded_docs) # need to figure out weather running loader class externaly  internaly       
        # model generator ( unsure which model to use) 
        self.model_name = "gpt-3.5-turbo" 
        self.tokenizer = self.AutoTokenizer.from_pretrained(self.model_name)
        self.model = self.AutoModelForCausalLM.from_pretrained(self.model_name) 
        # base llm ( model used as bases for RAG and initial interpertation of the prompt)
        self.llm = self.ChatOpenAI(model_name=self.model_name, temperature=0.3, 
                                openai_api_key="sk-...", 
                                tokenizer=self.tokenizer) 
        #Notes + question on ChatAI (  what do we prortize for different parameters 
        # I am guessinng  that we want accuracy over creativity (i.e low temp), also 
        # I am unsure if I should just give it my API key or to lik it to a group account 
        
        # RAGLayer (searches Doulala model) 
        self.RagLayer = self.RetrievalQA.from_chain_type(llm=self.llm, 
                                                         retriever=self.retriever) 
        # Prompt Template 
        self.prompt_template = self.PromptTemplate(prompt_structure)  
        def build(self):  
            self.Lala = (self.prompt_template | self.llm 
            | RunnableLambda(lambda x: {"query": x}) | self.RAGLayer)
            return self.Lala
        
prompt_structure = """
You are Doulala, a highly knowledgeable and deeply empathetic medical assistant who specializes in supporting women during pregnancy — across all trimesters.

Your role is to:
- Provide clear, medically accurate information rooted in trusted health sources.
- Respond in a tone that is warm, validating, reassuring, and emotionally intelligent.
- Recognize that pregnancy is not only a medical journey, but also a physical, emotional, and mental one.
- Help the person feel seen, safe, and genuinely cared for.

Tone guidelines:
- Speak with gentle confidence and emotional sensitivity.
- Acknowledge feelings, not just symptoms.
- Avoid robotic or clinical phrasing — sound like a wise, kind friend who’s well-informed.
- Never judge. Always reassure and empower.

User Question: {input}

Doulala’s Response:
"""  



    



        
 



