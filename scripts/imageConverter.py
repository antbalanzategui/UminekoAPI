import requests
from PIL import Image
import os
from PIL.ExifTags import TAGS

def download_and_convert_image(webp_url, output_path):
    response = requests.get(webp_url)
    with open('temp_image.webp', 'wb') as file:
        file.write(response.content)

    img = Image.open('temp_image.webp')
    img = img.convert('RGB')
    img.save(output_path, 'JPEG')

    # Delete the temporary WebP file
    file.close()
    os.remove('temp_image.webp')

ep1Image = "https://static.wikia.nocookie.net/umineko/images/1/1c/Beatrice-0.png/revision/latest/scale-to-width-down/1200?cb=20190318021940"
ep2Image = "https://static.wikia.nocookie.net/umineko/images/4/4a/HumanBeatricePortrait.png/revision/latest/scale-to-width-down/1200?cb=20200505070744"
ep3Image = "https://static.wikia.nocookie.net/umineko/images/6/6f/EVA-Beatrice.jpg/revision/latest/scale-to-width-down/1200?cb=20190318023221"
ep5Image = "https://static.wikia.nocookie.net/umineko/images/c/c1/ErikaPortrait.jpg/revision/latest/scale-to-width-down/1200?cb=20200505074456"
ep6Image = "https://static.wikia.nocookie.net/umineko/images/7/7a/BattlerPortrait.jpg/revision/latest/scale-to-width-down/1200?cb=20200505075217"
ep7Image = "https://static.wikia.nocookie.net/umineko/images/d/de/WillardLionPortrait.jpg/revision/latest/scale-to-width-down/1200?cb=20200505070756"
ep8Image = "https://static.wikia.nocookie.net/topstrongest/images/9/94/Umi_ep8.jpg/revision/latest?cb=20190202010329"
# Example usage
webp_urls = [
    ep1Image, ep2Image, ep3Image, ep5Image, ep6Image, ep7Image, ep8Image
]
output_folder = 'images'  # Specify the name of the output folder

 #Create the output folder if it doesn't exist
if not os.path.exists(output_folder):
    os.makedirs(output_folder)

for i, url in enumerate(webp_urls):
    output_path = os.path.join(output_folder, f'thumbnail{i+1}.jpg')
    download_and_convert_image(url, output_path)


