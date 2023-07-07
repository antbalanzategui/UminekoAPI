import requests
from bs4 import BeautifulSoup
import mysql.connector
import os
from dotenv import load_dotenv
import re
from datetime import datetime


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
]

episode = 1
id = 1
for url in urls:
    print(url)
    response = requests.get(url)
    soup = BeautifulSoup(response.text, "html.parser")

    # Find the div with the class "mw-parser-output"

    div = soup.find("div", class_="mw-parser-output")
    h3_list = div.find_all("h3")

    for h3 in h3_list:
        
        # Find the span tag within the h3 element with the ID "Deaths"
        span = h3.find("span", id="Deaths")
        if span:
            ul = h3.find_next_sibling("ul")
            if ul:
                for li in ul.find_all("li"):
                    match = re.match(r"^(.*?), (.*?)(?: on| and) (.*?) as part of the (.*?) twilight", li.text)
                    if match:
                        character_name = match.group(1)
                        action = match.group(2)
                        raw_date = match.group(3)
                        twilight = match.group(4)
                        date_match = re.search(r"\b(\w+ \d+, \d{4})\b", raw_date)
                        date = date_match.group(1) if date_match else raw_date
                        released_date = datetime.strptime(date.strip(), "%B %d, %Y").strftime("%Y-%m-%d")
                        print("Id:", id)
                        print("Type: Death")
                        print(f"Character Name: {character_name.strip()}")
                        print(f"Action: {action.strip()}")
                        print(f"Date:", released_date)
                        print(f"Twilight: {twilight.strip()}")
                        print("Episode:", episode)
                        sql = "INSERT INTO uminekoapi.fatalities (id, type, name, action, date, twilight, episode) VALUES (%s, %s, %s, %s, %s, %s, %s)"
                        mycursor.execute(sql, (id, "Death", character_name.strip(), action.strip(), released_date, twilight.strip(), episode))
                        id = id + 1

    episode = episode + 1


    
    print()

mydb.commit()



