import urllib.request
import re
import os

with open(r'C:\Users\ali\.gemini\antigravity\scratch\hocllabs-clone\raw_homepage.html', 'r', encoding='utf-8') as f:
    html = f.read()

# Find all CSS files referenced
css_links = re.findall(r'<link[^>]+rel=["\']stylesheet["\'][^>]+href=["\']([^"\']+)["\']', html)
print("CSS Links found:", len(css_links))
for link in css_links:
    print(" ", link)

# Find all JS scripts
scripts = re.findall(r'<script[^>]+src=["\']([^"\']+)["\']', html)
print("\nScripts found:", len(scripts))
for s in scripts:
    print(" ", s)

# Find video sources
vids = re.findall(r'https?://[^"\'\s]+\.mp4', html)
print("\nVideos found:", len(vids))
for v in set(vids):
    print(" ", v)
