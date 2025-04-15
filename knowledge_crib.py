import numpy as np
import os  
from langchain_core.prompts import PromptTemplate 
from langchain_openai import ChatOpenAI
from langchain.chains import LLMChain
from langchain.memory import ConversationBufferMemory
import openai
import random
import re
import json

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
    input_variables=['month_of_pregnancy', 'mother_age', 'topic'], 
    template=(
        "Find 4 articles about {topic} from healthline.com."
        "Ensure that the articles are suitable for a pregnant women in month {month_of_pregnancy}."
        "Provide the url links to the articles."
        "Format each article as: Title: <title>, URL: <url>"
    )
)

model = ChatOpenAI(model='gpt-3.5-turbo-16k', temperature=0.8)
memoryT = ConversationBufferMemory(input_key='topic', memory_key='chat_history')
chainT = LLMChain(llm=model, prompt=article_search_template, verbose=True, output_key='article_search', memory=memoryT)

# Call the Model

def call_model(month_of_pregnancy, topic):
    '''
    This function calls the model and outputs the formatted
    URLs of the articles that the user searches for.
    '''
    returned_articles = chainT.run(month_of_pregnancy=month_of_pregnancy, topic=selected_topic)
    return returned_articles


def parse_articles(output):
    '''
    This function takes the string model output and formats it into a dictionary
    '''
    articles = dict()
    # Regex to match: Title: ..., URL: ...
    pattern = r"Title:\s*(.*?)\s*,?\s*URL:\s*(\S+)"
    matches = re.findall(pattern, output)
    for title, url in matches:
        articles[title.strip()] =  url.strip()
    return articles


def save_to_json(articles_dict):
    '''
    Save articles to json to make it show up later
    '''
    output_dict = dict()
    for key,value in articles_dict.items():
        ### This is randomly generated rn, need to integrate to get user input
        saved = random.randint(0, 1)
        if saved == 1:
            output_dict[key] = value
    with open("saved_articles.json", "w") as f:
        json.dump(output_dict, f, indent=2)
    return output_dict

def ui_knowledge_crib_call_wrapper(month_of_pregnancy, topic, mother_age):
    '''
    This is a wrapper function that will be called every time the user enters 
    the knowledge crib interface and clicks on a particular topic.
    '''

    ### Call the model
    model_output = call_model(month_of_pregnancy=month_of_pregnancy
                              , topic = topic)
    
    ### Parse the model output
    recommeneded_articles_to_dictionary = parse_articles(model_output)

    ### Save the articles
    save_to_json(recommeneded_articles_to_dictionary)

    return None









