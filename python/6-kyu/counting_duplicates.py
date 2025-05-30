'''# Counting Duplicates
# counting-duplicates
# Rank: 6 kyu
# URL: https://www.codewars.com/kata/54bf1c2cd5b56cc47f0007a1
# Tags: Strings, Fundamentals
# Completed at: 2025-05-30

'''

# Solution goes here
# Function to count how many characters appear more than once in the input string (case-insensitive)
def duplicate_count(text):
    counts = {}  # Dictionary to store character frequencies

    # Convert text to lowercase to ensure case-insensitive comparison
    for letter in text.lower():
        # Increment the count for each letter; set to 1 if not seen before
        counts[letter] = counts.get(letter, 0) + 1

    # Count how many characters have a frequency greater than 1
    return sum(1 for count in counts.values() if count > 1)

# Example inputs and expected outputs
# duplicate_count("abcde")            # Expected Output: 0   (no duplicates)
# duplicate_count("aabbcde")          # Expected Output: 2   ('a' and 'b' appear more than once)
# duplicate_count("aabBcde")          # Expected Output: 2   ('a' and 'b' appear more than once, case-insensitive)
# duplicate_count("indivisibility")   # Expected Output: 1   ('i' appears multiple times)
# duplicate_count("Aa11")             # Expected Output: 2   ('a' and '1' appear more than once)
