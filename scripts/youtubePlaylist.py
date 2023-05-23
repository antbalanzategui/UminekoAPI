import os
import google_auth_oauthlib.flow
import googleapiclient.discovery
import googleapiclient.errors
import re
import os
from dotenv import load_dotenv
import mysql.connector

# This Python file is used to retrieve video data from videos within a particular youtube playlist
# it then iterates through the each video and retrieves particular data to send to a database using the MySQL.connector library

load_dotenv()
db_host = os.getenv("DB_HOST")
db_user = os.getenv("DB_USER")
db_password = os.getenv("DB_PASSWORD")
db_database = os.getenv("DB_DATABASE")

# Set up the YouTube API credentials
scopes = ["https://www.googleapis.com/auth/youtube.readonly"]
api_service_name = "youtube"
api_version = "v3"
client_secrets_file = os.getenv("YT_CLIENTFILE")

# Authenticate and authorize the user
flow = google_auth_oauthlib.flow.InstalledAppFlow.from_client_secrets_file(
    client_secrets_file, scopes)
credentials = flow.run_local_server(port=8080)
youtube = googleapiclient.discovery.build(
    api_service_name, api_version, credentials=credentials)

# Retrieve the videos in the Umineko When They Cry soundtrack playlist
playlist_id = "PLWCkhGoFcFiykjjC8UtB20DoVMWgVyQIL"
next_page_token = None
video_data = []

# Creates the Connection Object
mydb = mysql.connector.connect(
    host=db_host,
    user=db_user,
    password=db_password,
    database=db_database
)
# create a cursor object
mycursor = mydb.cursor()

# These are web images, which are supposed to represent the thumbnails which were used within the Youtube Videos
# Naturally the Youtube API has this feature however the quality of the thumbnails were not up to par, hence we use these
ep1Image = "https://static.wikia.nocookie.net/umineko/images/1/1c/Beatrice-0.png/revision/latest/scale-to-width-down/1200?cb=20190318021940"
ep2Image = "https://static.wikia.nocookie.net/umineko/images/4/4a/HumanBeatricePortrait.png/revision/latest/scale-to-width-down/1200?cb=20200505070744"
ep3Image = "https://static.wikia.nocookie.net/umineko/images/6/6f/EVA-Beatrice.jpg/revision/latest/scale-to-width-down/1200?cb=20190318023221"
ep4Image = "https://d2qdztz5tk5zxi.cloudfront.net/original/1X/aaa573e12b48d10f00fcbdb273cb6ce91f45b201.jpg"
ep5Image = "https://static.wikia.nocookie.net/umineko/images/c/c1/ErikaPortrait.jpg/revision/latest/scale-to-width-down/1200?cb=20200505074456"
ep6Image = "https://static.wikia.nocookie.net/umineko/images/7/7a/BattlerPortrait.jpg/revision/latest/scale-to-width-down/1200?cb=20200505075217"
ep7Image = "https://static.wikia.nocookie.net/umineko/images/d/de/WillardLionPortrait.jpg/revision/latest/scale-to-width-down/1200?cb=20200505070756"
ep8Image = "https://static.wikia.nocookie.net/topstrongest/images/9/94/Umi_ep8.jpg/revision/latest?cb=20190202010329"

# Creation of a Dictionary, which will allow us to map each Image to a particular Episode, which is determined by the Video's "Episode" attribute below
imgUrls = {
    "1": "https://pbs.twimg.com/media/EVlz8TXX0AAgM4n?format=jpg&name=medium",
    "2": "https://d2qdztz5tk5zxi.cloudfront.net/original/1X/91b43da64701c53be1444079e43a3be4d6ecec44.jpg",
    "3": "https://d2qdztz5tk5zxi.cloudfront.net/original/1X/5e822aba42240681a8cc905076167c9ba805fdd3.jpg",
    "4": "https://d2qdztz5tk5zxi.cloudfront.net/original/1X/aaa573e12b48d10f00fcbdb273cb6ce91f45b201.jpg",
    "5": "https://i.redd.it/1c9s85618sk51.jpg",
    "6": "https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/4fe006ef-2ed2-48d6-a5b4-362d5fd1a399/de9ea1p-b04ba0bc-9926-472e-b6c8-0c00ded38ae4.jpg/v1/fill/w_749,h_1067,q_70,strp/battler_ushiromiya___portrait_by_alonik_de9ea1p-pre.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9MTgyMiIsInBhdGgiOiJcL2ZcLzRmZTAwNmVmLTJlZDItNDhkNi1hNWI0LTM2MmQ1ZmQxYTM5OVwvZGU5ZWExcC1iMDRiYTBiYy05OTI2LTQ3MmUtYjZjOC0wYzAwZGVkMzhhZTQuanBnIiwid2lkdGgiOiI8PTEyODAifV1dLCJhdWQiOlsidXJuOnNlcnZpY2U6aW1hZ2Uub3BlcmF0aW9ucyJdfQ.ymd52aLOR2qHe31HL34VEnTW9XJbCRUI2wPeWcUYY_Y",
    "7": "https://d2qdztz5tk5zxi.cloudfront.net/original/1X/e5ec929dbbbd5f256db97e0f4bda26721796818e.jpg",
    "8": "https://pbs.twimg.com/media/Eoie7-EVEAAR8de?format=jpg&name=medium"
}
while True:
    request = youtube.playlistItems().list(
        part="snippet",
        playlistId=playlist_id,
        maxResults=50,
        pageToken=next_page_token
    )
    response = request.execute()
    video_data += response["items"]
    next_page_token = response.get("nextPageToken")
    if not next_page_token:
        break

idForDB = 1
# Parse the video data to extract the video title, video ID, and video link, for all videos, utilizes the mapping discussed earlier, ensures
# that none of the values or None aswell...
for video in video_data:
    videoId = video["snippet"]["resourceId"]["videoId"]
    title = video["snippet"]["title"]
    link = f"https://www.youtube.com/watch?v={videoId}"
    episode = title.split(":")[-1].strip()
    video_description = video["snippet"]["description"]
    description_lines = video['snippet']['description'].split('\n')
    composer_line = next((line for line in description_lines if line.startswith('Composer')), None)
    composer = composer_line.split(':')[1].strip() if composer_line else None
    print("Id:", idForDB)
    print("Video Id:", videoId)
    print(f"Title: {title}")
    print(f"Link: {link}")
    print(f"Episode: {episode}")
    print("Composer:", composer)
    numericEpisode = episode.split(" ")[1]
    print("Numeric Episode:", numericEpisode)

    if numericEpisode in imgUrls:
        image_url = imgUrls[numericEpisode]
    else:
        image_url = None

    print("Image URL:", image_url)
    
    if composer is None:
        composer_value = None
    else:
        composer_value = composer

    sql = "INSERT INTO uminekoapi.soundtrack (id, videoId, title, link, episode, composer, thumbnail) VALUES (%s, %s, %s, %s, %s, %s, %s)"
    mycursor.execute(sql, (idForDB, videoId, title, link, numericEpisode, composer_value, image_url))
    idForDB = idForDB + 1

mydb.commit()
# Database id, videoId, title, link, episode, composer #
