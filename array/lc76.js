// Minimum Window Substring (LC 76)




// 📘 Problem Statement

// Given two strings s and t, return the minimum window substring of s such that every character in t (including duplicates) is included in the window.

// If there is no such substring, return an empty string "".





// Input: s = "ADOBECODEBANC", t = "ABC"
// Output: "BANC"



// Input: s = "a", t = "a"
// Output: "a"



// Input: s = "a", t = "aa"
// Output: ""



// 🔑 Key Idea (Sliding Window + Hash Maps)

// 1. We need to find the smallest substring of s that contains all characters of t.

// 2.Use two hash maps:

//     need → counts of each char in t.

//     window → counts of chars in current window of s.

// 3.Expand right to add chars until window is valid (contains all t chars).

// 4.Once valid → try shrinking from left to minimize window.

// 5.Track the minimum window length and substring.







var minWindow = function(s, t) {
    if (t.length > s.length) return "";

    let need = new Map();
    for (let char of t) {
        need.set(char, (need.get(char) || 0) + 1);
    }

    let window = new Map();
    let have = 0, needCount = need.size;
    let res = [-1, -1];
    let resLen = Infinity;
    let left = 0;

    for (let right = 0; right < s.length; right++) {
        let c = s[right];
        window.set(c, (window.get(c) || 0) + 1);

        if (need.has(c) && window.get(c) === need.get(c)) {
            have++;
        }

        while (have === needCount) {
            // Update result if smaller window found
            if ((right - left + 1) < resLen) {
                res = [left, right];
                resLen = right - left + 1;
            }

            // Shrink window from left
            window.set(s[left], window.get(s[left]) - 1);
            if (need.has(s[left]) && window.get(s[left]) < need.get(s[left])) {
                have--;
            }
            left++;
        }
    }

    let [l, r] = res;
    return resLen === Infinity ? "" : s.slice(l, r + 1);
};







console.log(minWindow("ADOBECODEBANC", "ABC")); // "BANC"
console.log(minWindow("a", "a"));               // "a"
console.log(minWindow("a", "aa"));              // ""









// 📝 Explanation (Step by Step)

// 1.Build need map → frequency of chars in t.
//     Example: t = "ABC" → {A:1, B:1, C:1}

// 2.Expand right pointer:

//     Add s[right] to window.

//     If frequency matches need, increment have.

// 3.When have == needCount, window is valid:

//     Try shrinking from left to minimize size.

//     Update result if new window is smaller.

// 4.Continue until end of s.

// 5.Return the minimum substring (or empty string if not found).






// 🔹 Example Dry Run

//     Input: s = "ADOBECODEBANC", t = "ABC"

//     need = {A:1, B:1, C:1}

//     Expand right → window grows: "ADOBEC" (valid).

//     Shrink left until invalid → "BEC" (valid, length=3).

//     Expand more → "BANC" → also valid, length=4.

// Final Answer = "BANC".








// ⏱ Complexity

// Time: O(|s| + |t|) → each char processed at most twice.

// Space: O(|s| + |t|) → hash maps store counts.