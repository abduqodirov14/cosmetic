import os

css_dir = r'C:\Users\ali\.gemini\antigravity\scratch\hocllabs-clone\assets\css'
for f in os.listdir(css_dir):
    p = os.path.join(css_dir, f)
    with open(p, 'r', encoding='utf-8', errors='ignore') as c_file:
        content = c_file.read()
        if 'hf-stage' in content or 'hf-person' in content:
            print(f"Found in CSS file: {f}!")

with open(r'C:\Users\ali\.gemini\antigravity\scratch\hocllabs-clone\raw_homepage.html', 'r', encoding='utf-8', errors='ignore') as h_file:
    raw = h_file.read()
    if 'hf-stage' in raw:
        print("Found in raw_homepage.html!")
