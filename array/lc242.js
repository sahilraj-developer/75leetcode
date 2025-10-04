// Valid Anagram (LeetCode 242)



// 🔹 Problem

// Question:
// Given two strings s and t, return true if t is an anagram of s, and false otherwise.

// An anagram is a word or phrase formed by rearranging the letters of a different word or phrase, typically using all original letters exactly once.

// Example 1:



// Input: s = "anagram", t = "nagaram"
// Output: true




// Input: s = "rat", t = "car"
// Output: false




// Constraints:

//     1 <= s.length, t.length <= 5 * 10^4

//     s and t consist of lowercase English letters.






// 🔹 Approach (Hash Map / Frequency Counter)
// 💡 Idea:

//     Count how many times each character appears in s.

//     Decrease the count for each character in t.

//     If all counts are zero at the end → t is an anagram of s.















    var isAnagram = function(s, t) {
    // If lengths differ, they can't be anagrams
    if (s.length !== t.length) return false;

    // Map to store frequency of each character
    let count = {};

    // Count frequency for string s
    for (let char of s) {
        count[char] = (count[char] || 0) + 1;
    }

    // Decrease frequency for string t
    for (let char of t) {
        if (!count[char]) {
            // If char not found or count is 0, not an anagram
            return false;
        }
        count[char]--;
    }

    // If we didn’t return false, it’s an anagram
    return true;
};






// 🧠 Explanation

// Let's take an example:




s = "anagram"
t = "nagaram"





// Step 1 — Count s




// count = {
//   a: 3,
//   n: 1,
//   g: 1,
//   r: 1,
//   m: 1
// }





// Step 2 — Decrease for t




// t = "nagaram"
// After processing:
//   All counts reach 0






//   ⏱️ Complexity

// Time Complexity: O(n) (we iterate through both strings once)

// Space Complexity: O(1) (constant space since only 26 lowercase letters)