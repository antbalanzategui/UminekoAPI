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
    "https://whentheycry.miraheze.org/wiki/Turn_of_the_Golden_Witch",
    "https://whentheycry.miraheze.org/wiki/Banquet_of_the_Golden_Witch",
]

# George Ushiromiya, disappeared on the night of October 5, 1986 as part of the tenth twilight.
#Jessica Ushiromiya, disappeared on the night of October 5, 1986 as part of the tenth twilight.
#Maria Ushiromiya, disappeared on the night of October 5, 1986 as part of the tenth twilight.
#Battler Ushiromiya, disappeared on the night of October 5, 1986 as part of the tenth twilight.

sql = "INSERT INTO uminekoapi.fatalities (id, type, name, action, date, twilight, episode) VALUES (%s, %s, %s, %s, %s, %s, %s)"
mycursor.execute(sql, (75, "Disappearance", "George Ushiromiya", "NA", "1986-10-05", "tenth", 1))

sql = "INSERT INTO uminekoapi.fatalities (id, type, name, action, date, twilight, episode) VALUES (%s, %s, %s, %s, %s, %s, %s)"
mycursor.execute(sql, (76, "Disappearance", "Jessica Ushiromiya", "NA", "1986-10-05", "tenth", 1))

sql = "INSERT INTO uminekoapi.fatalities (id, type, name, action, date, twilight, episode) VALUES (%s, %s, %s, %s, %s, %s, %s)"
mycursor.execute(sql, (77, "Disappearance", "Maria Ushiromiya", "NA", "1986-10-05", "tenth", 1))

sql = "INSERT INTO uminekoapi.fatalities (id, type, name, action, date, twilight, episode) VALUES (%s, %s, %s, %s, %s, %s, %s)"
mycursor.execute(sql, (78, "Disappearance", "Battler Ushiromiya", "NA", "1986-10-05", "tenth", 1))


episode = 2
id = 79

for url in urls:
    print(url)
    response = requests.get(url)
    soup = BeautifulSoup(response.text, "html.parser")

    # Find the div with the class "mw-parser-output"

    div = soup.find("div", class_="mw-parser-output")
    h3_list = div.find_all("h3")

    for h3 in h3_list:
        
        # Find the span tag within the h3 element with the ID "Deaths"
        span = h3.find("span", id="Disappearances")
        if span or h3.text == "Disappearances":
            ul = h3.find_next_sibling("ul")
            if ul:
                for li in ul.find_all("li"):
                    match = re.match(r"^(.*?), disappeared on (.*?) as part of the (.*?) twilight", li.text)
                    if match:
                        name = match.group(1)
                        date = match.group(2)
                        twilight = match.group(3)
                        print("Id:", id)
                        print(f"Name: {name.strip()}")
                        print(f"Date: {date.strip()}")
                        print(f"Twilight: {twilight.strip()}")
                        print("Episode:", episode)

                        released_date = datetime.strptime(date.strip(), "%B %d, %Y").strftime("%Y-%m-%d")

                        sql = "INSERT INTO uminekoapi.fatalities (id, type, name, action, date, twilight, episode) VALUES (%s, %s, %s, %s, %s, %s, %s)"
                        mycursor.execute(sql, (id, "Disappearance", name.strip(), "NA", released_date, twilight.strip(), episode))
                        id = id + 1

    episode = episode + 1


    
    print()

mydb.commit()


