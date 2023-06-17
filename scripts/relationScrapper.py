import requests
from bs4 import BeautifulSoup
import mysql.connector
import os
from dotenv import load_dotenv
import re


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

skippedCharacters = {"Runon", "Renon", "Sanon", "Benon", "Manon", "Berune", "Asune", "Professor Ootsuki"}

for tag in tags:
    if tag.name == "h2":
        currentH2 = tag.text
    elif tag.name == "dt":
        aTag = tag.find("a")
        href = aTag.get("href")
        name = aTag.get("title")
        usableHref = baseUrl + href
        print(name)
        print("----------------------------------------------------------------------")
        if name not in skippedCharacters:
            response = requests.get(usableHref)
            charSoup = BeautifulSoup(response.content, "html.parser")
            table = charSoup.find("table", class_= "infobox")
            tbody = table.find('tbody')
            trArray = tbody.find_all('tr')
            lastTr = trArray[-1]
            if lastTr.get('class') == ['noprint']:
                lastTr = trArray[-2]

            lastTd = lastTr.find_all('td')[-1]
            plainlist = lastTd.find('div', class_='plainlist')
            liTags = plainlist.find_all('li')
            for li in liTags:
                counter = counter + 1
                atag = li.find('a')
                if atag:
                    person = atag.text
                    relation = re.search(r'\((.*?)\)', li.text).group(1) if re.search(r'\((.*?)\)', li.text) else ""
                    print(f"{counter}. {person} - {relation}")
                    sql = "INSERT INTO uminekoapi.relationships (id, personOne, personTwo, type) VALUES (%s, %s, %s, %s)"
                    mycursor.execute(sql, (counter, name, person, relation))


mydb.commit()


# Save the HTML content to a file
#with open("webpage.html", "w", encoding="utf-8") as file:
    #file.write(str(div_element))

#print("HTML file saved.")
