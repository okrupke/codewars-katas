'''# Ten-Pin Bowling
# ten-pin-bowling
# Rank: 4 kyu
# URL: https://www.codewars.com/kata/5531abe4855bcc8d1f00004c
# Tags: Algorithms, Puzzles
# Completed at: 2025-06-23

'''

# Solution goes here
def bowling_score(frames):
    # Split the input string into individual frames
    frames = frames.split(" ")

    # Store the 10th frame separately (can contain 3 throws if there's a spare or strike)
    frame_ten = list(frames[9])

    result = 0  # Final score accumulator
    throws = []  # Flat list of all individual throws as characters (e.g., "X", "/", "5")
    throws_numbers = []  # Converted numeric values of throws

    # Convert each frame into a list of individual throws
    for frame in frames:
        for throw in frame:
            throws.append(throw)

    # Convert throw symbols to numeric scores
    for i in range(len(throws)):
        if throws[i] == "X":  # "X" represents a strike (10 points)
            throws_numbers.append(10)
        elif throws[i] == "/":  # "/" is a spare (10 minus previous throw)
            throws_numbers.append(10 - int(throws[i - 1]))
        else:  # Otherwise it's just a digit (e.g., "5")
            throws_numbers.append(int(throws[i]))

    # Score the first 9 frames using throw values and bonus logic
    for i in range(len(throws) - len(frame_ten)):
        if throws[i] == "X":  # Strike
            result += 10
            if i + 1 < len(throws):  # Add next two throws as bonus
                result += throws_numbers[i + 1]
            if i + 2 < len(throws):
                result += throws_numbers[i + 2]
        elif throws[i] == "/":  # Spare
            result += throws_numbers[i]
            if i + 1 < len(throws):  # Add next throw as bonus
                result += throws_numbers[i + 1]
        else:  # Regular frame, no bonus
            result += throws_numbers[i]

    # Score the 10th frame separately (it has special rules)
    for t in frame_ten:
        if t == "X":
            result += 10
        elif t == "/":
            result += 10 - int(frame_ten[0])  # Spare logic for 10th frame
        else:
            result += int(t)

    return result  # Return the total score
