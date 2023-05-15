from vndb_thigh_highs import VNDB
from vndb_thigh_highs.models import Character
import re
import mysql.connector
import os
from dotenv import load_dotenv

vndb = VNDB()

characters = vndb.get_all_character(Character.vn_id == 24)

id = 1
load_dotenv()
db_host = os.getenv("DB_HOST")
db_user = os.getenv("DB_USER")
db_password = os.getenv("DB_PASSWORD")
db_database = os.getenv("DB_DATABASE")


mydb = mysql.connector.connect(
    host=db_host,
    user=db_user,
    password=db_password,
    database=db_database
)
# create a cursor object
mycursor = mydb.cursor()

def remove_tags(description):
    # Replace [url=/c#] with an empty string
    description = re.sub(r'\[url=/c\d+\]', '', description)
    # Replace [/url] with an empty string
    description = re.sub(r'\[/url\]', '', description)
    return description


def clean_text(text):
    # remove [Edited from [url=<...>]]
    text = re.sub(r'\[Edited from \[url=.*?\]\](.*?)\[/url\]\]', r'\1', text)
    # remove [From [url=<...>].]
    text = re.sub(r'\[From \[url=.*?\]\.\](.*?)\[/url\]\.\]', r'\1', text)
    # remove all remaining square brackets and their contents
    text = re.sub(r'\[.*?\]', '', text)
    return text


for character in characters:
    print("Id:", id)
    print("Character Name:", character.name)
    print("Age:", character.age)
    print("Blood Type:", character.blood_type)
    print("Gender:", str(character.gender))

    name = character.name
    image = character.image
    age = character.age
    gender = str(character.gender).replace("Gender.", "").lower().capitalize()
    bloodType = str(character.blood_type).replace("BloodType.", "")
    print("Image:", character.image)
    descWithoutTags = remove_tags(character.description)
    descWithoutTags = descWithoutTags.replace("Wikipedia]", "")
    descWithoutTags = descWithoutTags.replace("Wikipedia.]", "")
    descWithoutTags = descWithoutTags.replace("Wikipedia", "")
    descWithoutTags = descWithoutTags.replace("Lambdadelta on 07th Expansion Wiki]", "")
    descWithoutTags = descWithoutTags.replace("Bernkastel on 07th Expansion Wiki]", "")
    finalizedDesc = clean_text(descWithoutTags)
    finalfinalDesc = finalizedDesc.strip()
    print("Description:", finalfinalDesc)
    print("Month:", character.birthday.month)
    print("Day:", character.birthday.day)
    monthOfBirth = character.birthday.month
    dayOfBirth = character.birthday.month
    #sql = "INSERT INTO uminekoapi.characters (id, name, img, description, age, gender, bloodType, monthOfBirth, dayOfBirth) VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s)"
    #mycursor.execute(sql, (id, name, image, finalizedDesc, age, gender, bloodType, monthOfBirth, dayOfBirth))
    id = id + 1

#for quote in quotes:
    #print("Quote Id:", quoteId)
    #print("Text:", quote.quote)
    #print("Visual Novel Title:", quote.vn_title)
    #quoteId = quoteId + 1

#quoteId = 1
#quotes2 = vndb.get_all_quote(Quote.vn_id == 2153)
#for quote in quotes2:
    #print("Quote Id:", quoteId)
    #print("Text:", quote.quote)
    #print("Visual Novel Title:", quote.vn_title)
    #quoteId = quoteId + 1

mydb.commit()