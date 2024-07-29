import pymysql
import os
from dotenv import load_dotenv
from urllib.parse import urlparse

# Load environment variables from .env file
load_dotenv()

# Connection details for the source MySQL database
source_db = {
    'host': os.getenv("DB_HOST"),
    'user': os.getenv("DB_USER"),
    'password': os.getenv("DB_PASSWORD"),
    'database': os.getenv("DB_DATABASE")
}

# Parse the Railway MySQL URL
railway_url = os.getenv("RAILWAY_URL")
parsed_url = urlparse(railway_url)

# Connection details for the Railway MySQL database
destination_db = {
    'host': parsed_url.hostname,
    'user': parsed_url.username,
    'password': parsed_url.password,
    'database': parsed_url.path[1:],  # Remove leading slash
    'port': parsed_url.port
}

# Connect to the source database
try:
    source_connection = pymysql.connect(**source_db)
    print("Connection to source MySQL database was successful!")
except pymysql.MySQLError as e:
    print(f"Error connecting to source MySQL database: {e}")
    exit(1)

# Connect to the destination database
try:
    destination_connection = pymysql.connect(**destination_db)
    print("Connection to Railway MySQL database was successful!")
except pymysql.MySQLError as e:
    print(f"Error connecting to Railway MySQL database: {e}")
    source_connection.close()
    exit(1)

source_cursor = source_connection.cursor()
destination_cursor = destination_connection.cursor()

# Get the list of tables from the source database
source_cursor.execute("SHOW TABLES")
tables = source_cursor.fetchall()

# Create all tables except `queries`
for table in tables:
    table_name = table[0]
    if table_name == 'queries':
        continue  # Skip the `queries` table
    
    # Get the create table statement for each table
    source_cursor.execute(f"SHOW CREATE TABLE {table_name}")
    create_table_statement = source_cursor.fetchone()[1]
    
    # Create the table in the destination database
    try:
        destination_cursor.execute(create_table_statement)
        print(f"Table {table_name} created successfully.")
    except pymysql.MySQLError as e:
        print(f"Error creating table {table_name}: {e}")
        continue

# Now create the `queries` table
try:
    source_cursor.execute(f"SHOW CREATE TABLE queries")
    create_table_statement = source_cursor.fetchone()[1]
    destination_cursor.execute(create_table_statement)
    print(f"Table queries created successfully.")
except pymysql.MySQLError as e:
    print(f"Error creating table queries: {e}")

# Close connections
source_cursor.close()
source_connection.close()
destination_cursor.close()
destination_connection.close()

print("All tables created successfully!")
