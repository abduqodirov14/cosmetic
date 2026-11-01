import re
import os
from bs4 import BeautifulSoup

with open(r'C:\Users\ali\.gemini\antigravity\scratch\hocllabs-clone\raw_homepage.html', 'r', encoding='utf-8') as f:
    raw_html = f.read()

soup = BeautifulSoup(raw_html, 'html.parser')

print("Title:", soup.title.string if soup.title else None)

# Check all style tags inside head and body
styles = soup.find_all('style')
print("Total style tags:", len(styles))

# Check sections in MainContent
main = soup.find('main', id='MainContent')
print("Main sections count:", len(main.find_all('div', recursive=False) + main.find_all('section', recursive=False)))
