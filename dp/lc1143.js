// Problem — Longest Common Subsequence (LeetCode 1143)



// Question:

// Given two strings text1 and text2, return the length of their longest common subsequence (LCS).

// A subsequence is a sequence derived from another string by deleting some (or no) characters without changing the order of the remaining characters.




// 💬 Example 1


// Input: text1 = "abcde", text2 = "ace"
// Output: 3
// Explanation: The LCS is "ace"




// 💬 Example 2



// Input: text1 = "abc", text2 = "abc"
// Output: 3
// Explanation: The LCS is "abc"





// 💬 Example 3



// Input: text1 = "abc", text2 = "def"
// Output: 0
// Explanation: No common subsequence








// 💡 Approach — Dynamic Programming (2D Table)

// We use bottom-up DP to compare characters of both strings.

// Let’s define:



// dp[i][j] = length of LCS between
// text1[0...i-1] and text2[0...j-1]





// Base Case:

// If either string is empty, LCS = 0



// → dp[0][*] = dp[*][0] = 0






// Transition / Recurrence:

// If characters match:


// dp[i][j] = 1 + dp[i - 1][j - 1]




// Else:


// dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1])





// Finally:




// return dp[m][n];













/**
 * @param {string} text1
 * @param {string} text2
 * @return {number}
 */
var longestCommonSubsequence = function(text1, text2) {
    const m = text1.length;
    const n = text2.length;

    // Create a (m+1) x (n+1) DP table initialized with 0
    const dp = Array.from({ length: m + 1 }, () => Array(n + 1).fill(0));

    // Build DP table
    for (let i = 1; i <= m; i++) {
        for (let j = 1; j <= n; j++) {
            if (text1[i - 1] === text2[j - 1]) {
                dp[i][j] = 1 + dp[i - 1][j - 1];
            } else {
                dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
            }
        }
    }

    return dp[m][n];
};

// 🧪 Test Cases
console.log(longestCommonSubsequence("abcde", "ace"));   // Output: 3 ("ace")
console.log(longestCommonSubsequence("abc", "abc"));     // Output: 3 ("abc")
console.log(longestCommonSubsequence("abc", "def"));     // Output: 0









// ⚙️ Complexity
// Type	Value
// ⏱ Time	O(m × n) — for each pair (i, j)
// 💾 Space	O(m × n) — 2D DP table