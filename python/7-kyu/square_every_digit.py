'''# Square Every Digit
# square-every-digit
# Rank: 7 kyu
# URL: https://www.codewars.com/kata/546e2562b03326a88e000020
# Tags: Mathematics, Fundamentals
# Completed at: 2025-05-28

'''

# Solution goes here
# Function that returns an integer formed by squaring each digit of the input number
def square_digits(num):
    solution = ""  # Initialize an empty string to build the final result

    # Convert the number to a string to iterate over each digit
    for digit in str(num):
        # Convert each digit back to int, square it, convert back to string, and append to result
        # This avoids type mismatch and ensures the digits are concatenated correctly
        solution += str(int(digit) ** 2)

    # Convert the final string back to integer before returning
    return int(solution)  # Returning as int allows numerical operations on the result

# Example inputs and expected outputs
# square_digits(9119)     # Expected Output: 811181 (9²=81, 1²=1, 1²=1, 9²=81 → "811181")
# square_digits(0)        # Expected Output: 0      (0²=0 → "0")
# square_digits(123)      # Expected Output: 149    (1²=1, 2²=4, 3²=9 → "149")
# square_digits(86)       # Expected Output: 6436   (8²=64, 6²=36 → "6436")
# square_digits(5)        # Expected Output: 25     (5²=25 → "25")
