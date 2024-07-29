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

# Copy data from source to destination except `queries`
for table in tables:
    table_name = table[0]
    if table_name == 'queries':
        continue  # Skip the `queries` table
    
    # Get the data from the source table
    source_cursor.execute(f"SELECT * FROM {table_name}")
    rows = source_cursor.fetchall()
    
    # Get the column names
    source_cursor.execute(f"SHOW COLUMNS FROM {table_name}")
    columns = [column[0] for column in source_cursor.fetchall()]
    columns_list = ", ".join(columns)
    placeholders = ", ".join(["%s"] * len(columns))
    
    # Insert data into the destination table
    insert_statement = f"INSERT INTO {table_name} ({columns_list}) VALUES ({placeholders})"
    for row in rows:
        try:
            destination_cursor.execute(insert_statement, row)
        except pymysql.MySQLError as e:
            print(f"Error inserting data into table {table_name}: {e}")
    
    # Commit the transaction
    destination_connection.commit()

# Now copy data into the `queries` table
table_name = 'queries'
try:
    source_cursor.execute(f"SELECT * FROM {table_name}")
    rows = source_cursor.fetchall()
    
    source_cursor.execute(f"SHOW COLUMNS FROM {table_name}")
    columns = [column[0] for column in source_cursor.fetchall()]
    columns_list = ", ".join(columns)
    placeholders = ", ".join(["%s"] * len(columns))
    
    insert_statement = f"INSERT INTO {table_name} ({columns_list}) VALUES ({placeholders})"
    for row in rows:
        destination_cursor.execute(insert_statement, row)
    
    destination_connection.commit()
    print(f"Data transfer to table {table_name} complete.")
except pymysql.MySQLError as e:
    print(f"Error inserting data into table {table_name}: {e}")

# Close connections
source_cursor.close()
source_connection.close()
destination_cursor.close()
destination_connection.close()

print("Data transfer complete!")
