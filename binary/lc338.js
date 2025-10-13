// Problem — Counting Bits (LeetCode 338)



// Question:
// Given an integer n, return an array ans of length n + 1 such that:
// ans[i] is the number of 1's in the binary representation of i.




// 💬 Example 1



// Input: n = 2
// Output: [0,1,1]
// Explanation:
// 0 --> 0 (0 one)
// 1 --> 1 (1 one)
// 2 --> 10 (1 one)



// 💬 Example 2


// Input: n = 5
// Output: [0,1,1,2,1,2]
// Explanation:
// 0 --> 000 (0 ones)
// 1 --> 001 (1 one)
// 2 --> 010 (1 one)
// 3 --> 011 (2 ones)
// 4 --> 100 (1 one)
// 5 --> 101 (2 ones)







// 💡 Approach — Dynamic Programming (Using Bit Patterns)

// We observe a pattern in binary numbers:

// Every number can be represented as:
// i = (i >> 1) * 2 + (i & 1)

// The number of 1’s in i = number of 1’s in i >> 1 + (i & 1)

// So we can build the answer bottom-up using previously computed results.







// 🧠 Intuition

// When we right-shift a number (i >> 1), we effectively remove its least significant bit.
// If that bit was 1 (checked by i & 1), then we just add one to the count from the smaller number.

// So:


// dp[i] = dp[i >> 1] + (i & 1)






/**
 * @param {number} n
 * @return {number[]}
 */
var countBits = function(n) {
    let dp = new Array(n + 1).fill(0);

    for (let i = 1; i <= n; i++) {
        // Number of 1's in i = Number of 1's in (i >> 1) + last bit
        dp[i] = dp[i >> 1] + (i & 1);
    }

    return dp;
};

// 🧪 Test Cases
console.log(countBits(2)); // Output: [0,1,1]
console.log(countBits(5)); // Output: [0,1,1,2,1,2]
console.log(countBits(10)); // Output: [0,1,1,2,1,2,2,3,1,2,2]

















// 🕵️ Dry Run Example

// Input: n = 5

// i	Binary	i >> 1	dp[i >> 1]	(i & 1)	dp[i]	Result So Far
// 0	000	—	—	     —	         0	                [0]
// 1	001	0	0	     1	         1	                [0,1]
// 2	010	1	1	     0           1	                [0,1,1]
// 3	011	1	1	     1	         2	                [0,1,1,2]
// 4	100	2	1	     0	         1	                [0,1,1,2,1]
// 5	101	2	1	     1	         2	                [0,1,1,2,1,2]





// ✅ Final Output → [0,1,1,2,1,2]






// 🧩 Time & Space Complexity

// Time Complexity: O(n) — we compute each dp[i] once.

// Space Complexity: O(n) — to store results for each number.