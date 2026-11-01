with open(r'C:\Users\ali\.gemini\antigravity\scratch\hocllabs-clone\raw_homepage.html', 'r', encoding='utf-8') as f:
    html = f.read()

from bs4 import BeautifulSoup
soup = BeautifulSoup(html, 'html.parser')

scripts = soup.find_all('script')

for idx in [61, 62, 63, 65, 66, 67]:
    if idx < len(scripts) and scripts[idx].string:
        filename = f"script_{idx}.js"
        with open(rf"C:\Users\ali\.gemini\antigravity\scratch\hocllabs-clone\assets\js\{filename}", "w", encoding="utf-8") as out:
            out.write(scripts[idx].string)
        print(f"Saved {filename} ({len(scripts[idx].string)} chars)")
