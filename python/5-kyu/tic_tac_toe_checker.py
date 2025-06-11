'''# Tic-Tac-Toe Checker
# tic-tac-toe-checker
# Rank: 5 kyu
# URL: https://www.codewars.com/kata/525caa5c1bf619d28c000335
# Tags: Arrays, Algorithms
# Completed at: 2025-06-11

'''

# Solution goes here
def is_solved(board):
    # Check rows
    for row in board:
        if row.count(row[0]) == 3 and row[0] != 0:
            return row[0]
    
    # Check columns
    for col in range(3):
        if board[0][col] == board[1][col] == board[2][col] != 0:
            return board[0][col]
    
    # Check diagonals
    if board[0][0] == board[1][1] == board[2][2] != 0:
        return board[0][0]
    if board[0][2] == board[1][1] == board[2][0] != 0:
        return board[0][2]
    
    # Check if board is not finished (contains 0)
    for row in board:
        if 0 in row:
            return -1
    
    # If no winner and board is full, it's a draw
    return 0
