import sys
from bs4 import BeautifulSoup

sys.stdout.reconfigure(encoding='utf-8')

with open(r'C:\Users\ali\.gemini\antigravity\scratch\hocllabs-clone\raw_homepage.html', 'r', encoding='utf-8') as f:
    html = f.read()

soup = BeautifulSoup(html, 'html.parser')

scripts = soup.find_all('script')
for idx, s in enumerate(scripts):
    if s.string:
        content = s.string.strip()
        first_line = content.split('\n')[0][:80]
        print(f"Script {idx}: len={len(content)} | first line: {first_line}")
        if any(term in content for term in ['ritual', 'curved', 'aflow', 'cpr', 'video', 'cloud']):
            print(f"   MATCH FOUND in script {idx}!")
            # print first 500 chars
            print(content[:500])
            print("...\n")
