'''# Human readable duration format
# human-readable-duration-format
# Rank: 4 kyu
# URL: https://www.codewars.com/kata/52742f58faf5485cae000b9a
# Tags: Strings, Date Time, Algorithms
# Completed at: 2025-06-10

'''

# Solution goes here
# Function to convert a duration given in seconds into a human-readable format
def format_duration(seconds):
    # Calculate remaining seconds (0–59)
    s = seconds % 60
    # Calculate minutes (0–59)
    m = (seconds // 60) % 60
    # Calculate hours (0–23)
    h = (seconds // 3600) % 24
    # Calculate days (0–364)
    d = (seconds // 86400) % 365
    # Calculate full years
    y = seconds // 31536000

    # Construct readable time parts, including proper singular/plural grammar
    # Skip units with zero value using conditional expressions (e.g., `if y else None`)
    answer = [
        f"{y} {'year' if y == 1 else 'years'}" if y else None,
        f"{d} {'day' if d == 1 else 'days'}" if d else None,
        f"{h} {'hour' if h == 1 else 'hours'}" if h else None,
        f"{m} {'minute' if m == 1 else 'minutes'}" if m else None,
        f"{s} {'second' if s == 1 else 'seconds'}" if s else None
    ]

    # Filter out any `None` values (i.e., units that were zero)
    filtered = [a for a in answer if a]

    # If zero or one unit remains, return accordingly
    if len(filtered) <= 1:
        return filtered[0] if filtered else "now"

    # Join all but the last unit with commas, and add 'and' before the final unit
    return ", ".join(filtered[:-1]) + " and " + filtered[-1]




# format_duration(0)           # Expected Output: "now"
# format_duration(1)           # Expected Output: "1 second"
# format_duration(62)          # Expected Output: "1 minute and 2 seconds"
# format_duration(3662)        # Expected Output: "1 hour, 1 minute and 2 seconds"
# format_duration(132030240)   # Expected Output: "4 years, 68 days, 3 hours and 4 minutes"
