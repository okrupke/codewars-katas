'''# Categorize New Member
# categorize-new-member
# Rank: 7 kyu
# URL: https://www.codewars.com/kata/5502c9e7b3216ec63c0001aa
# Tags: Fundamentals
# Completed at: 2025-05-30

'''

# Solution goes here
# Function to determine membership category ("Senior" or "Open") based on age and handicap
def open_or_senior(data):
    output = []  # Initialize an empty list to store results

    for person in data:
        # Each person is a tuple: (age, handicap)
        # A member is "Senior" if age ≥ 55 and handicap > 7, else "Open"
        if person[0] >= 55 and person[1] > 7:  # Use 'and' instead of '&&' (Python syntax)
            output.append("Senior")
        else:
            output.append("Open")

    return output  # Return the final list of categories
