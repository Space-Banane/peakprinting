#!/usr/bin/env python3
"""
Image Metadata Remover
Removes all metadata (EXIF, GPS, etc.) from images while preserving quality.
"""

import os
import sys
from pathlib import Path
from PIL import Image
from PIL import ImageOps
from PIL.ExifTags import TAGS
import argparse

def remove_metadata(input_path, output_path=None, quality=95):
    """
    Remove metadata from a single image file.
    
    Args:
        input_path (str): Path to input image
        output_path (str): Path for cleaned image (optional)
        quality (int): JPEG quality (1-100, default 95)
    """
    try:
        # Open the image
        with Image.open(input_path) as img:
            # Apply EXIF orientation so output is visually correct
            img = ImageOps.exif_transpose(img)
            # Convert palette images to RGB
            if img.mode == "P":
                img = img.convert("RGBA" if "A" in img.getbands() else "RGB")
            # Create a new image without metadata
            clean_img = Image.new(img.mode, img.size)
            clean_img.putdata(list(img.getdata()))
            
            # Set output path
            if output_path is None:
                path = Path(input_path)
                output_path = path.parent / f"{path.stem}_clean{path.suffix}"
            else:
                output_path = Path(output_path)
                output_path.parent.mkdir(parents=True, exist_ok=True)
            
            # Save based on format
            fmt = (img.format or output_path.suffix.lstrip('.')).upper()
            if fmt in ['JPEG', 'JPG']:
                clean_img = clean_img.convert("RGB")
                clean_img.save(output_path, 'JPEG', quality=quality, optimize=True)
            elif fmt == 'PNG':
                # PNG can be RGBA or RGB
                clean_img.save(output_path, 'PNG', optimize=True)
            else:
                clean_img.save(output_path, fmt)
            
            print(f"✅ Cleaned: {input_path} -> {output_path}")
            return True
            
    except Exception as e:
        print(f"❌ Error processing {input_path}: {e}")
        return False

def process_directory(input_dir, output_dir=None, quality=95):
    """
    Process all images in a directory.
    
    Args:
        input_dir (str): Input directory path
        output_dir (str): Output directory path (optional)
        quality (int): JPEG quality (1-100)
    """
    input_path = Path(input_dir)
    
    if not input_path.exists():
        print(f"❌ Input directory doesn't exist: {input_dir}")
        sys.exit(1)
    
    # Set output directory
    if output_dir is None:
        output_path = input_path / "cleaned"
    else:
        output_path = Path(output_dir)
    
    # Supported image extensions
    image_extensions = {'.jpg', '.jpeg', '.png', '.tiff', '.tif', '.bmp', '.webp'}
    
    # Process all images
    processed = 0
    for file_path in input_path.rglob('*'):
        if file_path.is_file() and file_path.suffix.lower() in image_extensions:
            # Preserve subdirectory structure
            rel_path = file_path.relative_to(input_path)
            output_file = output_path / rel_path
            output_file.parent.mkdir(parents=True, exist_ok=True)
            if remove_metadata(str(file_path), str(output_file), quality):
                processed += 1
    
    print(f"\n🎉 Successfully processed {processed} images")
    print(f"📁 Output directory: {output_path}")

def show_metadata(image_path):
    """Display metadata information for an image."""
    try:
        with Image.open(image_path) as img:
            exif = img.getexif()
            if exif:
                print(f"\n📋 Metadata for: {image_path}")
                print("-" * 50)
                for tag_id, value in exif.items():
                    tag = TAGS.get(tag_id, tag_id)
                    print(f"{tag}: {value}")
            else:
                print(f"✨ No metadata found in: {image_path}")
    except Exception as e:
        print(f"❌ Error reading metadata: {e}")

def main():
    parser = argparse.ArgumentParser(
        description="Remove metadata from images",
        formatter_class=argparse.RawDescriptionHelpFormatter,
        epilog="""
Examples:
  python remove_metadata.py image.jpg                    # Clean single image
  python remove_metadata.py -d ./images                  # Clean directory
  python remove_metadata.py -d ./images -o ./clean       # Clean to specific output
  python remove_metadata.py --show image.jpg             # Show metadata
        """
    )
    
    parser.add_argument('input', nargs='?', help='Input image file or directory')
    parser.add_argument('-d', '--directory', help='Process entire directory')
    parser.add_argument('-o', '--output', help='Output file or directory')
    parser.add_argument('-q', '--quality', type=int, default=95, 
                       help='JPEG quality (1-100, default: 95)')
    parser.add_argument('--show', help='Show metadata for an image file')
    
    args = parser.parse_args()
    
    # Show metadata mode
    if args.show:
        show_metadata(args.show)
        return
    
    # Directory mode
    if args.directory:
        process_directory(args.directory, args.output, args.quality)
        return
    
    # Single file mode
    if args.input:
        if os.path.isdir(args.input):
            process_directory(args.input, args.output, args.quality)
        else:
            remove_metadata(args.input, args.output, args.quality)
        return
    
    # No arguments provided
    parser.print_help()

if __name__ == "__main__":
    main()
