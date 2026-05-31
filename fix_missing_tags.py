import os
import re

base_dir = os.path.dirname(os.path.abspath(__file__))

def fix_file(file_path):
    with open(file_path, 'r', encoding='utf-8', errors='ignore') as f:
        content = f.read()
    
    original_content = content
    
    # Check if </head> or <body> are missing
    has_head_open = '<head' in content
    has_head_close = '</head>' in content
    has_body_open = '<body' in content
    
    if has_head_open and (not has_head_close or not has_body_open):
        print(f"Fixing missing tags in {file_path}")
        
        # Find where to insert </head><body>
        # Usually it should be right before the header template or the <header> tag
        header_start = content.find('<header')
        comment_start = content.find('<!-- \n    STANDARD HEADER TEMPLATE')
        
        insertion_point = -1
        if comment_start != -1:
            insertion_point = comment_start
        elif header_start != -1:
            insertion_point = header_start
            
        if insertion_point != -1:
            # Check if we already have </head> or <body> nearby to avoid duplicates
            head_part = content[:insertion_point]
            if '</head>' not in head_part and '<body' not in head_part:
                content = content[:insertion_point] + "</head>\n<body data-theme='light'>\n\n" + content[insertion_point:]
            elif '</head>' in head_part and '<body' not in head_part:
                # If only body is missing, find where </head> is and insert <body> after it
                head_end = head_part.find('</head>') + 7
                content = content[:head_end] + "\n<body data-theme='light'>\n" + content[head_end:]
        else:
            # If no header found, maybe insert at the end of head?
            # This is riskier, let's just log it
            print(f"Warning: No header found in {file_path}, couldn't determine insertion point.")

    if content != original_content:
        with open(file_path, 'w', encoding='utf-8') as f:
            f.write(content)
        return True
    return False

total_fixed = 0
for root, dirs, files in os.walk(base_dir):
    if any(skip in root for skip in ['.git', 'node_modules', 'includes', 'assets', 'css', 'js']):
        continue
    for file in files:
        if file.endswith('.html'):
            if fix_file(os.path.join(root, file)):
                total_fixed += 1

print(f"Fixed {total_fixed} files.")
