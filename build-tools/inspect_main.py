from bs4 import BeautifulSoup

with open(r'C:\Users\ali\.gemini\antigravity\scratch\hocllabs-clone\raw_homepage.html', 'r', encoding='utf-8') as f:
    html = f.read()

soup = BeautifulSoup(html, 'html.parser')

main = soup.find('main')
if main:
    print(f"Main tag id='{main.get('id')}' class='{main.get('class')}'")
    for child in main.children:
        if child.name:
            print(f" - <{child.name} id='{child.get('id')}' class='{child.get('class')}'>")
else:
    print("No main tag found!")
