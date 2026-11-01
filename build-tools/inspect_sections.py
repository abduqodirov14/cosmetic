import sys
import re
from bs4 import BeautifulSoup

sys.stdout.reconfigure(encoding='utf-8')

with open(r'C:\Users\ali\.gemini\antigravity\scratch\hocllabs-clone\raw_homepage.html', 'r', encoding='utf-8') as f:
    html = f.read()

soup = BeautifulSoup(html, 'html.parser')

print("--- ALL SHOPIFY SECTIONS ---")
sections = soup.find_all(attrs={"class": re.compile(r"shopify-section")})
for idx, sec in enumerate(sections):
    sec_id = sec.get("id", "")
    sec_classes = " ".join(sec.get("class", []))
    text_snippet = ' '.join(sec.get_text().split())[:120]
    print(f"[{idx}] id='{sec_id}' class='{sec_classes}'")
    print(f"    Text: {text_snippet}")

print("\n--- PRODUCTS FOUND ---")
# Look for product data, price, json-ld or shopify product objects
for script in soup.find_all('script'):
    if script.string and ('window.Shopify' in script.string or 'application/ld+json' in script.get('type', '')):
        print("Found script type:", script.get('type'), len(script.string))

print("\n--- STYLESHEETS ---")
for link in soup.find_all('link', rel='stylesheet'):
    print(link.get('href'))
for style in soup.find_all('style'):
    print(f"<style> tag with length {len(style.string or '')}")
