from bs4 import BeautifulSoup

with open(r'C:\Users\ali\.gemini\antigravity\scratch\hocllabs-clone\raw_homepage.html', 'r', encoding='utf-8') as f:
    html = f.read()

soup = BeautifulSoup(html, 'html.parser')
rc_data = soup.find(class_='rc-data')
print("rc-data found:", bool(rc_data), len(rc_data.string) if rc_data and rc_data.string else 0)

cs_config = soup.find(attrs={'data-cs-config': True})
print("cs-config found:", bool(cs_config), cs_config.string if cs_config else None)
