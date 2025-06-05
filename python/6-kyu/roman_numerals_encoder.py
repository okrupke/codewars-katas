'''# Roman Numerals Encoder
# roman-numerals-encoder
# Rank: 6 kyu
# URL: https://www.codewars.com/kata/51b62bf6a9c58071c600001b
# Tags: Algorithms
# Completed at: 2025-06-05

'''

# Solution goes here
# Function to convert an integer to a Roman numeral
def solution(n):
    # Validate that input is within the accepted Roman numeral range
    if not (1 <= n <= 3999):
        raise ValueError("Input must be between 1 and 3999")

    # List of tuples mapping integer values to Roman numeral strings,
    # ordered from largest to smallest for correct greedy conversion
    roman_numerals = [
        (1000, "M"), (900, "CM"), (500, "D"), (400, "CD"),
        (100, "C"),  (90, "XC"), (50, "L"),  (40, "XL"),
        (10, "X"),   (9, "IX"),  (5, "V"),   (4, "IV"), (1, "I")
    ]

    result = ""  # Initialize result string to build the Roman numeral

    # Iterate over the Roman numeral map
    for value, letter in roman_numerals:
        # Use greedy subtraction to append the correct numeral as many times as it fits
        while value <= n:
            n -= value         # Subtract the value from the input
            result += letter   # Append corresponding Roman letter to the result

    # Return the final Roman numeral string
    return result
