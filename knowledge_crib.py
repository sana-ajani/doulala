import numpy as np
import os  
from langchain_core.prompts import PromptTemplate 
from langchain_openai import ChatOpenAI
from langchain.chains import LLMChain
from langchain.memory import ConversationBufferMemory
import openai
from fastapi import FastAPI
import random
import re
import json
from langchain_community.tools import DuckDuckGoSearchRun 
from langchain.agents import Tool 
from pydantic import BaseModel

from dotenv import load_dotenv
load_dotenv()  # Loads from .env file the API key

### These are the options that the user can select from
knowledge_topics = ['patient_development'
                 , 'child_development'
                 , 'lifestyle'
                 , 'risks'
                 , 'wellness_mindfulness'
                 ]

 ### hard-coded values but would pull from user-profile, not sure how to do

month_of_pregnancy = 3
mother_age = 27

def clean_topic(topic, month_of_pregnancy):
    '''
    This function translates the user input of topic into a clean value for the model.
    '''
    if topic == 'patient_development':
        cleaned = 'Mother Development at Month ' + str(month_of_pregnancy)
    elif topic == 'child_development':
        cleaned = 'Fetal Development at Month ' + str(month_of_pregnancy)
    elif topic == 'lifestyle':
        cleaned = 'Lifestyle for Women in Month ' + str(month_of_pregnancy) + ' of pregnancy'
    elif topic == 'risks':
        cleaned = 'Risks for Women in Month ' + str(month_of_pregnancy) + ' of pregnancy'
    else:
        cleaned = 'Wellness Practices for Pregnant Women'
    return cleaned


selected_topic = clean_topic(random.choice(knowledge_topics), month_of_pregnancy)

### Model Set Up
article_search_template = PromptTemplate(
    input_variables=['month_of_pregnancy', 'mother_age', 'topic', 'search_results'], 
    template=(
        "Based on the following search results from Healthline, find 4 relevant articles about {topic}."
        "Ensure that the articles are suitable for a pregnant women in month {month_of_pregnancy}."
        "Search Results: {search_results}"
        "Format each article as: Title: <title>, URL: <url>"
    )
)

model = ChatOpenAI(model='gpt-3.5-turbo-16k', temperature=0.8)
memoryT = ConversationBufferMemory(input_key='topic', memory_key='chat_history')
chainT = LLMChain(llm=model, prompt=article_search_template, verbose=True, output_key='article_search', memory=memoryT)

# Call the Model

class ArticleSaver:
    def __init__(self):
        self.articles_dict = {}

    def parse_and_save_articles(self, raw_output: str, filename="saved_articles.json"):
        """
        Parse the raw model output and immediately save selected articles.
        """
        # Parse the articles from the string
        pattern = r"Title:\s*(.*?)\s*,?\s*URL:\s*(\S+)"
        matches = re.findall(pattern, raw_output)

        # Store parsed articles
        self.articles_dict = {title.strip(): url.strip() for title, url in matches}

        # Prompt user to save each one
        output_dict = {}
        for title, url in self.articles_dict.items():
            save = input(f"Save article '{title}'? (y/n): ").strip().lower()
            if save == 'y':
                output_dict[title] = url

        with open(filename, "w") as f:
            json.dump(output_dict, f, indent=2)

        return output_dict

class KnowledgeCrib: 
    def __init__(self):
        self.model = ChatOpenAI(model='gpt-3.5-turbo-16k', temperature=0.8)
        self.memoryT = ConversationBufferMemory(input_key='topic', memory_key='chat_history')
        
        # Initialize the search tool
        self.search = DuckDuckGoSearchRun()
        self.healthline_search = Tool(
            name="Healthline Search",
            func=lambda query: self.search.run(f"site:healthline.com {query}"),
            description="Search for information on Healthline.com. Input should be a search query."
        )
        
        self.chainT = LLMChain(llm=self.model, prompt=article_search_template, verbose=True, output_key='article_search', memory=self.memoryT)
    
    def call_model(self, month_of_pregnancy, topic):
        '''
        This function calls the model and outputs the formatted
        URLs of the articles that the user searches for.
        '''
        # Use the Healthline search tool to get relevant articles
        search_query = f"{topic} month {month_of_pregnancy} pregnancy"
        search_results = self.healthline_search.run(search_query)
        
        # Pass the search results to the model
        returned_articles = self.chainT.run(
            month_of_pregnancy=month_of_pregnancy, 
            topic=topic,
            search_results=search_results
        )
        return returned_articles
    
    def call_KnowledgeCrib(self, month_of_pregnancy, topic):
        '''
        This is a wrapper function that will be called every time the user enters 
        the knowledge crib interface and clicks on a particular topic.
        '''
        # Call the model
        model_output = self.call_model(month_of_pregnancy=month_of_pregnancy, topic=topic)
        
        # Parse the model output
        recommeneded_articles_to_dictionary = model_output.parse_and_save_articles()

        return recommeneded_articles_to_dictionary  


KnowledgeCrib_model = KnowledgeCrib() 
knowledge_crib_API = FastAPI() 
class UserQuery(BaseModel):
    month_of_pregnancy: str
    topic: str  
class ModelResponse(BaseModel):
    response: str

# POST endpoint
@knowledge_crib_API.post("/crib",  response_model=ModelResponse)
async def query_model(data: UserQuery):
    model_input = {
        "month_of_pregnancy": data.month_of_pregnancy,
        "topic": data.topic
    }
    response = KnowledgeCrib_model.call_KnowledgeCrib(model_input)
    return {"response": response}










