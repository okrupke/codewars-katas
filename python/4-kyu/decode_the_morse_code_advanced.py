'''# Decode the Morse code, advanced
# decode-the-morse-code-advanced
# Rank: 4 kyu
# URL: https://www.codewars.com/kata/54b72c16cd7f5154e9000457
# Tags: Algorithms
# Completed at: 2025-06-16

'''

# Solution goes here
def decode_bits(bits):
    # Remove leading and trailing zeros
    bits = bits.strip('0')
    
    # Handle empty string or single character cases
    if not bits:
        return ''
    if all(bit == '1' for bit in bits):  # Handle sequence of only 1's
        return '.'
    if bits == '0':
        return ''
        
    # Find the time unit by getting the minimum length of sequences
    # This will be our basic unit of time
    sequences = ([len(seq) for seq in bits.split('0') if seq] +  # sequences of 1's
                [len(seq) for seq in bits.split('1') if seq])    # sequences of 0's
    if not sequences:
        return ''
    
    freq = min(sequences)  # Minimum length is our time unit
    
    # Convert to morse code in the correct order
    morse = bits
    # First convert the signals
    morse = morse.replace('1' * (3*freq), '-')    # Replace dashes (3 units)
    morse = morse.replace('1' * freq, '.')        # Replace dots (1 unit)
    # Then handle the spaces
    morse = morse.replace('0' * (7*freq), '   ')  # Word space (7 units)
    morse = morse.replace('0' * (3*freq), ' ')    # Letter space (3 units)
    morse = morse.replace('0' * freq, '')         # Remove intra-character spaces (1 unit)
    
    return morse

def decode_morse(morseCode):
    # Trim whitespace
    morseCode = morseCode.strip()
    
    # Split into words (on triple space)
    words = morseCode.split('   ')
    
    result = []
    for word in words:
        if word:  # Only process non-empty words
            # Get each character (letters are separated by single space)
            morse_chars = word.strip().split(' ')
            # Translate each morse character
            decoded_word = ''.join(MORSE_CODE[char] for char in morse_chars if char)
            result.append(decoded_word)
    
    return ' '.join(result)
