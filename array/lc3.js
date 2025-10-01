// Longest Substring Without Repeating Characters (LC 3)



// 📘 Problem Statement

// Given a string s, find the length of the longest substring without repeating characters.


// Input: s = "abcabcbb"
// Output: 3
// Explanation: The answer is "abc", length = 3.




// Input: s = "bbbbb"
// Output: 1
// Explanation: The answer is "b", length = 1.




// Input: s = "pwwkew"
// Output: 3
// Explanation: The answer is "wke", length = 3.



// 🔑 Key Idea (Sliding Window)

// We need the longest substring with unique characters.

// Use a sliding window and a set (or map) to track seen characters.

// Expand the window with right pointer.

// If a duplicate appears, move left pointer until duplicate is removed.









var lengthOfLongestSubstring = function(s) {
    let set = new Set();
    let left = 0;
    let maxLen = 0;

    for (let right = 0; right < s.length; right++) {
        // If duplicate, shrink window from left
        while (set.has(s[right])) {
            set.delete(s[left]);
            left++;
        }
        set.add(s[right]);

        // Update max length
        maxLen = Math.max(maxLen, right - left + 1);
    }

    return maxLen;
};





console.log(lengthOfLongestSubstring("abcabcbb")); // 3
console.log(lengthOfLongestSubstring("bbbbb"));    // 1
console.log(lengthOfLongestSubstring("pwwkew"));   // 3














// 📝 Explanation (Step by Step)

// 1.Initialize:

// set → keeps track of characters in current window.

// left → start index of window.

// maxLen → result.

// 2.Iterate with right pointer:

// If s[right] already in set → shrink window by removing from left until it’s unique.

// Add s[right] to set.

// Update maxLen with window size (right - left + 1).

// 3. Return maxLen.









// 🔹 Example Dry Run

// Input: "abcabcbb"

// right=0 → 'a' → window=a → max=1

// right=1 → 'b' → window=ab → max=2

// right=2 → 'c' → window=abc → max=3

// right=3 → 'a' (duplicate) → remove left 'a' → window=bc → add 'a' → window=bca → max=3

// right=4 → 'b' (duplicate) → remove 'b' → window=ca → add 'b' → window=cab → max=3

// … continues.

// Final Answer = 3.






// ⏱ Complexity

// Time: O(n) → each character processed once.

// Space: O(k) → where k = unique characters (max 26 for lowercase, 128/256 for ASCII).