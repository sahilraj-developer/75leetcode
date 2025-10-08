// Longest Palindromic Substring (LeetCode 5)



// 🔹 Problem

// Given a string s, return the longest palindromic substring in s.

// A palindrome is a string that reads the same backward as forward.





// ✅ Example 1

// Input: s = "babad"
// Output: "bab"
// // Explanation: "aba" is also a valid answer.




// ✅ Example 2

// Input: s = "cbbd"
// Output: "bb"




// ✅ Example 3


// Input: s = "a"
// Output: "a"





// ✅ Example 4


// Input: s = "ac"
// Output: "a"





// 💡 Approach — Expand Around Center

// Instead of checking every substring (O(n³)),
// we can expand around each character (center) and find the longest palindrome.

// Every palindrome has a center:

//     Odd length → one center (e.g., "aba")

//     Even length → two centers (e.g., "abba")

// We try expanding around each index (and each pair) as center
// and keep track of the maximum palindrome length found.










var longestPalindrome = function(s) {
    if (s.length <= 1) return s;

    console.log("Original String:", s);

    let start = 0, end = 0; // To store best palindrome indices

    // Helper function to expand around center
    function expandAroundCenter(left, right) {
        console.log(`\nExpanding around center: [${left}, ${right}]`);

        while (left >= 0 && right < s.length && s[left] === s[right]) {
            console.log(`Match: '${s[left]}' == '${s[right]}'`);
            left--;
            right++;
        }

        // When loop breaks, the palindrome is between (left+1, right-1)
        const len = right - left - 1;
        console.log(`Palindrome found: '${s.slice(left + 1, right)}'`);
        return len;
    }

    // Check every index as center
    for (let i = 0; i < s.length; i++) {
        console.log(`\n--- Checking center at index ${i} ('${s[i]}') ---`);

        // Odd-length palindrome
        const len1 = expandAroundCenter(i, i);
        // Even-length palindrome
        const len2 = expandAroundCenter(i, i + 1);

        const len = Math.max(len1, len2);

        // Update longest palindrome boundaries
        if (len > end - start) {
            start = i - Math.floor((len - 1) / 2);
            end = i + Math.floor(len / 2);
            console.log(`Updated Longest: '${s.slice(start, end + 1)}'`);
        }
    }

    const result = s.slice(start, end + 1);
    console.log("\n✅ Longest Palindromic Substring:", result);
    return result;
};

// 🔹 Test Cases
console.log("\nExample 1:");
longestPalindrome("babad");

console.log("\nExample 2:");
longestPalindrome("cbbd");

console.log("\nExample 3:");
longestPalindrome("a");

console.log("\nExample 4:");
longestPalindrome("ac");

console.log("\nEdge Case 1: Repeated Characters");
longestPalindrome("aaaa");

console.log("\nEdge Case 2: Mixed Case Palindrome");
longestPalindrome("Madam"); // note: case-sensitive by default


















// 🧠 Step-by-Step Example (Dry Run)
// Input: "babad"
// Center	Palindromes Found	Longest
// b	"b", "bab"	"bab"
// a	"a", "aba"	"bab"
// b	"b", "bab"	"bab"
// a	"a"	"bab"
// d	"d"	"bab"





// ✅ Result → "bab" (or "aba", both valid)








// ⚙️ Time and Space Complexity
// Complexity	Explanation
// Time: O(n²)	Each center expansion takes O(n), for n centers.
// Space: O(1)	Only constant extra space used.