'''# Most frequently used words in a text
# most-frequently-used-words-in-a-text
# Rank: 4 kyu
# URL: https://www.codewars.com/kata/51e056fe544cf36c410000fb
# Tags: Strings, Filtering, Algorithms, Regular Expressions
# Completed at: 2025-06-16

'''

# Solution goes here
from collections import Counter  # Efficient frequency counter for collections
import re  # Regular expressions module for pattern matching

def top_3_words(text):
    # Improved regex: matches lowercase words possibly containing apostrophes
    # e.g., "don't", "it's", or even single-letter words like "a"
    words = re.findall(r"[a-z']+", text.lower())

    # Filter out strings that are only apostrophes (e.g., "'", "''", etc.)
    words = [word for word in words if word.strip("'")]

    # Count frequency of each word using Counter
    word_counts = Counter(words)

    # Return the top 3 most common words (sorted by count in descending order)
    return [word for word, _ in sorted(word_counts.items(), key=lambda x: x[1], reverse=True)[:3]]
