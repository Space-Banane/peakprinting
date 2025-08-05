# Image Metadata Remover

A Python script to remove all metadata (EXIF, GPS, etc.) from images while preserving quality.

## Installation

```bash
pip install -r requirements.txt
```

## Usage

### Clean a single image:
```bash
python remove_metadata.py image.jpg
```

### Clean all images in a directory:
```bash
python remove_metadata.py -d ./images
```

### Clean to a specific output directory:
```bash
python remove_metadata.py -d ./images -o ./cleaned_images
```

### Show metadata before cleaning:
```bash
python remove_metadata.py --show image.jpg
```

### Adjust JPEG quality:
```bash
python remove_metadata.py -d ./images -q 90
```

## Features

- ✅ Removes all EXIF data, GPS coordinates, and other metadata
- ✅ Preserves image quality
- ✅ Supports JPEG, PNG, TIFF, BMP, WebP formats
- ✅ Batch processing of directories
- ✅ Quality control for JPEG compression
- ✅ Safe operation (creates new files, doesn't overwrite)
