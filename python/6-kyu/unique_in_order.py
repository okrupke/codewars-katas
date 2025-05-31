'''# Unique In Order
# unique-in-order
# Rank: 6 kyu
# URL: https://www.codewars.com/kata/54e6533c92449cc251001667
# Tags: Algorithms, Fundamentals
# Completed at: 2025-05-31

'''

# Solution goes here
# Function to return a list of elements without any consecutive duplicates
def unique_in_order(sequence):
    output = []  # Initialize list to hold unique values in order
    last_letter = None 
    for letter in sequence:
        if letter != last_letter:
            output.append(letter) 
            last_letter = letter  # Update last_letter only when a new letter is added
    return output  # Return the deduplicated list
