import mysql.connector
import os
from dotenv import load_dotenv


class Rule:
    def __init__(self, id, name, description):
        self.id = id
        self.name = name
        self.description = description
        self.type = type;

class GlossaryTerm:
    def __init__(self, id, name, description):
        self.id = id
        self.name = name
        self.description = description

def read_objects_from_file(filename):
    objects = []
    with open(filename, 'r') as file:
        lines = file.readlines()

    i = 0
    while i < len(lines):
        if lines[i].startswith("ID:"):
            id = int(lines[i].split(':')[1].strip())
            name = lines[i+1].split(':')[1].strip()
            description = lines[i+2].split(':')[1].strip()
            if lines[i+3].startswith("Type:"):
                # Read a rule object
                objects.append(Rule(id, name, description))
                i += 3
            else:
                # Read a glossary term object
                objects.append(GlossaryTerm(id, name, description))
                i += 2
        i += 1

    return objects

# Usage example
filename = 'info.txt'
objects = read_objects_from_file(filename)


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

# Print the objects
for obj in objects:
    if isinstance(obj, Rule):
        print("Rule ID:", obj.id)
        print("Name:", obj.name)
        print("Description:", obj.description)
        print("Type: Rules")
        sql = "INSERT INTO uminekoapi.information (id, name, description, type) VALUES (%s, %s, %s, %s)"
        if (obj.id >= 31):
            mycursor.execute(sql, (obj.id, obj.name, obj.description, "Glossary"))
        else:
            mycursor.execute(sql, (obj.id, obj.name, obj.description, "Rules"))


mydb.commit()

