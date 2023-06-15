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


# Send a GET request to the URL
url = "https://whentheycry.miraheze.org/wiki/List_of_characters_in_Umineko_no_Naku_Koro_ni"
response = requests.get(url)

baseUrl = "https://whentheycry.miraheze.org"

# Create a BeautifulSoup object
soup = BeautifulSoup(response.content, "html.parser")

# Find the div element by class name
div_element = soup.find("div", class_="mw-parser-output")

tags = div_element.find_all(["h2", "dt"])

currentH2= ""
counter = 0
data = []

skippedCharacters = {"Runon", "Renon", "Sanon", "Benon", "Manon", "Berune", "Asune", "Ronove", "MARIA", "BATTLER", "ANGE-Beatrice", "EVA-Beatrice", "Captain Kawabata", "Beatrice Ushiromiya", "George Ushiromiya", "Rosa Ushiromiya"}

for tag in tags:
    if tag.name == "h2":
        currentH2 = tag.text
    elif tag.name == "dt":
        aTag = tag.find("a")
        href = aTag.get("href")
        name = aTag.get("title")
        usableHref = baseUrl + href
        if name not in skippedCharacters:
            response = requests.get(usableHref)
            charSoup = BeautifulSoup(response.content, "html.parser")
            spanTag = charSoup.find("span", id = "Trivia")
            h2Tag = spanTag.parent
            ulTag = h2Tag.find_next_sibling("ul")
            liTags = ulTag.find_all("li")
            for li in liTags:
                print(counter)
                print(li.text)
                print(currentH2)
                print(name)
                print("-----------------------")
                counter = counter + 1
                sql = "INSERT INTO uminekoapi.trivia (id, text, association, `character`) VALUES (%s, %s, %s, %s)"
                mycursor.execute(sql, (counter, li.text, currentH2, name))

mydb.commit()


# Save the HTML content to a file
#with open("webpage.html", "w", encoding="utf-8") as file:
    #file.write(str(div_element))

#print("HTML file saved.")
