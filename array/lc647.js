// Problem — Palindromic Substrings (LC 647)



// Question:
// Given a string s, return the number of palindromic substrings in it.

// A string is a palindrome if it reads the same forward and backward.

// Each substring must be continuous.






// 🧩 Example 1:


// Input: s = "abc"
// Output: 3
// Explanation: "a", "b", "c" are palindromic substrings.





// 🧩 Example 2:



// Input: s = "aaa"
// Output: 6
// Explanation:
// Palindromic substrings are:
// "a", "a", "a", "aa", "aa", "aaa"






// 💡 Approach — Expand Around Center

// Every palindrome has a center:

// Either one character (odd-length, like "aba")

// Or between two characters (even-length, like "abba")

// We’ll:

// 1.Loop through each index of the string.

// 2.Expand outward from that index to check for both odd and even palindromes.

// 3.Count each valid palindrome expansion.







// 🔍 Intuition Example

// Let’s take s = "aaa"

// We’ll check both odd and even centers for every index:

// Center	Expansion	Palindromes Found	Count
// i = 0	"a"	                       ✅	1
// (0,1)	"aa"	                    ✅	2
// i = 1	"a"	                        ✅	3
// (0,2)	"aaa"	                    ✅	4
// (1,2)	"aa"	                   ✅	5
// i = 2	"a"	                        ✅	6


// ✅ Total = 6 palindromic substrings













/**
 * @param {string} s
 * @return {number}
 */

var countSubstrings = function(s) {
    let count = 0;

    // Helper function to expand from the center
    function expandAroundCenter(left, right) {
        // Keep expanding as long as characters match
        while (left >= 0 && right < s.length && s[left] === s[right]) {
            count++;   // Found a palindrome
            left--;    // Move left pointer outward
            right++;   // Move right pointer outward
        }
    }

    // Try every possible center
    for (let i = 0; i < s.length; i++) {
        expandAroundCenter(i, i);     // Odd-length palindromes (single character)
        expandAroundCenter(i, i + 1); // Even-length palindromes (between two characters)
    }

    return count;
};

// 🧪 Test Cases
console.log(countSubstrings("abc"));     // Output: 3 -> ("a","b","c")
console.log(countSubstrings("aaa"));     // Output: 6 -> ("a","a","a","aa","aa","aaa")
console.log(countSubstrings("abba"));    // Output: 6 -> ("a","b","b","a","bb","abba")
console.log(countSubstrings("racecar")); // Output: 10 -> ("r","a","c","e","c","a","r","cec","aceca","racecar")















// 🧮 Dry Run Example
// Example: "abba"
// Step	Center	Expansion	Palindromic Substrings Found	Count
// i=0	(0,0)	"a"                                     	✅	1
// i=0	(0,1)	"ab"	                                    ❌	1
// i=1	(1,1)	"b"                                     	✅	2
// i=1	(1,2)	"bb"	                                    ✅	3
// 	(0,3)	"abba"	                                   ✅	4
// i=2	(2,2)	"b"	                                       ✅	5
// i=3	(3,3)	"a"                                     	✅	6




// ✅ Total Palindromic Substrings = 6














// 🕒 Time Complexity

// O(n²)
// Because we expand from each of the 2n - 1 centers, and expansion takes up to O(n).

// 🧠 Space Complexity

// O(1)
// We use only constant extra space.