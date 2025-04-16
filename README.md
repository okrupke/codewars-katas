# Codewars Katas

Lists all my solutions to Katas on codewars.com.

## About

This repository contains my solutions to [Codewars](https://www.codewars.com) challenges (katas). The solutions are organized by programming language and difficulty (kyu).

## Directory Structure

The katas are organized in the following structure:

```
language/
└── x-kyu/
    └── kata_name.ext
```

Where:
- `language` is the programming language (e.g., python, javascript)
- `x-kyu` is the difficulty level (1-8, where 1 is the most difficult)
- `kata_name.ext` is the name of the kata with the appropriate file extension

## Automatic Sync Script

This repository includes a Python script that automatically syncs your completed Codewars katas to this repository.

### Prerequisites

- Python 3.6+
- `requests` library
- Git configured with access to this repository

### Installation

#### Setting up a virtual environment (recommended)

On macOS and most Unix systems, it's recommended to use a virtual environment:

```bash
# Create a virtual environment
python3 -m venv venv

# Activate the virtual environment
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt
```

On Windows:

```bash
# Create a virtual environment
python -m venv venv

# Activate the virtual environment
venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt
```

### Usage

After activating your virtual environment:

```bash
python sync_codewars.py your_codewars_username
```

#### Options

- `--repo-path`: Path to the local repository (default: script directory)
- `--max-pages`: Maximum number of pages to fetch (default: all pages)

Example:

```bash
python sync_codewars.py your_codewars_username --max-pages 5
```

### Quick Demo

To see a quick demonstration of how the directory structure will look without running the actual sync:

```bash
python test_script.py
```

This will create a sample directory structure with placeholder files.

### How It Works

1. The script fetches your completed challenges from the Codewars API
2. For each challenge, it creates a file with a template containing:
   - The kata name
   - Rank (kyu)
   - URL
   - Tags
   - Completion date
3. The files are organized by language and kyu rating
4. All changes are committed and pushed to GitHub

### Notes

- The script doesn't fetch your actual solution code, only creates template files. You need to add your solutions manually.
- The Codewars API has rate limits. The script adds a delay between requests to avoid hitting these limits.
- You can run the script periodically to keep your repository updated with your latest completed katas.
