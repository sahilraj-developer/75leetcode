// Problem — Word Break (LeetCode 139)




// Question:

// Given a string s and a dictionary of strings wordDict,
// return true if s can be segmented into a space-separated sequence of one or more dictionary words.

// Note: The same word in the dictionary may be reused multiple times.







// 💬 Example 1



// Input: s = "leetcode", wordDict = ["leet", "code"]
// Output: true
// Explanation: "leetcode" can be segmented as "leet code".





// 💬 Example 2



// Input: s = "applepenapple", wordDict = ["apple", "pen"]
// Output: true
// Explanation: "applepenapple" = "apple pen apple".




// 💬 Example 3



// Input: s = "catsandog", wordDict = ["cats", "dog", "sand", "and", "cat"]
// Output: false






// 💡 Approach — Dynamic Programming (Bottom-Up)

// We’ll use a Boolean DP array dp[i] where:

// dp[i] = true if substring s[0...i-1] can be segmented into valid words.






// Base Case:

// dp[0] = true → empty string can always be segmented.




// Transition Logic:

// For each index i (from 1 to n):

//     Check all possible previous indices j (from 0 to i).

//     If dp[j] is true and s[j...i-1] is in wordDict,
//     then dp[i] = true.





//     dp[i] = dp[j] && wordDict.contains(s[j:i])









    /**
 * @param {string} s
 * @param {string[]} wordDict
 * @return {boolean}
 */
var wordBreak = function(s, wordDict) {
    const wordSet = new Set(wordDict);  // faster lookup
    const n = s.length;
    const dp = new Array(n + 1).fill(false);
    dp[0] = true; // base case

    for (let i = 1; i <= n; i++) {
        for (let j = 0; j < i; j++) {
            if (dp[j] && wordSet.has(s.substring(j, i))) {
                dp[i] = true;
                break; // no need to check further if already true
            }
        }
    }

    return dp[n];
};

// 🧪 Test Cases
console.log(wordBreak("leetcode", ["leet", "code"])); // ✅ true
console.log(wordBreak("applepenapple", ["apple", "pen"])); // ✅ true
console.log(wordBreak("catsandog", ["cats", "dog", "sand", "and", "cat"])); // ❌ false
console.log(wordBreak("aaaaaaa", ["aaaa","aaa"])); // ✅ true














// ⚙️ Complexity
// Type	Value
// ⏱ Time Complexity	O(n²) → two nested loops checking substrings
// 💾 Space Complexity	O(n) → DP array of size n + 1