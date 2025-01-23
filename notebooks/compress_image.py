#!/usr/bin/env python3
import sys
from PIL import Image
import os
import subprocess
import glob

def compress_to_webp(input_path):
    try:
        # Check if file exists
        if not os.path.exists(input_path):
            print(f"Error: File '{input_path}' does not exist")
            return False
        
        # Open the image
        with Image.open(input_path) as img:
            # Get the output filename
            filename = os.path.splitext(input_path)[0]
            output_path = f"{filename}.webp"
            
            # Convert and save as WebP
            img.save(output_path, 'webp', quality=90, method=6)
            print(f"Successfully compressed image to: {output_path}")
            return True
            
    except Exception as e:
        print(f"Error processing image: {str(e)}")
        return False

def compress_to_webm(input_path):
    try:
        # Check if file exists
        if not os.path.exists(input_path):
            print(f"Error: File '{input_path}' does not exist")
            return False
        
        # Get the output filename
        filename = os.path.splitext(input_path)[0]
        output_path = f"{filename}.webm"
        
        # FFmpeg command for WebM compression
        cmd = [
            'ffmpeg',
            '-i', input_path,
            '-c:v', 'libvpx-vp9',  # VP9 codec for better compression
            '-crf', '28',          # Constant Rate Factor (quality setting, 0-63)
            '-b:v', '0',           # Variable bitrate
            '-c:a', 'libopus',     # Opus audio codec
            output_path
        ]
        
        # Execute the FFmpeg command
        result = subprocess.run(cmd, capture_output=True, text=True)
        
        if result.returncode == 0:
            print(f"Successfully compressed video to: {output_path}")
            return True
        else:
            print(f"Error during compression: {result.stderr}")
            return False
            
    except Exception as e:
        print(f"Error processing video: {str(e)}")
        return False
    
def process_backgrounds_directory():
    # Get the absolute path to the backgrounds directory
    current_dir = os.path.dirname(os.path.abspath(__file__))
    backgrounds_dir = os.path.join(os.path.dirname(current_dir), 'public', 'blog')
    images_dir = os.path.join(os.path.dirname(current_dir), 'public', 'images')
    
    # Check if directory exists
    if not os.path.exists(backgrounds_dir):
        print(f"Error: Directory '{backgrounds_dir}' does not exist")
        return False
    
    # Find all jpg files
    non_webp_files = glob.glob(os.path.join(backgrounds_dir, '*.jpg'))
    non_webp_files.extend(glob.glob(os.path.join(backgrounds_dir, '*.png')))
    non_webp_files.extend(glob.glob(os.path.join(backgrounds_dir, '*.jpeg')))
    
    non_webp_files.extend(glob.glob(os.path.join(images_dir, '*.jpg')))
    non_webp_files.extend(glob.glob(os.path.join(images_dir, '*.png')))
    non_webp_files.extend(glob.glob(os.path.join(images_dir, '*.jpeg')))

    if not non_webp_files:
        print("No JPG or PNG files found in the backgrounds directory")
        return False
    
    # Process each file
    success_count = 0
    for non_webp_file in non_webp_files:
        if compress_to_webp(non_webp_file):
            success_count += 1
    
    print(f"Processed {success_count} out of {len(non_webp_files)} files successfully")
    return True

def process_videos_directory():
    # Get the absolute path to the videos directory
    current_dir = os.path.dirname(os.path.abspath(__file__))
    videos_dir = os.path.join(os.path.dirname(current_dir), 'public', 'videos')
    
    # Check if directory exists
    if not os.path.exists(videos_dir):
        print(f"Error: Directory '{videos_dir}' does not exist")
        return False
    
    # Find all mp4 files
    mp4_files = glob.glob(os.path.join(videos_dir, '*.mp4'))
    
    if not mp4_files:
        print("No MP4 files found in the videos directory")
        return False
    
    # Process each file
    success_count = 0
    for mp4_file in mp4_files:
        if compress_to_webm(mp4_file):
            success_count += 1
    
    print(f"Processed {success_count} out of {len(mp4_files)} files successfully")
    return True

def main():
    if len(sys.argv) == 2:
        # Process single file
        input_file = sys.argv[1]
        compress_to_webp(input_file)
    elif len(sys.argv) == 3:
        # Process single file
        input_file = sys.argv[1]
        media_type = sys.argv[2]
        if media_type == 'video':
            compress_to_webm(input_file)
        else:
            compress_to_webp(input_file)
    else:
        # Process all files in backgrounds directory
        process_backgrounds_directory()
        process_videos_directory()

if __name__ == "__main__":
    main()