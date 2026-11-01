import sys
from bs4 import BeautifulSoup
import json

sys.stdout.reconfigure(encoding='utf-8')

with open(r'C:\Users\ali\.gemini\antigravity\scratch\hocllabs-clone\raw_homepage.html', 'r', encoding='utf-8') as f:
    html = f.read()

soup = BeautifulSoup(html, 'html.parser')

# Inspect the curved stats section
curved_stats = soup.find(class_=lambda c: c and 'curved-stats' in c)
if curved_stats:
    print("=== CURVED STATS SECTION ===")
    print(curved_stats.prettify()[:2000])

# Inspect floating feedback section
feedback = soup.find(class_=lambda c: c and 'floating-feedback' in c)
if feedback:
    print("\n=== FLOATING FEEDBACK SECTION ===")
    print(feedback.prettify()[:2000])

# Inspect ritual cloud section
ritual_cloud = soup.find(class_=lambda c: c and 'ritual-cloud' in c)
if ritual_cloud:
    print("\n=== RITUAL CLOUD SECTION ===")
    print(ritual_cloud.prettify()[:2000])
