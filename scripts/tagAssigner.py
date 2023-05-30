import mysql.connector
import os
from dotenv import load_dotenv

websiteURL = "http://localhost:3001/"

image_urls = [
    'api/images/thumbnail1.jpg',
    'api/images/thumbnail2.jpg',
    'api/images/thumbnail3.jpg',
    'api/images/thumbnail4.jpg',
    'api/images/thumbnail5.jpg',
    'api/images/thumbnail6.jpg',
    'api/images/thumbnail7.jpg',
    'api/images/thumbnail8.jpg',
    'api/images/bec_c2.png',
    'api/images/brc_br.png',
    'api/images/c0201_a.png',
    'api/images/c0202_a.png',
    'api/images/c0301.png',
    'api/images/c0302_a.png',
    'api/images/c0303.png',
    'api/images/c0406.png',
    'api/images/cg_e0101_a.png',
    'api/images/cg_e0102_a.png',
    'api/images/cg_e0103_a.png',
    'api/images/cg_e0305_lc.png',
    'api/images/cg_e0406_t.png',
    'api/images/dlc_a1.png',
    'api/images/e0104_e.png',
    'api/images/e0201.png',
    'api/images/e0405.png',
    'api/images/e0406.png',
    'api/images/e0901_c.png',
    'api/images/e0902.png',
    'api/images/e0903_c.png',
    'api/images/ep504.png',
    'api/images/ep505.png',
    'api/images/ep601_a2.png',
    'api/images/ep603.png',
    'api/images/ep604_2.png',
    'api/images/ep605_a1.png',
    'api/images/ep606_3.png',
    'api/images/ep607.png',
    'api/images/ep701.png',
    'api/images/ep702.png',
    'api/images/ep703_a.png',
    'api/images/ep705.png',
    'api/images/ep801.png',
    'api/images/ep803.png',
    'api/images/ep805.png',
    'api/images/ep809_a.png',
    'api/images/ep810_a1.png',
    'api/images/ep811.png',
    'api/images/ep812_a.png',
    'api/images/ep814_d2.png',
    'api/images/ep815_2.png',
    'api/images/ep817.png',
    'api/images/ep818.png',
    'api/images/erc_ra.png',
    'api/images/evc_b.png',
    'api/images/fec_a.png',
    'api/images/lac_a1.png',
    'api/images/sakutaro1a.png',
    'api/images/sakutaro1b.png',
]

image_tags = [
    ['1', 'Beatrice', 'Portrait'],
    ['2', 'Beatrice', 'Portrait'],
    ['3', 'EVA', 'Portrait'],
    ['4', 'Battler', 'Beatrice', 'Ronove', 'Virgilia', 'Portrait'],
    ['5', 'Erika', 'Portrait'],
    ['6', 'Battler', 'Portrait'],
    ['7', 'Lion', 'Willard', 'Portrait'],
    ['8', 'Battler', 'Ange', 'Beatrice', 'Lion', 'Bernkastel', 'Lambdadelta', 'Portrait'],
    ['8', 'Beatrice', 'CG'],
    ['7', 'Bernkastel', 'CG'],
    ['2', 'Beatrice', 'CG'],
    ['2', 'Jessica', 'CG'],
    ['3', 'Beatrice', 'Virgilia', 'CG'],
    ['3', 'Beatrice', 'Ronove', 'Bernkastel', 'Lambdadelta', 'EVA', 'CG'],
    ['3', 'Ange', 'CG'],
    ['4', 'Ange', 'CG'],
    ['1', 'Natsuhi', 'CG'],
    ['1', 'Eva', 'CG'],
    ['1', 'Battler', 'CG'],
    ['3', 'Chiester Sisters', 'CG'],
    ['4', 'Battler', 'Beatrice', 'CG'],
    ['5', 'Dlanor', 'CG'],
    ['1', 'Shannon', 'CG'],
    ['2', 'Beatrice', 'Battler', 'Bernkastel', 'CG'],
    ['4', 'Maria', 'Ange', 'CG'],
    ['4', 'Battler', 'Beatrice', 'CG'],
    ['4', 'Battler', 'Beatrice', 'CG'],
    ['4', 'Lambdadelta', 'Bernkastel', 'CG'],
    ['3', 'Beatrice', 'CG'],
    ['5', 'Beatrice', 'Battler', 'CG'],
    ['5', 'Battler', 'CG'],
    ['6', 'Battler', 'Erika', 'CG'],
    ['6', 'Battler', 'CG'],
    ['6', 'Kanon', 'Shannon', 'CG'],
    ['6', 'Beatrice', 'Erika', 'CG'],
    ['6', 'Beatrice', 'Battler', 'CG'],
    ['6', 'Battler', 'Beatrice', 'CG'],
    ['7', 'Beatrice', 'CG'],
    ['7', 'Willard', 'CG'],
    ['7', 'George', 'CG'],
    ['7', 'Lion', 'Willard', 'CG'],
    ['8', 'Battler', 'Ange', 'CG'],
    ['8', 'Kyrie', 'Rudolf', 'Battler', 'CG'],
    ['8', 'Erika', 'CG'],
    ['8', 'Rosa', 'Maria', 'CG'],
    ['8', 'Battler', 'Lambdadelta', 'Ange', 'CG'],
    ['8', 'Battler', 'Bernkastel', 'CG'],
    ['8', 'Bernkastel', 'CG'],
    ['8', 'Battler', 'Beatrice', 'CG'],
    ['8', 'Battler', 'Beatrice', 'CG'],
    ['8', 'Tohya', 'Ikuko', 'CG'],
    ['8', 'Kyrie', 'Rudolf', 'Ange', 'Battler', 'CG'],
    ['5', 'Erika', 'CG'],
    ['3', 'EVA', 'CG'],
    ['8', 'Featherine', 'CG'],
    ['8', 'Lambdadelta', 'CG'],
    ['4', 'Sakutaro', 'CG'],
    ['4', 'Sakutaro', 'CG']
]

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

modified_urls = ['api/media/' + url.split('api/images/')[1] for url in image_urls]

# Print the modified URLs
for url in modified_urls:
    print(url)


for i in range(len(image_urls)):
    id = i + 1
    url = websiteURL + modified_urls[i]
    tags = image_tags[i]
    episode = int(tags[0]) if tags[0].isdigit() else None
    characters = ', '.join(tags[1:-1]) if len(tags) > 2 else tags[1]
    image_type = tags[-1]
    print(f"Index: {id}, URL: {url}, Episode: {episode}, Characters: {characters}, Type: {image_type}")
    sql = "INSERT INTO uminekoapi.images (id, url, episode, characters, type) VALUES (%s, %s, %s, %s, %s)"
    mycursor.execute(sql, (id, url, episode, characters, image_type))


mydb.commit()