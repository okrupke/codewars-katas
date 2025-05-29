'''# Isograms
# isograms
# Rank: 7 kyu
# URL: https://www.codewars.com/kata/54ba84be607a92aa900000f1
# Tags: Strings, Fundamentals
# Completed at: 2025-05-29

'''

# Function to check if a string is an isogram (no repeating letters)
def is_isogram(string):
    # Using a list to track letters seen so far; using a set would be more efficient for lookup (O(1) vs. O(n))
    seen_letters = []
    
    # Loop through each character in the input string
    for letter in string:
        # Normalize the character to lowercase to ensure case-insensitive comparison
        if letter.lower() in seen_letters:
            # If the letter has been seen before, it's not an isogram
            return False
        else:
            # Add the lowercase letter to the list of seen letters
            seen_letters.append(letter.lower())
    
    # If no repeats were found, the string is an isogram
    return True

# Example inputs and expected outputs
# is_isogram("Machine")        # Expected Output: True
# is_isogram("isogram")        # Expected Output: True
# is_isogram("Alphabet")       # Expected Output: False
# is_isogram("Dermatoglyphics")# Expected Output: True
# is_isogram("aba")            # Expected Output: False
