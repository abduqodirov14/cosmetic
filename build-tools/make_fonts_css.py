import os

fonts_dir = r'C:\Users\ali\.gemini\antigravity\scratch\hocllabs-clone\assets\fonts'
files = os.listdir(fonts_dir)

css_rules = []

for f in files:
    # General Sans
    if 'GeneralSans-Regular' in f:
        css_rules.append(f"""@font-face {{
  font-family: 'General Sans';
  font-weight: 400;
  font-style: normal;
  font-display: swap;
  src: url('../fonts/{f}') format('opentype');
}}""")
    elif 'GeneralSans-Medium' in f and 'Italic' not in f:
        css_rules.append(f"""@font-face {{
  font-family: 'General Sans';
  font-weight: 500;
  font-style: normal;
  font-display: swap;
  src: url('../fonts/{f}') format('opentype');
}}""")
    elif 'GeneralSans-Semibold' in f:
        css_rules.append(f"""@font-face {{
  font-family: 'General Sans';
  font-weight: 600;
  font-style: normal;
  font-display: swap;
  src: url('../fonts/{f}') format('opentype');
}}""")
    elif 'GeneralSans-Bold' in f:
        css_rules.append(f"""@font-face {{
  font-family: 'General Sans';
  font-weight: 700;
  font-style: normal;
  font-display: swap;
  src: url('../fonts/{f}') format('opentype');
}}""")
    elif 'GeneralSans-Light' in f:
        css_rules.append(f"""@font-face {{
  font-family: 'General Sans';
  font-weight: 300;
  font-style: normal;
  font-display: swap;
  src: url('../fonts/{f}') format('opentype');
}}""")
    elif 'GeneralSans-Italic' in f:
        css_rules.append(f"""@font-face {{
  font-family: 'General Sans';
  font-weight: 400;
  font-style: italic;
  font-display: swap;
  src: url('../fonts/{f}') format('opentype');
}}""")
    elif 'GeneralSans-MediumItalic' in f:
        css_rules.append(f"""@font-face {{
  font-family: 'General Sans';
  font-weight: 500;
  font-style: italic;
  font-display: swap;
  src: url('../fonts/{f}') format('opentype');
}}""")

    # Boska
    elif 'Boska-LightItalic' in f:
        css_rules.append(f"""@font-face {{
  font-family: 'Boska';
  font-weight: 300;
  font-style: italic;
  font-display: swap;
  src: url('../fonts/{f}') format('opentype');
}}""")
    elif 'Boska-Italic' in f:
        css_rules.append(f"""@font-face {{
  font-family: 'Boska';
  font-weight: 400;
  font-style: italic;
  font-display: swap;
  src: url('../fonts/{f}') format('opentype');
}}""")
    elif 'Boska-MediumItalic' in f:
        css_rules.append(f"""@font-face {{
  font-family: 'Boska';
  font-weight: 500;
  font-style: italic;
  font-display: swap;
  src: url('../fonts/{f}') format('opentype');
}}""")
    elif 'Boska-BoldItalic' in f:
        css_rules.append(f"""@font-face {{
  font-family: 'Boska';
  font-weight: 700;
  font-style: italic;
  font-display: swap;
  src: url('../fonts/{f}') format('opentype');
}}""")
    elif 'Boska-BlackItalic' in f:
        css_rules.append(f"""@font-face {{
  font-family: 'Boska';
  font-weight: 900;
  font-style: italic;
  font-display: swap;
  src: url('../fonts/{f}') format('opentype');
}}""")

    # Assistant
    elif 'assistant_n4' in f and f.endswith('.woff2'):
        css_rules.append(f"""@font-face {{
  font-family: 'Assistant';
  font-weight: 400;
  font-style: normal;
  font-display: swap;
  src: url('../fonts/{f}') format('woff2');
}}""")
    elif 'assistant_n7' in f and f.endswith('.woff2'):
        css_rules.append(f"""@font-face {{
  font-family: 'Assistant';
  font-weight: 700;
  font-style: normal;
  font-display: swap;
  src: url('../fonts/{f}') format('woff2');
}}""")

with open(r'C:\Users\ali\.gemini\antigravity\scratch\hocllabs-clone\assets\css\fonts.css', 'w', encoding='utf-8') as out_f:
    out_f.write('\n\n'.join(css_rules))

print(f"Generated fonts.css with {len(css_rules)} rules.")
