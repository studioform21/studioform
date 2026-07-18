import os
import re

def extract_metadata(file_path):
    if not os.path.exists(file_path):
        return "File Not Found", "File Not Found"
        
    with open(file_path, "r", encoding="utf-8") as f:
        content = f.read()
        
    title_match = re.search(r"<title>(.*?)</title>", content, re.IGNORECASE)
    desc_match = re.search(r'<meta\s+name="description"\s+content="(.*?)"', content, re.IGNORECASE)
    
    title = title_match.group(1) if title_match else "No Title"
    desc = desc_match.group(1) if desc_match else "No Description"
    return title, desc

def main():
    root = "C:/Users/Sarthak/Downloads/Emergent/app/frontend/build"
    routes = {
        "/docs": os.path.join(root, "docs/index.html"),
        "/changelog": os.path.join(root, "changelog/index.html"),
        "/pricing": os.path.join(root, "pricing/index.html"),
        "/case-studies": os.path.join(root, "case-studies/index.html"),
        "/contact": os.path.join(root, "contact/index.html"),
    }
    
    print("| Route | Title | Description |")
    print("|-------|-------|-------------|")
    for r, path in routes.items():
        title, desc = extract_metadata(path)
        print(f"| `{r}` | {title} | {desc} |")

if __name__ == "__main__":
    main()
