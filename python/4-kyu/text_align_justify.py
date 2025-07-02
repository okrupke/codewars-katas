'''# Text align justify
# text-align-justify
# Rank: 4 kyu
# URL: https://www.codewars.com/kata/537e18b6147aa838f600001b
# Tags: Strings, Algorithms
# Completed at: 2025-07-02

'''

# Solution goes here
def justify(text, width):
    """
    Justify text to a given width by distributing spaces evenly between words.
    The last line is left-aligned (not justified).
    """
    words = text.split()
    if not words:
        return ""
    
    lines = []
    current_line = []
    current_length = 0
    
    # Build lines efficiently
    for word in words:
        # Calculate space needed: current words + spaces between them + new word
        space_needed = len(current_line) if current_line else 0
        if current_length + len(word) + space_needed <= width:
            current_line.append(word)
            current_length += len(word)
        else:
            # Line is full, add it and start new line
            if current_line:
                lines.append(current_line)
            current_line = [word]
            current_length = len(word)
    
    # Add the last line
    if current_line:
        lines.append(current_line)
    
    # Justify each line except the last one
    result_lines = []
    for i, line in enumerate(lines):
        if i == len(lines) - 1 or len(line) == 1:
            # Last line or single word - left align
            result_lines.append(" ".join(line))
        else:
            # Justify the line with optimal space distribution
            total_spaces = width - sum(len(word) for word in line)
            gaps = len(line) - 1
            
            if gaps == 0:
                result_lines.append(line[0])
            else:
                # Calculate optimal space distribution
                spaces_per_gap = total_spaces // gaps
                extra_spaces = total_spaces % gaps
                
                # Build justified line efficiently
                justified_parts = [line[0]]
                for j in range(1, len(line)):
                    spaces = spaces_per_gap + (1 if j <= extra_spaces else 0)
                    justified_parts.append(" " * spaces + line[j])
                
                result_lines.append("".join(justified_parts))
    
    return "\n".join(result_lines)
