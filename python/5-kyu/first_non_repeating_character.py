'''# First non-repeating character
# first-non-repeating-character
# Rank: 5 kyu
# URL: https://www.codewars.com/kata/52bc74d4ac05d0945d00054e
# Tags: Strings, Algorithms
# Completed at: 2025-06-12

'''

# Solution goes here
# Function to find the first non-repeating character in a string (case-insensitive),
# but return it in its original case
def first_non_repeating_letter(s):
    # Convert the string to lowercase to perform case-insensitive comparison
    case_insensitive = s.lower()

    # Iterate over the original string to preserve original casing in the return value
    for char in s:
        # Check if the lowercase version of the character appears only once
        if case_insensitive.count(char.lower()) == 1:
            return char  # Return the original character (with its original case)

    # If no non-repeating character is found, return an empty string
    return ""
