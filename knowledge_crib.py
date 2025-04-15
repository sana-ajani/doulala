import numpy as np
import os  
from langchain_core.prompts import PromptTemplate 
from langchain_openai import ChatOpenAI
from langchain.chains import LLMChain
from langchain.memory import ConversationBufferMemory
import openai
import random
import re

from dotenv import load_dotenv
load_dotenv()  # Loads from .env file the API key

### These are the options that the user can select from

knowledge_topics = ['patient_development'
                 , 'child_development'
                 , 'lifestyle'
                 , 'risks'
                 , 'wellness_mindfulness'
                 ]


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




 ### hard-coded values but would pull from user-profile, not sure how to do
month_of_pregnancy = 3
mother_age = 27

selected_topic = clean_topic(random.choice(knowledge_topics), month_of_pregnancy)

### Ping the model to search for articles
article_search_template = PromptTemplate(
    input_variables=['month_of_pregnancy', 'mother_age', 'topic'], 
    template=(
        "Find 4 articles about {topic} from healthline.com."
        "Ensure that the articles are suitable for a pregnant women in month {month_of_pregnancy}."
        "Provide the url links to the articles."
        "Format each article as: Title: <title>, URL: <url>"
    )
)

# Importing the large language model OpenAI via LangChain
model = ChatOpenAI(model='gpt-3.5-turbo-16k', temperature=0.8)
memoryT = ConversationBufferMemory(input_key='topic', memory_key='chat_history')
chainT = LLMChain(llm=model, prompt=article_search_template, verbose=True, output_key='article_search', memory=memoryT)

# Call the Model
returned_articles = chainT.run(month_of_pregnancy=month_of_pregnancy, topic=selected_topic)

# Parse the articles into a dictionary that will be easier to show in the front end
def parse_articles(output):
    articles = []
    # Regex to match: Title: ..., URL: ...
    pattern = r"Title:\s*(.*?)\s*,?\s*URL:\s*(\S+)"
    matches = re.findall(pattern, output)
    for title, url in matches:
        articles.append({'title': title.strip(), 'url': url.strip()})
    return articles

articles_dictionary = parse_articles(returned_articles)

print(articles_dictionary)





