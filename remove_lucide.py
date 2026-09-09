import os
import re

src_dir = 'src'
lucide_pattern = re.compile(r'import\s+\{([^}]+)\}\s+from\s+[\'"]lucide-react[\'"];?')
lucide_all_pattern = re.compile(r'import\s+\*\s+as\s+Icons\s+from\s+[\'"]lucide-react[\'"];?')

for root, _, files in os.walk(src_dir):
    for file in files:
        if file.endswith('.jsx'):
            filepath = os.path.join(root, file)
            with open(filepath, 'r', encoding='utf-8') as f:
                content = f.read()

            match = lucide_pattern.search(content)
            match_all = lucide_all_pattern.search(content)
            
            if match or match_all:
                if match:
                    # Extract component names
                    components = [c.strip() for c in match.group(1).split(',')]
                    # Remove the import line
                    content = content.replace(match.group(0), '')
                    # Remove component usages
                    for comp in components:
                        comp_pattern = re.compile(r'<' + comp + r'\b[^>]*\/>')
                        content = comp_pattern.sub('', content)
                        # Also handle <Component> ... </Component> if they exist
                        comp_pattern2 = re.compile(r'<' + comp + r'\b[^>]*>.*?</' + comp + r'>', re.DOTALL)
                        content = comp_pattern2.sub('', content)
                
                if match_all:
                    content = content.replace(match_all.group(0), '')
                    # Removing things like <Icons.CalendarDays />
                    icons_pattern = re.compile(r'<Icons\.[A-Za-z0-9_]+\b[^>]*\/>')
                    content = icons_pattern.sub('', content)

                with open(filepath, 'w', encoding='utf-8') as f:
                    f.write(content)
                print(f'Processed {filepath}')

