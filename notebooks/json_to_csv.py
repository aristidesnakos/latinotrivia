import json
import csv
import os

def convert_json_to_csv():
    # Read JSON file and remove trailing commas
    with open('youtube_videos_data.json', 'r', encoding='utf-8') as json_file:
        content = json_file.read()
        # Remove trailing commas
        content = content.replace(',\n]', '\n]')
        data = json.loads(content)
    
    # Define the fieldnames based on the JSON structure
    fieldnames = [
        'youtube_video_id',
        'title',
        'description',
        'upload_date',
        'views_count',
        'views_last_updated',
        'profile_id',
        'youtube_account'
    ]
    
    # Write to CSV
    output_file = 'youtube_videos_data.csv'
    with open(output_file, 'w', newline='', encoding='utf-8') as csv_file:
        writer = csv.DictWriter(csv_file, fieldnames=fieldnames)
        
        # Write header
        writer.writeheader()
        
        # Write data rows
        for item in data:
            writer.writerow(item)
    
    print(f"Successfully converted JSON to CSV. Output saved to: {output_file}")

if __name__ == "__main__":
    convert_json_to_csv()
