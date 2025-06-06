'''# Replace With Alphabet Position
# replace-with-alphabet-position
# Rank: 6 kyu
# URL: https://www.codewars.com/kata/546f922b54af40e1e90001da
# Tags: Strings, Fundamentals
# Completed at: 2025-06-06

'''

# Solution goes here
# Function to convert each letter in a text to its corresponding position in the alphabet
def alphabet_position(text):
    # Dictionary mapping each lowercase letter to its alphabetical position
    keys = {
        'a': 1, 'b': 2, 'c': 3, 'd': 4, 'e': 5,
        'f': 6, 'g': 7, 'h': 8, 'i': 9, 'j': 10,
        'k': 11, 'l': 12, 'm': 13, 'n': 14, 'o': 15,
        'p': 16, 'q': 17, 'r': 18, 's': 19, 't': 20,
        'u': 21, 'v': 22, 'w': 23, 'x': 24, 'y': 25,
        'z': 26
    }

    result = ""  # Initialize result string to accumulate numeric positions

    # Convert input to lowercase to ensure matching with dictionary keys
    for char in text.lower():
        # Only process alphabetic characters
        if char.isalpha():
            # Append the numeric position and a space to result
            result += str(keys[char]) + " "

    # Remove trailing space and return the final string
    return result.strip()
