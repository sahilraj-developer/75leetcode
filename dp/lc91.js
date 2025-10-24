// Problem — Decode Ways (LeetCode 91)






// Question:

// A message containing letters from A-Z is encoded as numbers:




// 'A' -> 1
// 'B' -> 2
// ...
// 'Z' -> 26




// Given a string s containing only digits, return the number of ways to decode it.





// 💬 Example 1



// Input: s = "12"
// Output: 2
// Explanation: "12" can be decoded as "AB" (1 2) or "L" (12)




// 💬 Example 2



// Input: s = "226"
// Output: 3
// Explanation: "226" → "BZ" (2 26), "VF" (22 6), "BBF" (2 2 6)





// 💬 Example 3



// Input: s = "06"
// Output: 0
// Explanation: No valid decoding starts with '0'






// 💡 Approach — Dynamic Programming

// We’ll use DP[i] to represent the number of ways to decode the substring s[0...i-1].

// 🧠 Idea:

// If we look at the string from left to right,
//     each character (and sometimes a pair of characters) can contribute to valid decodings.






//     🧩 Recurrence Relation

// 1.If single digit (s[i-1]) is valid (1–9)
// → we can add all decodings from dp[i-1]

// 2.If two digits (s[i-2]s[i-1]) form a valid number (10–26)
// → we can add all decodings from dp[i-2]

// So:


// dp[i] = 0
// if (s[i-1] != '0') dp[i] += dp[i-1]
// if (s[i-2..i-1] between 10 and 26) dp[i] += dp[i-2]








// 🧱 Base Cases:


// dp[0] = 1  // empty string → 1 way
// dp[1] = 0 if s[0] == '0' else 1










/**
 * @param {string} s
 * @return {number}
 */
var numDecodings = function(s) {
    const n = s.length;
    if (n === 0) return 0;

    const dp = new Array(n + 1).fill(0);
    dp[0] = 1;  // base case: empty string
    dp[1] = s[0] === '0' ? 0 : 1; // first char cannot be '0'

    for (let i = 2; i <= n; i++) {
        const oneDigit = parseInt(s.slice(i - 1, i));     // single digit
        const twoDigits = parseInt(s.slice(i - 2, i));    // two digits

        if (oneDigit >= 1 && oneDigit <= 9) {
            dp[i] += dp[i - 1];
        }
        if (twoDigits >= 10 && twoDigits <= 26) {
            dp[i] += dp[i - 2];
        }
    }

    return dp[n];
};

// 🧪 Test Cases
console.log(numDecodings("12"));   // Output: 2  ("AB", "L")
console.log(numDecodings("226"));  // Output: 3  ("BZ", "VF", "BBF")
console.log(numDecodings("06"));   // Output: 0  (invalid)
console.log(numDecodings("11106")); // Output: 2












// 🧠 Dry Run Example

// Input: s = "226"

// i	Substring	oneDigit	twoDigits	dp[i] Calculation	dp[i]
// 0	""	           -	         -	                 base	 1
// 1	"2"	           2 valid        -	           dp[0]=1	     1
// 2	"22"	       2 valid	  22 valid	   dp[1]+dp[0]=1+1	  2
// 3	"226"	       6 valid	26 valid	   dp[2]+dp[1]=2+1	3







// ⚙️ Complexity
// Type	Value
// ⏱ Time	O(n)
// 💾 Space	O(n) (can be optimized to O(1))










// 💾 Space Optimized Version

// We only need last two states:






var numDecodings = function(s) {
    const n = s.length;
    if (n === 0 || s[0] === '0') return 0;

    let prev1 = 1; // dp[i-1]
    let prev2 = 1; // dp[i-2]

    for (let i = 1; i < n; i++) {
        let current = 0;
        const one = parseInt(s.slice(i, i + 1));
        const two = parseInt(s.slice(i - 1, i + 1));

        if (one >= 1 && one <= 9) current += prev1;
        if (two >= 10 && two <= 26) current += prev2;

        prev2 = prev1;
        prev1 = current;
    }

    return prev1;
};

// ✅ Test
console.log(numDecodings("226")); // Output: 3
