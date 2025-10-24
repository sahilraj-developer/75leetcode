// Problem — Unique Paths (LeetCode 62)





// Question:

// A robot is located at the top-left corner of an m x n grid.
// The robot can only move either down or right at any point in time.

// The robot is trying to reach the bottom-right corner of the grid.

// Return the number of possible unique paths that the robot can take to reach the destination.





// 💬 Example 1




// Input: m = 3, n = 7
// Output: 28
// Explanation:
// There are 28 possible unique paths to reach the bottom-right corner.





// 💬 Example 2



// Input: m = 3, n = 2
// Output: 3
// Explanation:
// Right → Down → Down
// Down → Right → Down
// Down → Down → Right











// 💡 Approach — Dynamic Programming (Tabulation)

// We use a 2D DP table where:

// dp[i][j] = number of ways to reach cell (i, j).

// 🧠 Transition Formula:

// A robot can come to a cell (i, j) either from:

// top (i-1, j)

// left (i, j-1)




// Hence:

// dp[i][j] = dp[i-1][j] + dp[i][j-1]





// 🧱 Base Case:

// Only 1 way to reach the first row (all moves are right)

// Only 1 way to reach the first column (all moves are down)





// So:

// dp[0][j] = 1
// dp[i][0] = 1









/**
 * @param {number} m
 * @param {number} n
 * @return {number}
 */
var uniquePaths = function(m, n) {
    const dp = Array.from({ length: m }, () => new Array(n).fill(0));

    // Base cases: first row and column
    for (let i = 0; i < m; i++) dp[i][0] = 1;
    for (let j = 0; j < n; j++) dp[0][j] = 1;

    // Fill DP table
    for (let i = 1; i < m; i++) {
        for (let j = 1; j < n; j++) {
            dp[i][j] = dp[i - 1][j] + dp[i][j - 1];
        }
    }

    return dp[m - 1][n - 1];
};

// 🧪 Test Cases
console.log(uniquePaths(3, 7)); // Output: 28
console.log(uniquePaths(3, 2)); // Output: 3
console.log(uniquePaths(1, 10)); // Output: 1








// ⚙️ Complexity
// Type	Value
// ⏱ Time	O(m × n)
// 💾 Space	O(m × n) (can be optimized to O(n))








// 🔁 Space-Optimized Version

// We only need previous row, so we can use a 1D DP array:









var uniquePaths = function(m, n) {
    const dp = new Array(n).fill(1);

    for (let i = 1; i < m; i++) {
        for (let j = 1; j < n; j++) {
            dp[j] = dp[j] + dp[j - 1];
        }
    }

    return dp[n - 1];
};

// ✅ Test
console.log(uniquePaths(3, 7)); // Output: 28










// 🔢 Bonus: Combinatorial Formula Solution










var uniquePaths = function(m, n) {
    let total = m + n - 2;
    let r = Math.min(m - 1, n - 1);
    let res = 1;

    for (let i = 1; i <= r; i++) {
        res = (res * (total - r + i)) / i;
    }

    return Math.round(res);
};

// ✅ Test
console.log(uniquePaths(3, 7)); // Output: 28