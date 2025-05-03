/**
# Strip Comments
# strip-comments
# Rank: 4 kyu
# URL: https://www.codewars.com/kata/51c8e37cee245da6b40000bd
# Tags: Strings, Algorithms
# Completed at: 2025-05-03

*/

// Solution goes here
function solution(text, markers) {
  // If no markers are provided, return the original text trimmed of trailing whitespace
  if (markers.length === 0) return text.trimEnd();

  // Escape special regex characters in each marker to avoid breaking the RegExp
  const escapedMarkers = markers.map(m => m.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'));

  // Create a RegExp pattern that matches any marker followed by the rest of the line
  const pattern = new RegExp("(" + escapedMarkers.join("|") + ").*$");

  // If the text contains line breaks, process each line separately
  if (text.includes("\n")) {
    return text
      .split("\n")                                 // Split text into individual lines
      .map(line => line.replace(pattern, "").trimEnd())  // Remove comment part, trim end whitespace
      .join("\n");                                 // Rejoin lines preserving line breaks
  } else {
    // For single-line text, just apply the pattern once
    return text.replace(pattern, "").trimEnd();     // Remove comment, trim end whitespace
  }
}
