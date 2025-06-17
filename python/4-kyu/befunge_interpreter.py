'''# Befunge Interpreter
# befunge-interpreter
# Rank: 4 kyu
# URL: https://www.codewars.com/kata/526c7b931666d07889000a3c
# Tags: Interpreters, Algorithms
# Completed at: 2025-06-17

'''

# Solution goes here
def interpret(code):
    # Split code into 2D grid
    grid = [list(line) for line in code.split('\n')]
    if not grid:
        return ""
    
    # Initialize state
    stack = []  # Stack for storing values
    output = ""  # Collected output string
    x, y = 0, 0  # Instruction pointer coordinates
    dx, dy = 1, 0  # Initial direction: moving right
    string_mode = False  # Track if inside string mode
    
    # Helper functions
    def pop():
        return stack.pop() if stack else 0  # Safely pop, return 0 if empty
    
    def peek():
        return stack[-1] if stack else 0  # Safely peek, return 0 if empty
    
    # Main interpretation loop
    while True:
        if not (0 <= y < len(grid) and 0 <= x < len(grid[y])):
            # Wrap around if coordinates go out of bounds
            x = x % len(grid[y]) if grid[y] else 0
            y = y % len(grid)
        
        char = grid[y][x]  # Current instruction
        
        if string_mode and char != '"':
            stack.append(ord(char))  # " Push ASCII value of each char in string mode
            x += dx
            y += dy
            continue
        
        if char == '"':  # " Toggle string mode
            string_mode = not string_mode
        elif char in '0123456789':  # 0-9 Push this number onto the stack
            stack.append(int(char))
        elif char == '+':  # + Addition: b + a
            a, b = pop(), pop()
            stack.append(b + a)
        elif char == '-':  # - Subtraction: b - a
            a, b = pop(), pop()
            stack.append(b - a)
        elif char == '*':  # * Multiplication: b * a
            a, b = pop(), pop()
            stack.append(b * a)
        elif char == '/':  # / Integer division: b // a (0 if a == 0)
            a, b = pop(), pop()
            stack.append(b // a if a != 0 else 0)
        elif char == '%':  # % Modulo: b % a (0 if a == 0)
            a, b = pop(), pop()
            stack.append(b % a if a != 0 else 0)
        elif char == '!':  # ! Logical NOT: 1 if 0, else 0
            stack.append(1 if pop() == 0 else 0)
        elif char == '`':  # ` Greater than: 1 if b > a else 0
            a, b = pop(), pop()
            stack.append(1 if b > a else 0)
        elif char == '>':  # > Start moving right
            dx, dy = 1, 0
        elif char == '<':  # < Start moving left
            dx, dy = -1, 0
        elif char == '^':  # ^ Start moving up
            dx, dy = 0, -1
        elif char == 'v':  # v Start moving down
            dx, dy = 0, 1
        elif char == '?':  # ? Random cardinal direction
            import random
            directions = [(1, 0), (-1, 0), (0, 1), (0, -1)]
            dx, dy = random.choice(directions)
        elif char == '_':  # _ Pop, move right if 0, else left
            dx, dy = (1, 0) if pop() == 0 else (-1, 0)
        elif char == '|':  # | Pop, move down if 0, else up
            dx, dy = (0, 1) if pop() == 0 else (0, -1)
        elif char == ':':  # : Duplicate top value (or push 0 if empty)
            stack.append(peek())
        elif char == '\\':  # \ Swap top two values
            a, b = pop(), pop()
            stack.append(a)
            stack.append(b)
        elif char == '$':  # $ Pop and discard
            pop()
        elif char == '.':  # . Pop and output as integer
            output += str(pop())
        elif char == ',':  # , Pop and output as character
            output += chr(pop())
        elif char == '#':  # # Trampoline: Skip next cell
            x += dx
            y += dy
        elif char == 'p':  # p Put value into (x, y) in code grid
            y_val, x_val, v = pop(), pop(), pop()
            if 0 <= y_val < len(grid) and 0 <= x_val < len(grid[y_val]):
                grid[y_val][x_val] = chr(v)
        elif char == 'g':  # g Get ASCII value at (x, y) in code grid
            y_val, x_val = pop(), pop()
            if 0 <= y_val < len(grid) and 0 <= x_val < len(grid[y_val]):
                stack.append(ord(grid[y_val][x_val]))
            else:
                stack.append(0)
        elif char == '@':  # @ End program
            break
        # ' ' (space): No-op — implicitly ignored
        
        # Move to next instruction
        x += dx
        y += dy
    
    return output  # Final result from . and , commands
