import os

def get_image_urls(folder_path, base_url):
    image_urls = []
    for file in os.listdir(folder_path):
        if os.path.isfile(os.path.join(folder_path, file)):
            image_urls.append(base_url + file)
    return image_urls

def write_to_file(file_path, image_urls):
    with open(file_path, 'w') as file:
        file.write("image_urls = [\n")
        for url in image_urls:
            file.write(f"    '{url}',\n")
        file.write("]")

folder_path = r"C:\Users\antb2\Desktop\chosenTempCGs"  # Update the folder path accordingly
output_file_path = r"C:\Users\antb2\Desktop\UminekoAPI\scripts\filenames.txt"  # Update the output file path accordingly
base_url = "api/images/"  # Base URL to prepend to each filename

image_urls = get_image_urls(folder_path, base_url)
write_to_file(output_file_path, image_urls)

print("Image URLs written to", output_file_path)