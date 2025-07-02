'''# 4 By 4 Skyscrapers
# 4-by-4-skyscrapers
# Rank: 4 kyu
# URL: https://www.codewars.com/kata/5671d975d81d6c1c87000022
# Tags: Puzzles, Algorithms
# Completed at: 2025-07-02

'''

# Solution goes here
def solvePuzzle(clues):
    """
    Solve the 4x4 skyscraper puzzle.
    
    Args:
        clues: List of 16 integers representing clues around the grid
               (0 means no clue, indices 0-15 go clockwise around the grid)
    
    Returns:
        Tuple of 4 tuples, each containing 4 integers representing the solution grid
    """
    # Initialize empty 4x4 grid
    grid = [[0 for _ in range(4)] for _ in range(4)]
    
    # Extract clues for each direction
    top_clues = clues[0:4]      # Top row clues (left to right)
    right_clues = clues[4:8]    # Right column clues (top to bottom)
    bottom_clues = clues[8:12]  # Bottom row clues (right to left)
    left_clues = clues[12:16]   # Left column clues (bottom to top)
    
    # Reverse bottom and left clues since we view them from the opposite direction
    bottom_clues = bottom_clues[::-1]
    left_clues = left_clues[::-1]
    
    def is_valid_placement(row, col, num):
        """Check if placing num at (row, col) is valid."""
        # Check row constraint
        for c in range(4):
            if c != col and grid[row][c] == num:
                return False
        
        # Check column constraint
        for r in range(4):
            if r != row and grid[r][col] == num:
                return False
        
        return True
    
    def count_visible_buildings(buildings):
        """Count how many buildings are visible from the start of the list."""
        if not buildings:
            return 0
        
        count = 1
        max_height = buildings[0]
        
        for height in buildings[1:]:
            if height > max_height:
                count += 1
                max_height = height
        
        return count
    
    def check_clue_constraints():
        """Check if current grid satisfies all clue constraints."""
        # Check top clues (viewing from top)
        for col in range(4):
            if top_clues[col] != 0:
                buildings = [grid[row][col] for row in range(4) if grid[row][col] != 0]
                if len(buildings) == 4:  # Only check complete rows/columns
                    if count_visible_buildings(buildings) != top_clues[col]:
                        return False
        
        # Check right clues (viewing from right)
        for row in range(4):
            if right_clues[row] != 0:
                buildings = [grid[row][col] for col in range(3, -1, -1) if grid[row][col] != 0]
                if len(buildings) == 4:
                    if count_visible_buildings(buildings) != right_clues[row]:
                        return False
        
        # Check bottom clues (viewing from bottom)
        for col in range(4):
            if bottom_clues[col] != 0:
                buildings = [grid[row][col] for row in range(3, -1, -1) if grid[row][col] != 0]
                if len(buildings) == 4:
                    if count_visible_buildings(buildings) != bottom_clues[col]:
                        return False
        
        # Check left clues (viewing from left)
        for row in range(4):
            if left_clues[row] != 0:
                buildings = [grid[row][col] for col in range(4) if grid[row][col] != 0]
                if len(buildings) == 4:
                    if count_visible_buildings(buildings) != left_clues[row]:
                        return False
        
        return True
    
    def can_place_partial_clue_check(row, col, num):
        """Check if placing num at (row, col) doesn't immediately violate clue constraints."""
        # Temporarily place the number
        original = grid[row][col]
        grid[row][col] = num
        
        # Check if this placement violates any complete row/column clues
        valid = True
        
        # Check the row
        if all(grid[row][c] != 0 for c in range(4)):
            if right_clues[row] != 0:
                buildings = [grid[row][c] for c in range(3, -1, -1)]
                if count_visible_buildings(buildings) != right_clues[row]:
                    valid = False
            if left_clues[row] != 0:
                buildings = [grid[row][c] for c in range(4)]
                if count_visible_buildings(buildings) != left_clues[row]:
                    valid = False
        
        # Check the column
        if all(grid[r][col] != 0 for r in range(4)):
            if top_clues[col] != 0:
                buildings = [grid[r][col] for r in range(4)]
                if count_visible_buildings(buildings) != top_clues[col]:
                    valid = False
            if bottom_clues[col] != 0:
                buildings = [grid[r][col] for r in range(3, -1, -1)]
                if count_visible_buildings(buildings) != bottom_clues[col]:
                    valid = False
        
        # Restore original value
        grid[row][col] = original
        return valid
    
    def solve_backtrack(pos=0):
        """Solve using backtracking."""
        if pos == 16:  # All positions filled
            return check_clue_constraints()
        
        row, col = pos // 4, pos % 4
        
        # Try each number 1-4
        for num in range(1, 5):
            if is_valid_placement(row, col, num) and can_place_partial_clue_check(row, col, num):
                grid[row][col] = num
                
                if solve_backtrack(pos + 1):
                    return True
                
                grid[row][col] = 0
        
        return False
    
    # Solve the puzzle
    if solve_backtrack():
        # Convert to tuple format as required
        return tuple(tuple(row) for row in grid)
    else:
        raise ValueError("No solution exists for the given clues")


# Test the solution with the example provided
if __name__ == "__main__":
    # Example from the problem statement
    # The clues array represents: top, right, bottom, left (clockwise)
    # For the example grid:
    #   0  0  1  2
    #   0  0  0  0
    #   0  0  0  2
    # 1 0  0  0  0
    #   0  0  0  0
    #   0  0  3  0
    
    # Converting to clues array (clockwise from top-left):
    # Top: [0, 0, 1, 2]
    # Right: [0, 0, 0, 2] 
    # Bottom: [0, 0, 3, 0] (reversed)
    # Left: [1, 0, 0, 0] (reversed)
    
    example_clues = [0, 0, 1, 2, 0, 0, 0, 2, 0, 0, 3, 0, 1, 0, 0, 0]
    
    try:
        solution = solvePuzzle(example_clues)
        print("Solution found:")
        for row in solution:
            print(row)
    except ValueError as e:
        print(f"Error: {e}")
    
    # Test with a simpler example
    print("\nTesting with a simpler example...")
    simple_clues = [2, 1, 3, 2, 2, 3, 1, 2, 2, 1, 3, 2, 2, 3, 1, 2]
    
    try:
        solution = solvePuzzle(simple_clues)
        print("Simple example solution:")
        for row in solution:
            print(row)
    except ValueError as e:
        print(f"Error: {e}")
