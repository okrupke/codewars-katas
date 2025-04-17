#!/usr/bin/env python3
import os
import sys
import requests
import json
import time
import subprocess
from datetime import datetime
import shutil
import argparse

class CodewarsSyncer:
    def __init__(self, username, repo_path, debug=False):
        """
        Initialize the CodewarsSyncer.
        
        Args:
            username (str): Codewars username
            repo_path (str): Path to local GitHub repository
            debug (bool): Enable debug mode to print detailed information
        """
        self.username = username
        self.repo_path = repo_path
        self.debug = debug
        self.api_base_url = "https://www.codewars.com/api/v1"
        self.completed_katas = []
        self.languages_map = {
            "python": ".py",
            "javascript": ".js",
            "typescript": ".ts",
            "coffeescript": ".coffee",
            "ruby": ".rb",
            "crystal": ".cr",
            "java": ".java",
            "cpp": ".cpp",
            "csharp": ".cs",
            "php": ".php",
            "swift": ".swift",
            "go": ".go",
            "rust": ".rs",
            "shell": ".sh",
            "sql": ".sql",
            "kotlin": ".kt",
            "haskell": ".hs",
            "julia": ".jl",
            "dart": ".dart",
            "r": ".r",
            "scala": ".scala",
            "powershell": ".ps1",
            "elixir": ".ex",
            "clojure": ".clj",
            "lua": ".lua",
            "nim": ".nim",
            "c": ".c",
            "cobol": ".cbl",
        }
        
    def get_user_info(self):
        """Get user information from Codewars API."""
        url = f"{self.api_base_url}/users/{self.username}"
        response = requests.get(url)
        if response.status_code != 200:
            print(f"Failed to fetch user info: {response.status_code}")
            return None
        return response.json()
    
    def get_completed_challenges(self, max_pages=None):
        """
        Fetch all completed challenges from Codewars API.
        
        Args:
            max_pages (int, optional): Maximum number of pages to fetch.
        
        Returns:
            list: List of completed challenges.
        """
        all_challenges = []
        page = 0
        total_pages = 1  # Will be updated with actual value
        
        while page < total_pages and (max_pages is None or page < max_pages):
            url = f"{self.api_base_url}/users/{self.username}/code-challenges/completed?page={page}"
            print(f"Fetching page {page+1}...")
            response = requests.get(url)
            
            if response.status_code != 200:
                print(f"Failed to fetch completed challenges: {response.status_code}")
                break
            
            data = response.json()
            total_pages = data.get("totalPages", 0)
            all_challenges.extend(data.get("data", []))
            
            page += 1
            time.sleep(1)  # Avoid rate limiting
        
        self.completed_katas = all_challenges
        print(f"Found {len(all_challenges)} completed katas.")
        
        if self.debug:
            print("\nCompleted katas details:")
            for i, kata in enumerate(all_challenges, 1):
                print(f"{i}. {kata.get('name')} (ID: {kata.get('id')}, Slug: {kata.get('slug')})")
                print(f"   Completed in: {', '.join(kata.get('completedLanguages', []))}")
                print(f"   Completed at: {kata.get('completedAt', 'Unknown')}")
                print()
        
        return all_challenges
    
    def get_challenge_details(self, challenge_id):
        """Get details for a specific challenge."""
        url = f"{self.api_base_url}/code-challenges/{challenge_id}"
        response = requests.get(url)
        if response.status_code != 200:
            print(f"Failed to fetch challenge details: {response.status_code}")
            return None
        
        challenge_details = response.json()
        
        if self.debug:
            print(f"\nDetails for kata {challenge_details.get('name', 'Unknown')}:")
            print(f"  Rank: {challenge_details.get('rank', {}).get('name', 'Unknown')}")
            print(f"  Category: {challenge_details.get('category', 'Unknown')}")
            print(f"  Languages: {', '.join(challenge_details.get('languages', []))}")
            print(f"  Tags: {', '.join(challenge_details.get('tags', []))}")
            print()
        
        return challenge_details
    
    def format_solution_file(self, challenge, language):
        """Format the solution file content."""
        extension = self.languages_map.get(language.lower(), ".txt")
        header = f"""# {challenge.get('name', 'Unknown Challenge')}
# {challenge.get('slug', 'unknown-challenge')}
# Rank: {challenge.get('rank', {}).get('name', 'Unknown')}
# URL: {challenge.get('url', '')}
# Tags: {', '.join(challenge.get('tags', []))}
# Completed at: {datetime.now().strftime('%Y-%m-%d')}

"""
        
        if extension == '.py':
            return f"'''{header}'''\n\n# Solution goes here\n"
        elif extension in ['.js', '.ts']:
            return f"/**\n{header}*/\n\n// Solution goes here\n"
        elif extension == '.java':
            return f"/**\n{header}*/\n\npublic class Solution {{\n    // Solution goes here\n}}\n"
        elif extension == '.rb':
            return f"=begin\n{header}=end\n\n# Solution goes here\n"
        else:
            return f"# {header}\n\n# Solution goes here\n"
    
    def create_directory_structure(self):
        """Create the directory structure for organizing katas."""
        for language in self.languages_map.keys():
            for kyu in range(1, 9):
                dir_path = os.path.join(self.repo_path, language, f"{kyu}-kyu")
                os.makedirs(dir_path, exist_ok=True)
    
    def sync_challenge(self, challenge):
        """Sync a single challenge to the repository."""
        challenge_id = challenge.get('id')
        challenge_details = self.get_challenge_details(challenge_id)
        
        if not challenge_details:
            print(f"Skipping {challenge.get('name', 'unknown')} - couldn't fetch details.")
            return
        
        rank = challenge_details.get('rank', {})
        rank_id = rank.get('id', 0)
        kyu = abs(rank_id) if rank_id < 0 else rank_id
        
        for language in challenge.get('completedLanguages', []):
            if language.lower() not in self.languages_map:
                print(f"Skipping language {language} - not supported.")
                continue
            
            extension = self.languages_map[language.lower()]
            dir_path = os.path.join(self.repo_path, language.lower(), f"{kyu}-kyu")
            os.makedirs(dir_path, exist_ok=True)
            
            file_name = f"{challenge.get('slug', 'unknown').replace('-', '_')}{extension}"
            file_path = os.path.join(dir_path, file_name)
            
            if self.debug:
                print(f"File path: {file_path}")
                print(f"Exists: {os.path.exists(file_path)}")
            
            if not os.path.exists(file_path):
                print(f"Creating solution file for {challenge.get('name')} ({language})")
                solution_content = self.format_solution_file(challenge_details, language)
                
                with open(file_path, 'w') as f:
                    f.write(solution_content)
            else:
                if self.debug:
                    print(f"File already exists: {file_path}, skipping...")
    
    def commit_and_push(self, message=None):
        """Commit and push changes to GitHub."""
        if message is None:
            message = f"Sync Codewars solutions - {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}"
        
        try:
            # Navigate to repo directory
            os.chdir(self.repo_path)
            
            # Add all changes
            subprocess.run(["git", "add", "."], check=True)
            
            # Check if there are changes to commit
            status = subprocess.run(["git", "status", "--porcelain"], 
                                    capture_output=True, text=True, check=True)
            
            if status.stdout.strip():
                # Commit changes
                subprocess.run(["git", "commit", "-m", message], check=True)
                
                # Push to remote
                subprocess.run(["git", "push"], check=True)
                print("Changes committed and pushed successfully.")
            else:
                print("No changes to commit.")
                
        except subprocess.CalledProcessError as e:
            print(f"Git operation failed: {e}")
            return False
        
        return True
    
    def sync_all(self, max_pages=None):
        """Sync all completed Codewars challenges to GitHub."""
        # Get user info
        user_info = self.get_user_info()
        if not user_info:
            print("Failed to fetch user information.")
            return False
        
        print(f"Syncing challenges for {user_info.get('username')} (Honor: {user_info.get('honor')})...")
        
        # Get completed challenges
        challenges = self.get_completed_challenges(max_pages)
        if not challenges:
            print("No completed challenges found.")
            return False
        
        # Create directory structure
        self.create_directory_structure()
        
        # Sync each challenge
        for challenge in challenges:
            self.sync_challenge(challenge)
            time.sleep(1)  # Avoid rate limiting
        
        # Commit and push changes
        return self.commit_and_push()

def main():
    parser = argparse.ArgumentParser(description='Sync Codewars solutions to GitHub repository.')
    parser.add_argument('username', help='Codewars username')
    parser.add_argument('--repo-path', help='Path to local GitHub repository', 
                        default=os.path.dirname(os.path.abspath(__file__)))
    parser.add_argument('--max-pages', type=int, help='Maximum number of pages to fetch', default=None)
    parser.add_argument('--debug', action='store_true', help='Enable debug mode to print detailed information')
    
    args = parser.parse_args()
    
    syncer = CodewarsSyncer(args.username, args.repo_path, args.debug)
    syncer.sync_all(args.max_pages)

if __name__ == "__main__":
    main() 