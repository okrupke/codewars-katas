'''# Number of People in the Bus
# number-of-people-in-the-bus
# Rank: 7 kyu
# URL: https://www.codewars.com/kata/5648b12ce68d9daa6b000099
# Tags: Fundamentals
# Completed at: 2025-05-31

'''

# Solution goes here
def number(bus_stops):
    return sum(on - off for on, off in bus_stops)  # Sum the net change (on - off) for each stop

