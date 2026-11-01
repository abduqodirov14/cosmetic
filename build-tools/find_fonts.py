import re

with open(r'C:\Users\ali\.gemini\antigravity\scratch\hocllabs-clone\raw_homepage.html', 'r', encoding='utf-8') as f:
    html = f.read()

fonts = re.findall(r'url\(["\']?([^"\'()]+\.(?:woff2?|otf|ttf)[^"\'()]*)["\']?\)', html)
print("Fonts found in HTML:", len(fonts))
for font in set(fonts):
    print(" -", font)
