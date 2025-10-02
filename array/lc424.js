// Longest Repeating Character Replacement (LC 424)






// 📘 Problem Statement

// You are given a string s and an integer k.
// You can choose any character in the string and replace it with another character at most k times.

// Return the length of the longest substring containing the same letter after performing at most k replacements.





// Input: s = "ABAB", k = 2
// Output: 4
// Explanation: Replace both 'A's with 'B's → "BBBB"






// Input: s = "AABABBA", k = 1
// Output: 4
// Explanation: Replace one 'B' → "AAAA" or "BBBB"



// 🔑 Key Idea (Sliding Window + Frequency Count)

// 1.We need the longest substring that can become all the same character with ≤ k replacements.

// 2.Keep a sliding window with left and right.

// 3.Track the most frequent character count in the window.

//  Because only the other characters need replacement.


// 4.If invalid → shrink window from left.

// 5.Keep track of max window size.












var characterReplacement = function(s, k) {
    let count = new Map();
    let left = 0, maxCount = 0, maxLen = 0;

    for (let right = 0; right < s.length; right++) {
        // Count current char
        count.set(s[right], (count.get(s[right]) || 0) + 1);

        // Track max frequency in window
        maxCount = Math.max(maxCount, count.get(s[right]));

        // If more than k replacements needed, shrink window
        while ((right - left + 1) - maxCount > k) {
            count.set(s[left], count.get(s[left]) - 1);
            left++;
        }

        // Update max length
        maxLen = Math.max(maxLen, right - left + 1);
    }

    return maxLen;
};



console.log(characterReplacement("ABAB", 2));     // 4
console.log(characterReplacement("AABABBA", 1));  // 4














// 📝 Explanation (Step by Step)

// 1.Expand right to include characters into the window.

// 2.Count occurrences of characters and track maxCount (highest frequency char in window).

// 3.If window invalid → shrink from left until valid.



// (window length) - (max freq char count) <= k



// 4.Track maxLen across all windows.









// 🔹 Example Dry Run

// Input: s = "AABABBA", k = 1

// right=0 → "A" → window=A → max=1

// right=1 → "AA" → window=AA → max=2 → valid → len=2

// right=2 → "AAB" → window=AAB → max=2 → (3-2=1 ≤ k) → valid → len=3

// right=3 → "AABA" → max=3 → valid → len=4

// right=4 → "AABAB" → max=3 → (5-3=2 > k) → shrink left → "ABAB" → len=4

// right=5 → "ABABB" → max=3 → valid → len=4

// right=6 → "ABABBA" → max=3 → invalid → shrink → len=4

// ✅ Final Answer = 4










// ⏱ Complexity

// Time: O(n) (each char processed at most twice: enter + leave window)

// Space: O(26) → constant space for uppercase alphabet