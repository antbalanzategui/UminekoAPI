from PIL import Image

image_urls = [
    './images/thumbnail1.jpg',
    './images/thumbnail2.jpg',
    './images/thumbnail3.jpg',
    './images/thumbnail4.jpg',
    './images/thumbnail5.jpg',
    './images/thumbnail6.jpg',
    './images/thumbnail7.jpg',
    './images/thumbnail8.jpg',
]

image_tags = [
    ['1', 'Beatrice', 'Portrait'],
    ['2', 'Beatrice', 'Portrait'],
    ['3', 'EVA', 'Portrait'],
    ['4', 'Battler', 'Beatrice', 'Ronove', 'Virgilia'],
    ['5', 'Erika', 'Portrait'],
    ['6', 'Battler', 'Portrait'],
    ['7', 'Lion', 'Willard', 'Portrait'],
    ['8', 'Battler', 'Ange', 'Beatrice', 'Lion', 'Bernkastel', 'Lambdadelta']
]

# Create a dictionary to store image tags
image_tags_dict = dict(zip(image_urls, image_tags))

for url in image_urls:
    with Image.open(url) as img:
        # Retrieve image metadata
        image_format = img.format
        image_size = img.size
        image_mode = img.mode
        # Retrieve image tags from the dictionary
        tags = image_tags_dict.get(url, [])
        # Print image metadata and tags
        print(f"Image URL: {url}")
        print(f"Tags: {tags}")

