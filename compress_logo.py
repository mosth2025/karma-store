from PIL import Image
import os

target_dir = r"c:\Users\El3atty\Desktop\karma-stream-main1\src\assets"
input_path = os.path.join(target_dir, "karmastore-logo.png")
output_png = os.path.join(target_dir, "karmastore-logo-optimized.png")
output_webp = os.path.join(target_dir, "karmastore-logo.webp")

if os.path.exists(input_path):
    with Image.open(input_path) as img:
        # Convert to RGB if necessary (WebP supports RGBA but let's be safe)
        if img.mode in ("RGBA", "P"):
            img = img.convert("RGBA")
        
        # Save as optimized PNG
        img.save(output_png, "PNG", optimize=True)
        print(f"Saved optimized PNG to {output_png}")
        
        # Save as WebP
        img.save(output_webp, "WEBP", quality=80)
        print(f"Saved WebP to {output_webp}")
        
    old_size = os.path.getsize(input_path) / 1024
    new_png_size = os.path.getsize(output_png) / 1024
    new_webp_size = os.path.getsize(output_webp) / 1024
    
    print(f"Original size: {old_size:.2f} KB")
    print(f"New PNG size: {new_png_size:.2f} KB")
    print(f"New WebP size: {new_webp_size:.2f} KB")
else:
    print(f"Error: File {input_path} not found.")
