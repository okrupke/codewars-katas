'''# Roman Numerals Helper
# roman-numerals-helper
# Rank: 4 kyu
# URL: https://www.codewars.com/kata/51b66044bce5799a7f000003
# Tags: Algorithms, Object-oriented Programming
# Completed at: 2025-06-30

'''

# Solution goes here
# This class provides utility methods for converting between Roman numerals and integers.
# It supports two main operations:
# 1. Converting integers to Roman numeral strings (`to_roman`)
# 2. Parsing Roman numeral strings into integers (`from_roman`)
class RomanNumerals:
    # Mapping of single Roman numeral characters to their corresponding integer values.
    # Used by the from_roman method to interpret individual characters.
    numeral_values = {
        'I': 1,
        'V': 5,
        'X': 10,
        'L': 50,
        'C': 100,
        'D': 500,
        'M': 1000
    }
    
    # Mapping of integer values to their Roman numeral representations, ordered from largest to smallest.
    # Used by the to_roman method to construct the numeral string.
    roman_values = {
        1000: 'M',
        900: 'CM',
        500: 'D',
        400: 'CD',
        100: 'C',
        90: 'XC',
        50: 'L',
        40: 'XL',
        10: 'X',
        9: 'IX',
        5: 'V',
        4: 'IV',
        1: 'I'
    }
    
    @staticmethod
    def to_roman(val: int) -> str:
        # Converts an integer to its Roman numeral representation.
        # Assumes input is within the valid Roman numeral range (typically 1 to 3999).
        result = ''
        # Iterate over the mapping, subtracting values and appending numerals as appropriate
        for value, numeral in RomanNumerals.roman_values.items():
            while val >= value:
                result += numeral  # Append the Roman numeral
                val -= value       # Decrease the remaining value
        return result

    @staticmethod
    def from_roman(roman_num: str) -> int:
        # Converts a Roman numeral string to its integer value.
        # The input string is processed from right to left to handle subtractive notation properly.
        result = 0
        prev_value = 0  # Tracks the value of the previous character for subtraction logic
        
        # Iterate over the Roman numeral string in reverse
        for i in range(len(roman_num) - 1, -1, -1):
            curr_char = roman_num[i].upper()  # Convert to uppercase to ensure case-insensitivity
            if curr_char not in RomanNumerals.numeral_values:
                raise ValueError(f"Invalid Roman numeral: {curr_char}")  # Handle invalid characters
            
            curr_value = RomanNumerals.numeral_values[curr_char]
            
            # Apply subtractive rule if current value is less than the previous one
            if curr_value < prev_value:
                result -= curr_value
            else:
                result += curr_value
            
            # Update previous value for next iteration
            prev_value = curr_value
        
        return result
