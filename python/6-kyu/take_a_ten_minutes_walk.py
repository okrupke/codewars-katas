'''# Take a Ten Minutes Walk
# take-a-ten-minutes-walk
# Rank: 6 kyu
# URL: https://www.codewars.com/kata/54da539698b8a2ad76000228
# Tags: Arrays, Fundamentals
# Completed at: 2025-06-03

'''

# Solution goes here
def is_valid_walk(walk):
    # Initialize starting position at origin (0,0)
    # Using list so we can modify x and y values
    position = [0, 0]  
    time_elapsed = 0  # Counter to track number of steps taken

    # Dictionary mapping each direction to its (x, y) movement vector
    directions = {
        "n": [0, -1],   # North: move up (decrease y)
        "s": [0, 1],    # South: move down (increase y)
        "e": [1, 0],    # East: move right (increase x)
        "w": [-1, 0],   # West: move left (decrease x)
    }

    # Process each step in the walk
    for a in walk:
        # Update position based on direction vector
        position[0] += directions[a][0]
        position[1] += directions[a][1]
        time_elapsed += 1  # Increment time for each step

    # Walk is valid if it takes exactly 10 steps and returns to origin
    if time_elapsed == 10 and position == [0, 0]:
        return True
    else:
        return False
