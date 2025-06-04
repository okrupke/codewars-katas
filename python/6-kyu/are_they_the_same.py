'''# Are they the "same"?
# are-they-the-same
# Rank: 6 kyu
# URL: https://www.codewars.com/kata/550498447451fbbd7600041c
# Tags: Fundamentals
# Completed at: 2025-06-04

'''

# Solution goes here
def comp(array1, array2):
    # Check if either array is None
    if array1 is None or array2 is None:
        return False
        
    # Check if both arrays are empty
    if len(array1) == 0 and len(array2) == 0:
        return True
        
    # Check if only one array is empty
    if len(array1) == 0 or len(array2) == 0:
        return False

    # Create a copy of arr1 to avoid modifying the original array
    working_arr = array2.copy()
    
    for num in array1:
        # Calculate square 
        sqr = num * num
        # Try to find and remove the square from working array
        if sqr in working_arr:
            working_arr.remove(sqr)
        else:
            return False
            
    return True
