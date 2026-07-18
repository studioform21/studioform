import os
from PIL import Image

def main():
    root_dir = "C:/Users/Sarthak/Downloads/Emergent/app"
    img_path = os.path.join(root_dir, "frontend/public/images/studio_form_icon.png")
    dest_path = os.path.join(root_dir, "frontend/public/favicon.ico")
    
    if os.path.exists(img_path):
        img = Image.open(img_path)
        # Convert to RGBA if not already
        if img.mode != "RGBA":
            img = img.convert("RGBA")
        # Save as ICO with standard sizes
        img.save(dest_path, format="ICO", sizes=[(16, 16), (32, 32), (48, 48), (64, 64)])
        print(f"Favicon generated successfully at: {dest_path}")
    else:
        print(f"Error: logo_dark.png not found at {img_path}")

if __name__ == "__main__":
    main()
