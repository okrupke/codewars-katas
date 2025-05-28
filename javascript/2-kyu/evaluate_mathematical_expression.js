/**
# Evaluate mathematical expression
# evaluate-mathematical-expression
# Rank: 2 kyu
# URL: https://www.codewars.com/kata/52a78825cdfc2cfc87000005
# Tags: Mathematics, Parsing, Algorithms
# Completed at: 2025-05-28

*/

// Solution goes here
/**
 * Converts a mathematical expression string into a list of tokens.
 * Supports numbers, parentheses, and operators (+, -, *, /).
 * Handles unary minus (negative numbers and negative groups).
 * @param {string} expression - The input math expression.
 * @returns {Array} List of token objects with type and value.
 */
function tokenize(expression) {
  const tokens = [];
  // Remove all whitespace from expression
  const cleanExpr = expression.replace(/\s+/g, '');
  let i = 0;
  let prevToken = null;

  while (i < cleanExpr.length) {
    const char = cleanExpr[i];

    // Handle unary minus (either before a number or a parenthesis group)
    if (char === '-' && (prevToken === null || prevToken.type === 'operator' || prevToken.value === '(')) {
      if (/\d/.test(cleanExpr[i + 1])) {
        // Case: negative number (e.g. -5)
        let numStr = '-';
        i++;
        while (i < cleanExpr.length && /[0-9.]/.test(cleanExpr[i])) {
          numStr += cleanExpr[i++];
        }
        tokens.push({ type: 'number', value: parseFloat(numStr) });
        prevToken = tokens[tokens.length - 1];
        continue;
      } else if (cleanExpr[i + 1] === '(') {
        // Case: negative group (e.g. -(2 + 3)) -> unary minus operator
        tokens.push({ type: 'operator', value: 'u-' });
        i++;
        prevToken = tokens[tokens.length - 1];
        continue;
      }
    }

    // Handle regular number (positive)
    if (/\d/.test(char)) {
      let numStr = '';
      while (i < cleanExpr.length && /[0-9.]/.test(cleanExpr[i])) {
        numStr += cleanExpr[i++];
      }
      tokens.push({ type: 'number', value: parseFloat(numStr) });
      prevToken = tokens[tokens.length - 1];
      continue;
    }

    // Handle operators
    if (['+', '-', '*', '/'].includes(char)) {
      tokens.push({ type: 'operator', value: char });
      prevToken = tokens[tokens.length - 1];
      i++;
      continue;
    }

    // Handle parentheses
    if (char === '(') {
      tokens.push({ type: 'openParen', value: char });
      prevToken = tokens[tokens.length - 1];
      i++;
      continue;
    } else if (char === ')') {
      tokens.push({ type: 'closeParen', value: char });
      prevToken = tokens[tokens.length - 1];
      i++;
      continue;
    }

    // Throw if character is invalid
    throw new Error(`Invalid character: '${char}' at index ${i}`);
  }

  return tokens;
}

  
/**
 * Evaluates a tokenized expression using operator precedence and parentheses.
 * Supports unary minus, nested expressions, and operator order.
 * @param {Array} tokens - The list of token objects.
 * @returns {number} Result of evaluating the token list.
 */
function evaluateTokens(tokens) {
  if (!tokens || tokens.length === 0) return 0;

  // Handle single number token
  if (tokens.length === 1) {
    if (tokens[0].type === 'number') {
      return tokens[0].value;
    }
    throw new Error('Invalid expression');
  }

  // First, resolve unary minus operators (u-)
  for (let i = 0; i < tokens.length; i++) {
    if (tokens[i].type === 'operator' && tokens[i].value === 'u-') {
      let nextExpr = [];
      let j = i + 1;

      // Case: u- followed by a parenthesis group
      if (tokens[j].type === 'openParen') {
        let parenCount = 1;
        j++;
        while (j < tokens.length && parenCount > 0) {
          if (tokens[j].type === 'openParen') parenCount++;
          if (tokens[j].type === 'closeParen') parenCount--;
          if (parenCount > 0) nextExpr.push(tokens[j]);
          j++;
        }
        const innerResult = evaluateTokens(nextExpr);
        tokens.splice(i, j - i, { type: 'number', value: -innerResult });

      // Case: u- followed by number
      } else if (tokens[j].type === 'number') {
        tokens.splice(i, 2, { type: 'number', value: -tokens[j].value });
      }
    }
  }

  // Next, recursively evaluate all inner parentheses
  for (let i = 0; i < tokens.length; i++) {
    if (tokens[i].type === 'openParen') {
      let parenCount = 1;
      let j = i + 1;
      const innerTokens = [];

      while (j < tokens.length && parenCount > 0) {
        if (tokens[j].type === 'openParen') parenCount++;
        if (tokens[j].type === 'closeParen') parenCount--;
        if (parenCount > 0) innerTokens.push(tokens[j]);
        j++;
      }

      const result = evaluateTokens(innerTokens);
      tokens.splice(i, j - i, { type: 'number', value: result });
      i = -1; // Restart since array changed
    }
  }

  // Copy remaining tokens to avoid modifying original during evaluation
  let workingTokens = [...tokens];

  // Handle * and / from left to right
  for (let i = 1; i < workingTokens.length - 1; i++) {
    if (workingTokens[i].type === 'operator' && (workingTokens[i].value === '*' || workingTokens[i].value === '/')) {
      const left = workingTokens[i - 1].value;
      const right = workingTokens[i + 1].value;
      let result;

      if (workingTokens[i].value === '*') {
        result = left * right;
      } else {
        if (right === 0) throw new Error('Division by zero');
        result = left / right;
      }

      // Replace operation with result
      workingTokens.splice(i - 1, 3, { type: 'number', value: result });
      i = 0; // Reset index after modification
    }
  }

  // Handle + and - from left to right
  let result = workingTokens[0].value;
  for (let i = 1; i < workingTokens.length - 1; i += 2) {
    const operator = workingTokens[i].value;
    const operand = workingTokens[i + 1].value;

    if (operator === '+') {
      result += operand;
    } else if (operator === '-') {
      result -= operand;
    }
  }

  return result;
}


/**
 * Main calculator function: takes a string expression and evaluates it.
 * @param {string} expression - The math expression to evaluate.
 * @returns {number} The result of the calculation.
 */
const calc = function(expression) {
  if (!expression || expression.trim() === '') return 0;
  const tokens = tokenize(expression);
  return evaluateTokens(tokens);
}

    
