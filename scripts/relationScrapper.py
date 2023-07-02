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

name_id_mapping = {
    "Battler Ushiromiya": 1,
    "Jessica Ushiromiya": 2,
    "George Ushiromiya": 3,
    "Maria Ushiromiya": 4,
    "Kinzo Ushiromiya": 5,
    "Shannon": 6,
    "Kanon": 7,
    "Rosa Ushiromiya": 8,
    "Rudolf Ushiromiya": 9,
    "Eva Ushiromiya": 10,
    "Hideyoshi Ushiromiya": 11,
    "Genji Ronoue": 12,
    "Toshiro Gohda": 13,
    "Chiyo Kumasawa": 14,
    "Krauss Ushiromiya": 15,
    "Natsuhi Ushiromiya": 16,
    "Beatrice": 17,
    "Terumasa Nanjo": 18,
    "Kyrie Ushiromiya": 19,
    "Bernkastel": 20,
    "Lambdadelta": 21,
    "Furfur": 22,
    "Ange Ushiromiya": 23,
    "Erika Furudo": 24,
    "Willard H. Wright": 25,
    "Lion Ushiromiya": 26,
    "Zepar": 27,
    "Ronove": 28,
    "Gaap": 29,
    "Virgilia": 30,
    "EVA-Beatrice": 31,
    "Lucifer": 32,
    "Leviathan": 33,
    "Satan": 34,
    "Belphegor": 35,
    "Mammon": 36,
    "Beelzebub": 37,
    "Asmodeus": 38,
    "Dlanor A. Knox": 39,
    "Amakusa Juuza": 40,
    "Beatrice Castiglioni": 41,
    "Cornelia": 42,
    "Gertrude": 43,
    "Featherine Augustus Aurora": 44,
    "Ikuko Hachijo": 45,
    "Beatrice Ushiromiya": 46,
    "Tetsurou Okonogi": 47,
    "Sakutarou": 48,
    "Clair Vaux Bernardus": 49,
    "Manon": 50,
    "Asune": 51,
    "Berune": 52,
    "Benon": 53,
    "Renon": 54,
    "Runon": 55,
    "Sanon": 56,
    "Chiester 410": 57,
    "Chiester 45": 58,
    "Chiester 00": 59,
    "Professor Ootsuki": 60,
    "Kawabata": 61,
    "Tohya Hachijo": 62,
    "Sayo Yasuda": 63
}

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
                    id = name_id_mapping.get(name)
                    if id is None:
                        id = -1
                    if name == 'MARIA':
                        id = 4
                    elif name == 'BATTLER':
                        id = 1
                    elif name == 'ANGE-Beatrice':
                        id = 23

                    # MARIA, BATTLER, ANGE-Beatrice, 
                    sql = "INSERT INTO uminekoapi.relationships (id, personOne, personTwo, type, charId) VALUES (%s, %s, %s, %s, %s)"
                    mycursor.execute(sql, (counter, name, person, relation, id))


mydb.commit()


# Save the HTML content to a file
#with open("webpage.html", "w", encoding="utf-8") as file:
    #file.write(str(div_element))

#print("HTML file saved.")
