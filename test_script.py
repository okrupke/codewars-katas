#!/usr/bin/env python3
"""
Test script to demonstrate the basic functionality of the Codewars syncer.
This script creates a mock directory structure to show how the files would be organized.
"""

import os
import json
import datetime

def create_mock_structure():
    """Create a mock directory structure to demonstrate how the files would be organized."""
    # Sample languages and kyus
    languages = ["python", "javascript", "ruby"]
    kyus = range(1, 9)
    
    # Create directory structure
    for language in languages:
        for kyu in kyus:
            dir_path = os.path.join(os.path.dirname(os.path.abspath(__file__)), 
                                   language, f"{kyu}-kyu")
            os.makedirs(dir_path, exist_ok=True)
            print(f"Created directory: {dir_path}")
    
    # Create a sample kata file
    sample_kata = {
        "id": "5277c8a221e209d3f6000b56",
        "name": "Valid Braces",
        "slug": "valid-braces",
        "url": "http://www.codewars.com/kata/valid-braces",
        "category": "algorithms",
        "description": "Write a function called `validBraces` that takes a string...",
        "tags": ["Algorithms", "Validation", "Logic", "Utilities"],
        "languages": ["javascript", "python", "ruby"],
        "rank": {
            "id": -4,
            "name": "4 kyu",
            "color": "blue"
        }
    }
    
    # Create a sample file for each language
    for language in ["python", "javascript", "ruby"]:
        dir_path = os.path.join(os.path.dirname(os.path.abspath(__file__)), 
                               language, "4-kyu")
        
        extension = ".py" if language == "python" else ".js" if language == "javascript" else ".rb"
        file_name = f"valid_braces{extension}"
        file_path = os.path.join(dir_path, file_name)
        
        # Format the solution file based on language
        if language == "python":
            header = f"""# {sample_kata['name']}
# {sample_kata['slug']}
# Rank: {sample_kata['rank']['name']}
# URL: {sample_kata['url']}
# Tags: {', '.join(sample_kata['tags'])}
# Completed at: {datetime.datetime.now().strftime('%Y-%m-%d')}

"""
            content = f"'''{header}'''\n\ndef valid_braces(string):\n    # Your solution here\n    pass\n"
        elif language == "javascript":
            header = f"""# {sample_kata['name']}
# {sample_kata['slug']}
# Rank: {sample_kata['rank']['name']}
# URL: {sample_kata['url']}
# Tags: {', '.join(sample_kata['tags'])}
# Completed at: {datetime.datetime.now().strftime('%Y-%m-%d')}

"""
            content = f"/**\n{header}*/\n\nfunction validBraces(string) {{\n    // Your solution here\n}}\n"
        else:  # Ruby
            header = f"""# {sample_kata['name']}
# {sample_kata['slug']}
# Rank: {sample_kata['rank']['name']}
# URL: {sample_kata['url']}
# Tags: {', '.join(sample_kata['tags'])}
# Completed at: {datetime.datetime.now().strftime('%Y-%m-%d')}

"""
            content = f"=begin\n{header}=end\n\ndef valid_braces(string)\n  # Your solution here\nend\n"
        
        with open(file_path, 'w') as f:
            f.write(content)
        
        print(f"Created sample kata file: {file_path}")

if __name__ == "__main__":
    print("Creating mock directory structure to demonstrate Codewars syncer...")
    create_mock_structure()
    print("\nDone! This is just a demonstration of how the directory structure and files would look.")
    print("To use the actual syncer, run 'python sync_codewars.py your_username'")
    print("Note: You will need to install the 'requests' package in a virtual environment:")
    print("\npython3 -m venv venv")
    print("source venv/bin/activate")
    print("pip install -r requirements.txt")
    print("python sync_codewars.py your_username") 