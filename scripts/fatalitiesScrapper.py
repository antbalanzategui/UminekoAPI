import requests
from bs4 import BeautifulSoup
import mysql.connector
import os
from dotenv import load_dotenv


load_dotenv()
db_host = os.getenv("DB_HOST")
db_user = os.getenv("DB_USER")
db_password = os.getenv("DB_PASSWORD")
db_database = os.getenv("DB_DATABASE")

# Establishing a connection to residing DataBase
mydb = mysql.connector.connect(
    host=db_host,
    user=db_user,
    password=db_password,
    database=db_database
)
# create a cursor object
mycursor = mydb.cursor()

# List of URLs to scrape
urls = [
    "https://whentheycry.miraheze.org/wiki/Legend_of_the_Golden_Witch",
    "https://whentheycry.miraheze.org/wiki/Turn_of_the_Golden_Witch",
    "https://whentheycry.miraheze.org/wiki/Banquet_of_the_Golden_Witch",
    "https://whentheycry.miraheze.org/wiki/Alliance_of_the_Golden_Witch",
    "https://whentheycry.miraheze.org/wiki/End_of_the_Golden_Witch",
    "https://whentheycry.miraheze.org/wiki/Dawn_of_the_Golden_Witch",
    "https://wiki.whentheycry.org/wiki/Requiem_of_the_Golden_Witch",
    "https://wiki.whentheycry.org/wiki/Twilight_of_the_Golden_Witch"
]


for url in urls:
    response = requests.get(url)
    soup = BeautifulSoup(response.text, "html.parser")

    # Find the div with the class "mw-parser-output"
    div = soup.find("div", class_="mw-parser-output")
    





