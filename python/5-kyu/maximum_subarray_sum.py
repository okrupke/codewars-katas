'''# Maximum  subarray sum
# maximum-subarray-sum
# Rank: 5 kyu
# URL: https://www.codewars.com/kata/54521e9ec8e60bc4de000d6c
# Tags: Algorithms, Lists, Dynamic Programming, Fundamentals, Performance
# Completed at: 2025-06-02

'''

# Solution goes here
def maxSequence(numbers):

    # Initialize best_sum to 0, as the max sum of an empty subarray is 0
    best_sum = float(0)

    # Running sum of the current subarray being considered
    current_sum = 0

    # Iterate through each number in the input list
    for x in numbers:
        # Decide whether to add the current number to the existing subarray
        # or start a new subarray starting at current element
        current_sum = max(x, current_sum + x)

        # Update best_sum if the current_sum is greater
        best_sum = max(best_sum, current_sum)

    return best_sum  # Return the maximum subarray sum found
