import os
import subprocess

base_dir = os.path.dirname(os.path.abspath(__file__))
target_commit = "5815ad2"

def get_git_file_content(commit, file_rel_path):
    try:
        # Use git show to get the content of the file at that commit
        result = subprocess.run(['git', 'show', f'{commit}:{file_rel_path}'], capture_output=True, text=True, encoding='utf-8', errors='ignore')
        if result.returncode == 0:
            return result.stdout
        return None
    except Exception:
        return None

def restore_head(file_path):
    rel_path = os.path.relpath(file_path, base_dir).replace(os.sep, '/')
    old_content = get_git_file_content(target_commit, rel_path)
    
    if not old_content:
        print(f"Could not get old content for {rel_path}")
        return False
        
    with open(file_path, 'r', encoding='utf-8', errors='ignore') as f:
        current_content = f.read()
    
    # Extract head from old content
    old_head_start = old_content.find('<head')
    old_head_end = old_content.find('</head>')
    if old_head_start == -1 or old_head_end == -1:
        print(f"Could not find head tags in old version of {rel_path}")
        return False
    
    # Get the opening <head> tag and its content
    old_head_tag_end = old_content.find('>', old_head_start) + 1
    old_head_inner = old_content[old_head_tag_end:old_head_end]
    
    # Extract body tag from old content
    old_body_start = old_content.find('<body')
    old_body_end = old_content.find('>', old_body_start) + 1
    if old_body_start == -1:
        old_body_tag = '<body data-theme="light">'
    else:
        old_body_tag = old_content[old_body_start:old_body_end]
    
    # Find head in current content
    current_head_start = current_content.find('<head')
    current_head_end = current_content.find('</head>')
    if current_head_start == -1 or current_head_end == -1:
        # If head tags are missing in current, let's just use fix_missing_tags first or be careful
        # Since we just ran fix_missing_tags, they should be there.
        print(f"Head tags missing in current version of {rel_path}")
        return False
    
    current_head_tag_end = current_content.find('>', current_head_start) + 1
    
    # Replace head content
    new_content = current_content[:current_head_tag_end] + "\n" + old_head_inner.strip() + "\n" + current_content[current_head_end:]
    
    # Now fix body tag
    current_body_start = new_content.find('<body')
    if current_body_start != -1:
        current_body_end = new_content.find('>', current_body_start) + 1
        new_content = new_content[:current_body_start] + old_body_tag + new_content[current_body_end:]
    
    with open(file_path, 'w', encoding='utf-8') as f:
        f.write(new_content)
    return True

total_restored = 0
for root, dirs, files in os.walk(base_dir):
    if any(skip in root for skip in ['.git', 'node_modules', 'includes', 'assets', 'css', 'js']):
        continue
    for file in files:
        if file.endswith('.html'):
            if restore_head(os.path.join(root, file)):
                total_restored += 1
                print(f"Restored head for {file}")

print(f"Total files restored: {total_restored}")
