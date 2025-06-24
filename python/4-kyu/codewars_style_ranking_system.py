'''# Codewars style ranking system
# codewars-style-ranking-system
# Rank: 4 kyu
# URL: https://www.codewars.com/kata/51fda2d95d6efda45e00004e
# Tags: Algorithms, Object-oriented Programming
# Completed at: 2025-06-24

'''

# Solution goes here
# This class represents a user in a ranking system similar to competitive coding or gaming platforms.
# Users have a `rank` and a `progress` metric. Progress is earned by completing activities of various ranks.
# When enough progress is accumulated, the user's rank increases.
class User:
    def __init__(self):
        # Define a list of valid ranks, excluding 0, which does not exist in the ranking system
        self._ranks = [-8, -7, -6, -5, -4, -3, -2, -1, 1, 2, 3, 4, 5, 6, 7, 8]
        
        # Initialize user's starting rank and progress
        self.rank = -8
        self.progress = 0

    # This method increases the user's progress based on the activity rank completed.
    def inc_progress(self, activity_rank):
        # Raise an error if the provided rank is invalid
        if activity_rank not in self._ranks:
            raise ValueError("Wrong rank: " + str(activity_rank))

        # If the user is already at the maximum rank, ignore further progress
        if self.rank == 8:
            return  

        # Get the indices of the current user rank and the activity rank for comparison
        user_index = self._ranks.index(self.rank)
        activity_index = self._ranks.index(activity_rank)
        diff = activity_index - user_index  # Difference in rank levels

        # Determine progress gained based on the rank difference
        if diff == 0:
            # Same rank: award 3 progress points
            self.progress += 3
        elif diff == -1:
            # One rank lower: award 1 progress point
            self.progress += 1
        elif diff > 0:
            # Higher rank: award 10 * diff^2 progress points
            self.progress += 10 * diff * diff

        # Rank-up logic: while progress is 100 or more, increase the rank accordingly
        while self.progress >= 100 and self.rank < 8:
            self.progress -= 100  # Subtract 100 progress points per rank up
            user_index = self._ranks.index(self.rank)
            if user_index < len(self._ranks) - 1:
                self.rank = self._ranks[user_index + 1]  # Move to the next rank

        # If the user has reached the maximum rank, reset progress to 0
        if self.rank == 8:
            self.progress = 0
