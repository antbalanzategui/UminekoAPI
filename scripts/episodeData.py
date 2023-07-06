# https://whentheycry.miraheze.org/wiki/Legend_of_the_Golden_Witch
# https://whentheycry.miraheze.org/wiki/Turn_of_the_Golden_Witch
# https://whentheycry.miraheze.org/wiki/Banquet_of_the_Golden_Witch
# https://whentheycry.miraheze.org/wiki/Alliance_of_the_Golden_Witch
# https://whentheycry.miraheze.org/wiki/End_of_the_Golden_Witch
# https://whentheycry.miraheze.org/wiki/Dawn_of_the_Golden_Witch
# https://wiki.whentheycry.org/wiki/Requiem_of_the_Golden_Witch
# https://wiki.whentheycry.org/wiki/Twilight_of_the_Golden_Witch


# Create Episode Objects
#  Id, Developer, Publisher, Arc Type, Word Count, Title

# Create truths database map to Episode optionally
# Map currently portraits to episodes 
# Map Deaths information in a seperate database, Which is still found on URLs above, with despar in Deaths/Dissapear...
import requests
from bs4 import BeautifulSoup
import mysql.connector
import os
from dotenv import load_dotenv
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
    "https://wiki.whentheycry.org/wiki/Requiem_of_the_Golden_Witch",
    "https://wiki.whentheycry.org/wiki/Twilight_of_the_Golden_Witch"
]

title = [
    "Legend of the Golden Witch",
    "Turn of the Golden Witch",
    "Banquet of the Golden Witch",
    "Alliance of the Golden Witch",
    "End of the Golden Witch",
    "Dawn of the Golden Witch",
    "Requiem of the Golden Witch",
    "Twilight of the Golden Witch"
]


id = 1



for url, episode_title in zip(urls, title):
    response = requests.get(url)
    soup = BeautifulSoup(response.text, "html.parser")

    # Find the div with the class "mw-parser-output"
    div = soup.find("div", class_="mw-parser-output")

    # Find the first occurrence of the table within the div
    table = div.find("table")

    # Find the tbody within the table
    tbody = table.find("tbody")

    # Find the required tr tags (first, third, fourth, fifth, sixth, and seventh)
    tr_tags = tbody.find_all("tr")



    selected_tr_tags = [tr_tags[2], tr_tags[3], tr_tags[4], tr_tags[5], tr_tags[6]]


    developer = tr_tags[2].find("td").text.strip()
    publisher = tr_tags[3].find("td").text.strip()
    arcType = tr_tags[4].find("td").text.strip()
    released = tr_tags[5].find("td").text.strip().split(" (")[0]
    comiket_number = tr_tags[5].find("td").text.strip().split(" (")[1][1:-1]
    wordCount = tr_tags[6].find("td").text.strip().split("[")[0].strip()
    released_date = datetime.strptime(released, "%B %d, %Y").strftime("%Y-%m-%d")


    print("Episode:", id)
    print("Developer:", developer)
    print("Publisher:", publisher)
    print("Arc Type:", arcType)
    print("Released:", released_date)
    print("Comiket Number:", comiket_number)
    print("Word Count:", wordCount)


    sql = "INSERT INTO uminekoapi.episode (id, developer, publisher, type, releaseDate, comiketNum, wordCount) VALUES (%s, %s, %s, %s, %s, %s, %s)"
    mycursor.execute(sql, (id, developer, publisher, arcType, released_date, comiket_number, wordCount))
    id = id + 1

mydb.commit()





