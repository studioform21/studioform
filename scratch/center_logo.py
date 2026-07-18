import os
from PIL import Image, ImageChops

def trim_and_center(img_path, dest_path):
    if not os.path.exists(img_path):
        print(f"Error: {img_path} not found.")
        return False
        
    img = Image.open(img_path).convert("RGBA")
    
    # 1. Detect bounding box of non-white and non-transparent pixels
    # We will look at each pixel's color and alpha channel.
    width, height = img.size
    left, top, right, bottom = width, height, 0, 0
    
    pixels = img.load()
    found_any = False
    
    for y in range(height):
        for x in range(width):
            r, g, b, a = pixels[x, y]
            # Pixel is considered part of the logo if:
            # - It is not fully transparent (a > 10) AND
            # - It is not pure white (r < 240 or g < 240 or b < 240)
            if a > 10 and (r < 240 or g < 240 or b < 240):
                found_any = True
                if x < left: left = x
                if y < top: top = y
                if x > right: right = x
                if y > bottom: bottom = y
                
    if not found_any:
        print("No colored logo shape detected. Using original image.")
        return False
        
    # Crop the image to the bounding box
    # Add a tiny margin around the box if possible
    margin = 5
    left = max(0, left - margin)
    top = max(0, top - margin)
    right = min(width, right + margin)
    bottom = min(height, bottom + margin)
    
    cropped = img.crop((left, top, right, bottom))
    c_width, c_height = cropped.size
    
    # Make it a square canvas with padding
    logo_size = max(c_width, c_height)
    canvas_size = int(logo_size * 1.25) # 25% padding
    
    # Create white background square canvas
    # Since search engines like circular favicons, we use a transparent background or white.
    # The uploaded image has a white background, so let's make the canvas white (or transparent).
    # Transparent background is cleaner for modern dark mode browsers.
    # Let's make it transparent! It will render beautifully on both white search cards and dark browser tabs.
    new_img = Image.new("RGBA", (canvas_size, canvas_size), (255, 255, 255, 0))
    
    # Center paste coordinates
    paste_x = (canvas_size - c_width) // 2
    paste_y = (canvas_size - c_height) // 2
    
    new_img.paste(cropped, (paste_x, paste_y), cropped)
    
    # Save the centered PNG
    new_img.save(img_path, "PNG")
    print(f"Centered PNG saved to: {img_path}")
    
    # Save as ICO (multi-size)
    new_img.save(dest_path, format="ICO", sizes=[(16, 16), (32, 32), (48, 48), (64, 64)])
    print(f"Centered ICO generated successfully at: {dest_path}")
    return True

def main():
    root_dir = "C:/Users/Sarthak/Downloads/Emergent/app"
    img_path = os.path.join(root_dir, "frontend/public/images/studio_form_icon.png")
    dest_path = os.path.join(root_dir, "frontend/public/favicon.ico")
    
    trim_and_center(img_path, dest_path)

if __name__ == "__main__":
    main()
