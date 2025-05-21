/**
# Texas Hold'em Hands
# texas-holdem-hands
# Rank: 3 kyu
# URL: https://www.codewars.com/kata/524c74f855025e2495000262
# Tags: Algorithms
# Completed at: 2025-05-21

*/

// Solution goes here
const handRanking = {
    "straight-flush": 8,
    "four-of-a-kind": 7,
    "full house": 6,
    "flush": 5,
    "straight": 4,
    "three-of-a-kind": 3,
    "two pair": 2,
    "pair": 1,
    "nothing": 0
  };
  const cardRank = {
    "2": 2,
    "3": 3,
    "4": 4,
    "5": 5,
    "6": 6,
    "7": 7,
    "8": 8,
    "9": 9,
    "10": 10,
    "J": 11,
    "Q": 12,
    "K": 13,
    "A": 14
  };
  function testForHand(handArray) {
    // Parse and sort cards by rank (highest to lowest)
    const parsedCards = handArray.map(card => {
      if (typeof card === 'string') {
        // Handle cards like 'Q♠', 'K♥', etc.
        return [card.slice(0, card.length - 1), card.slice(-1)];
      }
      return card;
    });
    
    const sortedHand = parsedCards.sort((a, b) => cardRank[b[0]] - cardRank[a[0]]);
    
    // Check for flush
    const suit = sortedHand[0][1];
    const isFlush = sortedHand.every(card => card[1] === suit);
    
    // Check for straight
    const straightRanks = sortedHand.map(card => cardRank[card[0]]);
    let isStraight = true;
    for (let i = 0; i < 4; i++) {
      if (straightRanks[i] !== straightRanks[i+1] + 1) {
        isStraight = false;
        break;
      }
    }
    
    // Group cards by rank
    const rankGroups = {};
    sortedHand.forEach(card => {
      rankGroups[card[0]] = (rankGroups[card[0]] || 0) + 1;
    });
    
    // Classify cards by group size
    const sortedRanks = Object.keys(rankGroups).sort((a, b) => cardRank[b] - cardRank[a]);
    const pairs = [];
    let threeOfAKind = null;
    let fourOfAKind = null;
    const singles = [];
    
    sortedRanks.forEach(rank => {
      const count = rankGroups[rank];
      if (count === 4) fourOfAKind = rank;
      else if (count === 3) threeOfAKind = rank;
      else if (count === 2) pairs.push(rank);
      else singles.push(rank);
    });
    
    // Determine hand type and return result
    
    // 1. Straight flush
    if (isFlush && isStraight) {
      return {
        type: "straight-flush",
        ranks: sortedHand.map(card => card[0])
      };
    }
    
    // 2. Four of a kind
    if (fourOfAKind) {
      return {
        type: "four-of-a-kind",
        ranks: [fourOfAKind, ...singles.slice(0, 1)]
      };
    }
    
    // 3. Full house
    if (threeOfAKind && pairs.length > 0) {
      return {
        type: "full house",
        ranks: [threeOfAKind, pairs[0]]
      };
    }
    
    // 4. Flush
    if (isFlush) {
      // For flush, we need the direct ranks from the sorted hand, not the sorted ranks
      return {
        type: "flush",
        ranks: sortedHand.map(card => card[0])
      };
    }
    
    // 5. Straight
    if (isStraight) {
      return {
        type: "straight",
        ranks: sortedHand.map(card => card[0])
      };
    }
    
    // 6. Three of a kind
    if (threeOfAKind) {
      return {
        type: "three-of-a-kind",
        ranks: [threeOfAKind, ...singles.slice(0, 2)]
      };
    }
    
    // 7. Two pair
    if (pairs.length >= 2) {
      return {
        type: "two pair",
        ranks: [...pairs.slice(0, 2), ...singles.slice(0, 1)]
      };
    }
    
    // 8. One pair
    if (pairs.length === 1) {
      return {
        type: "pair",
        ranks: [pairs[0], ...singles.slice(0, 3)]
      };
    }
    
    // 9. High card - use the sorted hand ranks to maintain the exact order
    return {
      type: "nothing",
      ranks: sortedHand.map(card => card[0]).slice(0, 5)
    };
  }
  
  /**
   * Compare ranks between two hands of the same type
   * Returns a positive number if ranks1 is better, negative if ranks2 is better, 0 if they're equal
   */
  function compareRanks(ranks1, ranks2) {
    // Handle straights and sequential patterns
    const isSequential1 = isSequential(ranks1);
    const isSequential2 = isSequential(ranks2);
    
    if (isSequential1 && isSequential2) {
      // For straights, just compare the highest card
      return cardRank[ranks1[0]] - cardRank[ranks2[0]];
    }
    
    // For other hand types, compare each rank in order
    // This correctly handles cases like comparing AAA91 vs AAA87
    for (let i = 0; i < Math.min(ranks1.length, ranks2.length); i++) {
      const difference = cardRank[ranks1[i]] - cardRank[ranks2[i]];
      if (difference !== 0) {
        return difference;
      }
    }
    
    return 0; // Equal hands
  }
  
  // Helper function to check if ranks are sequential (like straight or straight flush)
  function isSequential(ranks) {
    if (ranks.length !== 5) return false;
    
    const rankValues = ranks.map(r => cardRank[r]).sort((a, b) => b - a);
    for (let i = 0; i < 4; i++) {
      if (rankValues[i] !== rankValues[i+1] + 1) {
        return false;
      }
    }
    return true;
  }
  
  function hand(holeCards, communityCards) {
    const allCards = [...holeCards, ...communityCards];
    const combinations = [];
    
    // Generate all 5-card combinations
    (function combine(start = 0, combo = []) {
      if (combo.length === 5) {
        combinations.push([...combo]);
        return;
      }
      for (let i = start; i < allCards.length; i++) {
        combo.push(allCards[i]);
        combine(i + 1, combo);
        combo.pop();
      }
    })();
    
    // Find the best hand
    let bestHand = null;
    
    for (const combo of combinations) {
      const result = testForHand(combo);
      
      if (!bestHand) {
        bestHand = result;
        continue;
      }
      
      // Compare hand types first
      const currentRank = handRanking[result.type];
      const bestRank = handRanking[bestHand.type];
      
      if (currentRank > bestRank) {
        // Current hand is better by type
        bestHand = result;
      } else if (currentRank === bestRank) {
        // Same type, compare card ranks
        const comparison = compareRanks(result.ranks, bestHand.ranks);
        if (comparison > 0) {
          bestHand = result;
        }
      }
    }
    
    return bestHand || {type: "nothing", ranks: []};
  }

