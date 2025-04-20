/**
# Pete, the baker
# pete-the-baker
# Rank: 5 kyu
# URL: https://www.codewars.com/kata/525c65e51bf619685c000059
# Tags: Algorithms
# Completed at: 2025-04-20

*/

// Solution goes here
// Function to calculate maximum number of cakes that can be made
function cakes(recipe, available) {
  
  // Start with assuming an unlimited number of cakes
  let numberOfCakes = Infinity;
  
  // Loop through each ingredient in the recipe
  for (let ingredient in recipe) {
    
    // Calculate the maximum cakes that can be made with the current ingredient
    let maxCakes = available[ingredient] / recipe[ingredient];
    
    // If an ingredient is missing, return 0
    if (available[ingredient] === undefined) {
      return 0;
    }
    
    // Update the number of cakes to the minimum possible based on available ingredients
    if (numberOfCakes > maxCakes) {
      numberOfCakes = Math.floor(maxCakes);  // Round down to an integer
    }
  }
  
  // Return the maximum number of cakes that can be made
  return numberOfCakes;
}
