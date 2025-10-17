// Problem — Coin Change (LeetCode 322)






// Question:

// You are given an integer array coins representing different denominations of coins,
// and an integer amount representing a total amount of money.

// Return the fewest number of coins needed to make up that amount.
// If that amount cannot be made up by any combination of the coins, return -1.

// You may assume you have an infinite number of each kind of coin.





// 💬 Example 1


// Input: coins = [1, 2, 5], amount = 11
// Output: 3
// Explanation: 11 = 5 + 5 + 1



// 💬 Example 2



// Input: coins = [2], amount = 3
// Output: -1




// 💬 Example 3




// Input: coins = [1], amount = 0
// Output: 0






// 💡 Approach — Dynamic Programming (Bottom-Up)

// We use DP to store the minimum coins required for each amount from 0 to amount.

// Let dp[i] = the minimum number of coins required to make amount i.

// Base Case:

//     dp[0] = 0 → 0 coins needed to make amount 0.

// Recurrence:

// For every amount i:



//     dp[i] = min(dp[i], dp[i - coin] + 1)




// (for every coin where i - coin >= 0)

//     If i - coin is reachable (not infinity),
//     then dp[i] could be updated with dp[i - coin] + 1. 





    
/**
 * @param {number[]} coins
 * @param {number} amount
 * @return {number}
 */
var coinChange = function(coins, amount) {
    // Initialize dp array with Infinity
    let dp = new Array(amount + 1).fill(Infinity);
    dp[0] = 0; // base case: 0 coins for amount 0

    // Build up from smaller amounts to target amount
    for (let i = 1; i <= amount; i++) {
        for (let coin of coins) {
            if (i - coin >= 0) {
                dp[i] = Math.min(dp[i], dp[i - coin] + 1);
            }
        }
    }

    // If dp[amount] is still Infinity, no solution found
    return dp[amount] === Infinity ? -1 : dp[amount];
};

// 🧪 Test Cases
console.log(coinChange([1, 2, 5], 11)); // Output: 3 -> (5+5+1)
console.log(coinChange([2], 3));        // Output: -1
console.log(coinChange([1], 0));        // Output: 0
console.log(coinChange([186,419,83,408], 6249)); // Large test case







// ✅ Output = 3




// ⚙️ Time & Space Complexity
// Complexity	Value
// Time	     O(amount × n) → for each amount, check all coins
// Space	     O(amount)