from PIL import Image, ImageDraw, ImageFont
import cairosvg
from pathlib import Path
import io
from PIL import ImageDraw, Image, ImageFont

# Color configurations
COLORS = {
    'cream': '#edebe6',
    'sand': '#f1e6b8',
    'gradients': {
        'blue-to-white': ['#4a90e2', '#ffffff'],
        'orange-to-yellow': ['#ff9b44', '#ffe259'],
        'green-to-teal': ['#43cea2', '#185a9d'],
        'custom-gradient': ['#ffde59', '#ff914d']  # The gradient you attached
    }
}

def create_gradient_background(size, colors):
    """Create a gradient background"""
    width, height = size
    image = Image.new('RGBA', size)
    draw = ImageDraw.Draw(image)
    
    # Convert hex to RGB
    color1 = tuple(int(colors[0].lstrip('#')[i:i+2], 16) for i in (0, 2, 4)) + (255,)
    color2 = tuple(int(colors[1].lstrip('#')[i:i+2], 16) for i in (0, 2, 4)) + (255,)
    
    # Create gradient
    for y in range(height):
        r = int(color1[0] + (color2[0] - color1[0]) * y / height)
        g = int(color1[1] + (color2[1] - color1[1]) * y / height)
        b = int(color1[2] + (color2[2] - color1[2]) * y / height)
        draw.line([(0, y), (width, y)], fill=(r, g, b, 255))
    
    return image

def wrap_text(text, font, max_width):
    """Wrap text based on max width"""
    words = text.split()
    lines = []
    current_line = []
    
    for word in words:
        current_line.append(word)
        text_bbox = font.getbbox(' '.join(current_line))
        if text_bbox[2] > max_width:
            if len(current_line) == 1:
                lines.append(current_line[0])
                current_line = []
            else:
                current_line.pop()
                lines.append(' '.join(current_line))
                current_line = [word]
    
    if current_line:
        lines.append(' '.join(current_line))
    
    return lines

def convert_kebab_to_title(kebab_text, emphasis_color=None):
    """Convert kebab-case to Title Case with optional first word emphasis"""
    words = [word.capitalize() for word in kebab_text.split('-')]
    if emphasis_color:
        return [(words[0], emphasis_color)] + [(word, 'black') for word in words[1:]]
    return [(word, 'black') for word in words]

def create_blog_header(
    slug, 
    bg_color='custom-gradient', 
    maker_name=None, 
    emphasis_color=None,
    brand_logo_path=None,
    background_image_path=None,
    decorative_svg_path=None,
    output_dir=None
):
    """
    Create a blog header image with specified components and save it as a webp file.
    
    Args:
        slug (str): Kebab-case slug for the blog post title
        bg_color (str): Color bg_color to use (either a solid color or gradient name from COLORS)
        maker_name (str): Optional maker_name text to display
        emphasis_color (str): Optional color for emphasizing the first word
        brand_logo_path (str): Path to the brand logo image (PNG format)
        background_image_path (str): Path to the background image (PNG format)
        decorative_svg_path (str): Path to the decorative SVG element
        output_dir (str): Directory to save the output image (defaults to public/blog)
        
    Returns:
        Path: Path to the generated webp image
    """
    # Define paths
    base_dir = Path(__file__).parent.parent
    images_dir = base_dir / 'public' / 'images'
    svgs_dir = base_dir / 'public' / 'svgs'
    blog_dir = Path(output_dir) if output_dir else base_dir / 'public' / 'blog'
    
    # Create output directory if it doesn't exist
    blog_dir.mkdir(exist_ok=True, parents=True)
    
    # Load images with configurable paths
    brand_logo = Image.open(brand_logo_path if brand_logo_path else images_dir / 'icon.png').convert('RGBA')
    background_img = Image.open(background_image_path if background_image_path else images_dir / 'portland_library.png').convert('RGBA')
    
    # Convert SVG to PNG in memory
    svg_path = decorative_svg_path if decorative_svg_path else svgs_dir / 'flower-green.svg'
    png_data = cairosvg.svg2png(url=str(svg_path))
    decorative_element = Image.open(io.BytesIO(png_data)).convert('RGBA')
    
    # Create base image with gradient or solid color
    if bg_color in COLORS['gradients']:
        base = create_gradient_background((1200, 630), COLORS['gradients'][bg_color])
    else:
        base_color = COLORS.get(bg_color, bg_color)  # Use the color name or the provided hex
        base = Image.new('RGBA', (1200, 630), base_color)
    
    # Resize and position images
    brand_logo_size = (200, 200)  # Slightly larger
    background_size = (500, 400)
    decorative_size = (180, 180)  # Slightly larger
    
    brand_logo = brand_logo.resize(brand_logo_size, Image.Resampling.LANCZOS)
    background_img = background_img.resize(background_size, Image.Resampling.LANCZOS)
    decorative_element = decorative_element.resize(decorative_size, Image.Resampling.LANCZOS)
    
    # Calculate positions
    brand_logo_pos = (50, 420)  # Adjusted for larger size
    background_pos = (750, 215)
    decorative_pos = (820, 40)  # Adjusted for larger size
    
    # Paste images
    base.paste(brand_logo, brand_logo_pos, brand_logo)
    base.paste(background_img, background_pos, background_img)
    base.paste(decorative_element, decorative_pos, decorative_element)
    
    # Add title
    draw = ImageDraw.Draw(base)
    title_words = convert_kebab_to_title(slug, emphasis_color)
    
    # Set up fonts with larger sizes
    title_font_size = 80  
    maker_font_size = 40
    try:
        title_font = ImageFont.truetype("/System/Library/Fonts/Georgia.ttf", title_font_size)
        maker_font = ImageFont.truetype("/System/Library/Fonts/Georgia.ttf", maker_font_size)
    except:
        print("Warning: Could not load Noto Serif Display font, falling back to default")
        title_font = ImageFont.load_default()
        maker_font = ImageFont.load_default()
    
    # Handle text wrapping and positioning
    max_width = 600  # Increased from 700
    
    # Modified wrap_text to handle colored words
    current_line = []
    lines = []
    current_width = 0
    
    for word, color in title_words:
        # Add space after word for width calculation
        test_text = word + " "
        # Get the actual rendered width of the text
        bbox = title_font.getbbox(test_text)
        word_width = bbox[2] - bbox[0]
        
        if current_width + word_width <= max_width:
            current_line.append((word, color))
            current_width += word_width
        else:
            if current_line:
                lines.append(current_line)
            current_line = [(word, color)]
            current_width = word_width
    
    if current_line:
        lines.append(current_line)
    
    # Calculate total text height using actual font metrics
    line_spacing = title_font_size // 4  # Proportional line spacing
    total_height = len(lines) * (title_font_size + line_spacing)
    
    # Start position for first line
    text_y = (base.height - total_height) // 2  # Center vertically
    
    # Draw each line of text
    for line in lines:
        # Calculate total width of line using actual font metrics
        line_width = sum(title_font.getbbox(word + " ")[2] for word, _ in line)
        text_x = (base.width - line_width) // 2  # Center horizontally
        
        # Draw each word with its color
        for word, color in line:
            # Use the font's actual metrics for positioning
            bbox = title_font.getbbox(word + " ")
            draw.text((text_x, text_y), word + " ", font=title_font, fill=color)
            text_x += bbox[2] - bbox[0]
        text_y += title_font_size + line_spacing
    
    # Add maker_name text if provided
    if maker_name:
        # Use actual font metrics for maker_name text
        maker_bbox = maker_font.getbbox(maker_name)
        maker_width = maker_bbox[2] - maker_bbox[0]
        maker_height = maker_bbox[3] - maker_bbox[1]
        maker_x = brand_logo_pos[0] + brand_logo_size[0] + 10
        maker_y = brand_logo_pos[1] + (brand_logo_size[1] - maker_height) // (1.5)
        draw.text((maker_x, maker_y), maker_name, font=maker_font, fill='black')
    
    # Save as webp
    output_path = blog_dir / f"{slug}.webp"
    base.save(output_path, 'WEBP', quality=90)
    return output_path

if __name__ == "__main__":
    import argparse
    
    parser = argparse.ArgumentParser(description='Create a blog header image from a kebab-case slug')
    parser.add_argument('slug', help='Kebab-case slug for the blog post title')
    parser.add_argument('--bg_color', default='custom-gradient', help='Color bg_color to use')
    parser.add_argument('--maker_name', help='Optional maker_name text')
    parser.add_argument('--emphasis-color', help='Color for emphasizing the first word')
    parser.add_argument('--brand-logo', help='Path to brand logo image')
    parser.add_argument('--background-image', help='Path to background image')
    parser.add_argument('--decorative-svg', help='Path to decorative SVG element')
    parser.add_argument('--output-dir', help='Output directory for the generated image')
    
    args = parser.parse_args()
    output_path = create_blog_header(
        args.slug, 
        args.bg_color, 
        args.maker_name, 
        args.emphasis_color,
        args.brand_logo,
        args.background_image,
        args.decorative_svg,
        args.output_dir
    )
    print(f"Blog header created: {output_path}")
