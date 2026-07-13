import os
import re

# Use current directory instead of hardcoded path
base_dir = os.path.dirname(os.path.abspath(__file__))
header_file = os.path.join(base_dir, "includes", "header-template.html")
footer_file = os.path.join(base_dir, "includes", "footer-template.html")

if not os.path.exists(header_file) or not os.path.exists(footer_file):
    print(f"Error: Header or footer template not found in {os.path.join(base_dir, 'includes')}")
    exit(1)

with open(header_file, 'r', encoding='utf-8') as f:
    header_template = f.read()

with open(footer_file, 'r', encoding='utf-8') as f:
    footer_template = f.read()

def get_active_link(filename):
    if filename == 'index.html': return '/'
    clean = '/' + filename.replace('.html', '')
    if clean == '/local-seo' or clean == '/local-citations':
        return '/services'
    return clean

# The standard head tags that should be in every file
HEAD_REQUIREMENTS = [
    '<link rel="preconnect" href="https://fonts.googleapis.com">',
    '<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>',
    '<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Outfit:wght@500;600;700&display=swap" rel="stylesheet">',
    '<link rel="stylesheet" href="css/styles.css">',
    '<link rel="icon" type="image/png" href="assets/favicon.png">'
]

total_files = 0
updated_files = 0

for root, dirs, files in os.walk(base_dir):
    # Skip some directories
    if any(skip in root for skip in ['.git', 'node_modules', 'includes', 'assets', 'css', 'js', '.agent']):
        continue
        
    for file in files:
        if file.endswith('.html') and file != '404.html':
            total_files += 1
            file_path = os.path.join(root, file)
            
            try:
                with open(file_path, 'r', encoding='utf-8', errors='ignore') as f:
                    content = f.read()
            except Exception as e:
                print(f"Error reading {file_path}: {e}")
                continue
                
            original_content = content
            
            # 1. REMOVE EXISTING HEADER AND FOOTER (Clean slate)
            header_pattern = re.compile(r'(?s)<!--.*?STANDARD HEADER TEMPLATE.*?-->\s*<header.*?</header>', re.DOTALL)
            content = header_pattern.sub('', content)
            content = re.sub(r'(?s)<header class="header" id="header".*?</header>', '', content)
            
            footer_pattern = re.compile(r'(?s)<!--.*?STANDARD FOOTER TEMPLATE.*?-->\s*<footer.*?</footer>', re.DOTALL)
            content = footer_pattern.sub('', content)
            content = re.sub(r'(?s)<footer class="footer".*?</footer>', '', content)

            # 2. FIX STRUCTURAL TAGS (Repair mode)
            # Ensure </head> and <body> exist. If they were accidentally deleted or never there.
            if '</head>' not in content or '<body>' not in content:
                # Find the best place to close head and start body
                # After title or last meta/link
                last_head_idx = -1
                for marker in ['</title>', '</meta>', '<meta', '<link', '</script>']:
                    idx = content.rfind(marker)
                    if idx != -1:
                        end_idx = content.find('>', idx) + 1
                        if end_idx > last_head_idx:
                            last_head_idx = end_idx
                
                if last_head_idx != -1:
                    content = content[:last_head_idx] + "\n</head>\n\n<body>" + content[last_head_idx:]
                else:
                    # Fallback: find first <main> or first section
                    main_idx = content.find('<main')
                    if main_idx != -1:
                        content = content[:main_idx] + "</head>\n\n<body>\n    " + content[main_idx:]

            # 3. ENSURE HEAD REQUIREMENTS (CSS, Fonts)
            head_end = content.find('</head>')
            if head_end != -1:
                head_part = content[:head_end]
                missing_tags = []
                for req in HEAD_REQUIREMENTS:
                    # Check for parts of the requirement to avoid duplicates
                    req_id = req.split('href="')[1].split('"')[0] if 'href="' in req else req
                    if req_id not in head_part:
                        missing_tags.append(req)
                
                if missing_tags:
                    content = content[:head_end] + "    " + "\n    ".join(missing_tags) + "\n" + content[head_end:]

            # 4. PREPARE TEMPLATES
            active_href = get_active_link(file)
            current_header = header_template
            current_footer = footer_template
            
            # Update 'active' class in header
            current_header = current_header.replace('class="nav__link active"', 'class="nav__link"')
            if active_href:
                target_str = f'href="{active_href}" class="nav__link"'
                current_header = current_header.replace(target_str, f'href="{active_href}" class="nav__link active"')

            # 5. INJECT HEADER (After <body>)
            body_start = content.find('<body')
            if body_start != -1:
                body_tag_end = content.find('>', body_start) + 1
                content = content[:body_tag_end] + "\n    " + current_header + content[body_tag_end:]

            # 6. INJECT FOOTER (Before </body>)
            # First ensure </main> exists if <main> exists
            if '<main' in content and '</main>' not in content:
                # Find start of scripts or </body>
                insertion_point = content.find('<script')
                if insertion_point == -1:
                    insertion_point = content.find('</body>')
                
                if insertion_point != -1:
                    content = content[:insertion_point] + "\n    </main>" + content[insertion_point:]

            body_end = content.find('</body>')
            if body_end != -1:
                content = content[:body_end] + "\n    " + current_footer + content[body_end:]

            # 7. SAVE IF CHANGED
            if content.strip() != original_content.strip():
                with open(file_path, 'w', encoding='utf-8') as f:
                    f.write(content)
                updated_files += 1

print(f"Scanned {total_files} HTML files.")
print(f"Updated header/footer and repaired structure in {updated_files} files.")
