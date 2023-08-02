import requests
from bs4 import BeautifulSoup
import re
import mysql.connector
import os
from dotenv import load_dotenv

urls = [
    "https://whentheycry.miraheze.org/wiki/Red_Truth",
    "https://whentheycry.miraheze.org/wiki/Blue_Truth",
    "https://whentheycry.miraheze.org/wiki/Purple_declaration",
    "https://whentheycry.miraheze.org/wiki/Golden_Truth",
]

types = [
    "Red",
    "Blue",
    "Purple",
    "Golden",
]

episodeMap = {"Legend of the Golden Witch": 1,
    "Turn of the Golden Witch": 2,
    "Banquet of the Golden Witch": 3,
    "Alliance of the Golden Witch": 4,
    "End of the Golden Witch": 5,
    "Dawn of the Golden Witch": 6,
    "Requiem of the Golden Witch": 7,
    "Twilight of the Golden Witch": 8,
    "Twilight of the Golden Witch (manga)": 8}

id = 1

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


#DB structure should be
# id
# type
# episode
# character
# statement

for url, type in zip(urls, types):
    print(url)
    print(type)
    response = requests.get(url)
    soup = BeautifulSoup(response.text, "html.parser")
    div = soup.find("div", class_="mw-parser-output")

    for h2 in div.find_all("h2"):
        span_tag = h2.find("span", class_="mw-headline")
        if span_tag:
            ol_tags = h2.find_next_siblings("ol")
            for ol_tag in ol_tags:
                li_tags = ol_tag.find_all("li")
                for li_tag in li_tags:

                    print("Id:", id)
                    print("Type:", type)
                    episode = episodeMap.get(span_tag.get_text())
                    if episode is None:
                        episode = 0
                    print("Episode:", episode)
                    statement = li_tag.get_text()
                    character = "None"
                    # Check if the statement contains "Character:" convention
                    match = re.match(r"^(.*?):\s+(.*)$", statement)
                    if match:
                        character, statement = match.groups()
                    print("Character:", character)
                    print("Statement:", statement)
                    sql = "INSERT INTO uminekoapi.statements (id, type, episode, person, statement) VALUES (%s, %s, %s, %s, %s)"
                    mycursor.execute(sql, (id, type, episode, character, statement))
                    id = id + 1

mydb.commit()
    