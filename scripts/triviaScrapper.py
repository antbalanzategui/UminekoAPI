import requests
from bs4 import BeautifulSoup

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
counter = 1
data = []

skippedCharacters = {"Runon", "Renon", "Sanon", "Benon", "Manon", "Berune", "Asune", "Ronove", "MARIA", "BATTLER", "ANGE-Beatrice", "EVA-Beatrice", "Captain Kawabata", "Beatrice Ushiromiya", "George Ushiromiya"}

for tag in tags:
    if tag.name == "h2":
        currentH2 = tag.text
        counter = counter + 1
    elif tag.name == "dt":
        aTag = tag.find("a")
        href = aTag.get("href")
        name = aTag.get("title")
        print(currentH2)
        print(name)
        usableHref = baseUrl + href
        print(usableHref)
        if name not in skippedCharacters:
            counter = counter + 1
            response = requests.get(usableHref)
            charSoup = BeautifulSoup(response.content, "html.parser")
            spanTag = charSoup.find("span", id = "Trivia")
            h2Tag = spanTag.parent
            ulTag = h2Tag.find_next_sibling("ul")
            liTags = ulTag.find_all("li")
            for li in liTags:
                print(li.text)
    else:
        counter = counter + 1



# Save the HTML content to a file
#with open("webpage.html", "w", encoding="utf-8") as file:
    #file.write(str(div_element))

#print("HTML file saved.")
