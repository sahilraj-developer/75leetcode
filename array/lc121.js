// Best Time to Buy and Sell Stock (LeetCode 121).



// 📌 Problem Statement

// You are given an array prices where prices[i] is the price of a stock on day i.

// You want to maximize your profit by choosing a single day to buy one stock and choosing a different day in the future to sell that stock.

// Return the maximum profit you can achieve from this transaction. If no profit is possible, return 0.

// 🔹 Approach (Optimal – One Pass)

// Keep track of the minimum price so far (minPrice).

// For each price, calculate the profit if you sold today (price - minPrice).

// Keep updating the maximum profit seen so far.

// 👉 This is the best solution because it only needs one pass.

// Time Complexity: O(n)

// Space Complexity: O(1)










// 🔹 Problem: Best Time to Buy and Sell Stock (LC 121)
// Given prices[i] (stock price on day i), 
// return the maximum profit by buying and selling once.

/**
 * Approach: Single Pass (Track min price + max profit)
 * Time Complexity: O(n)
 * Space Complexity: O(1)
 */

function maxProfit(prices) {
  let minPrice = Infinity; // track lowest price seen so far
  let maxProfit = 0;       // track max profit

  for (let price of prices) {
    // Update minimum price if current price is lower
    if (price < minPrice) {
      minPrice = price;
    }

    // Calculate profit if sold today
    let profit = price - minPrice;

    // Update max profit if this profit is higher
    if (profit > maxProfit) {
      maxProfit = profit;
    }
  }

  return maxProfit;
}






// ✅ Test Cases
console.log(maxProfit([7,1,5,3,6,4]));  // 5 (Buy at 1, Sell at 6)
console.log(maxProfit([7,6,4,3,1]));    // 0 (No profit possible)
console.log(maxProfit([2,4,1]));        // 2 (Buy at 2, Sell at 4)
console.log(maxProfit([1,2]));          // 1 (Buy at 1, Sell at 2)
console.log(maxProfit([3,3,5,0,0,3,1,4])); // 4 (Buy at 0, Sell at 4)
console.log(maxProfit([1]));            // 0 (Only one day → no transaction)









// 🔹 Step-by-Step Example

// prices = [7,1,5,3,6,4]

// Day 1 → price=7 → minPrice=7 → profit=0 → maxProfit=0

// Day 2 → price=1 → minPrice=1 → profit=0 → maxProfit=0

// Day 3 → price=5 → profit=5-1=4 → maxProfit=4

// Day 4 → price=3 → profit=3-1=2 → maxProfit=4

// Day 5 → price=6 → profit=6-1=5 → maxProfit=5

// Day 6 → price=4 → profit=4-1=3 → maxProfit=5

// ✅ Answer = 5