// Group Anagrams (LeetCode 49)




// 🔹 Problem

// Question:
// Given an array of strings strs, group the anagrams together.
// Return the grouped anagrams in any order.





// ✅ Example 1:

// Input: strs = ["eat","tea","tan","ate","nat","bat"]
// Output: [["bat"],["nat","tan"],["ate","eat","tea"]]




// ✅ Example 2:


// Input: strs = [""]
// Output: [[""]]



// ✅ Example 3:



// Input: strs = ["a"]
// Output: [["a"]]






// ⚙️ Approach 1 — Using Sorted String as Key
// 💡 Idea:

// Two strings are anagrams if, after sorting, they look the same.
// So:

// 1.Sort each string.

// 2.Use the sorted version as a key in a map.

// 3.Group all words having the same key.





var groupAnagrams = function(strs) {
    const map = new Map();

    for (let str of strs) {
        // Sort each word alphabetically (e.g., "eat" -> "aet")
        const key = str.split('').sort().join('');

        console.log(`Word: "${str}" → Sorted Key: "${key}"`);

        // Group words with same key
        if (!map.has(key)) {
            map.set(key, []);
        }
        map.get(key).push(str);
    }

    // Convert map values to array
    console.log("data",map)
    const result = Array.from(map.values());
    console.log("\nGrouped Anagrams:", result);
    return result;
};

// 🔹 Test cases
console.log("Example 1:");
groupAnagrams(["eat","tea","tan","ate","nat","bat"]);

console.log("\nExample 2:");
groupAnagrams([""]);

console.log("\nExample 3:");
groupAnagrams(["a"]);

console.log("\nEdge Case 1: Multiple empty strings");
groupAnagrams(["", "", ""]);

console.log("\nEdge Case 2: Mixed words and empty");
groupAnagrams(["a", "", ""]);

console.log("\nEdge Case 3: Case sensitivity check");
groupAnagrams(["Eat", "Tea", "Ate"]); // Uppercase letters treated differently







// Input: ["eat","tea","tan","ate","nat","bat"]

// Step-by-step:

// "eat" → sorted → "aet" → map["aet"] = ["eat"]
// "tea" → sorted → "aet" → map["aet"] = ["eat","tea"]
// "tan" → sorted → "ant" → map["ant"] = ["tan"]
// "ate" → sorted → "aet" → map["aet"] = ["eat","tea","ate"]
// "nat" → sorted → "ant" → map["ant"] = ["tan","nat"]
// "bat" → sorted → "abt" → map["abt"] = ["bat"]

// ✅ Final Result:
// [["eat","tea","ate"],["tan","nat"],["bat"]]





















// ⚙️ Approach 2 — Optimized (Character Frequency Key)
// 💡 Idea:

// Instead of sorting each word (O(k log k)),
// build a frequency count array of size 26 for each word (O(k)).

// Example:



// "eat" → [1,0,0,0,1,0,...,1,...] → key = "1,0,0,0,1,0,...,1"






// ✅ Optimized JavaScript Code




var groupAnagrams = function(strs) {
    const map = new Map();

    for (let str of strs) {
        // 26-length array to count letters
        const count = new Array(26).fill(0);

        for (let ch of str) {
            count[ch.charCodeAt(0) - 'a'.charCodeAt(0)]++;
        }

        const key = count.join('#'); // unique key based on letter freq

        console.log(`Word: "${str}" → Key: "${key}"`);

        if (!map.has(key)) map.set(key, []);
        map.get(key).push(str);
    }

    const result = Array.from(map.values());
    console.log("\nGrouped Anagrams (Optimized):", result);
    return result;
};

// Test
console.log("Optimized Approach Test:");
groupAnagrams(["eat","tea","tan","ate","nat","bat"]);







// ⏱️ Complexity Analysis

// Approach	Time Complexity	Space Complexity	Notes

// Sorting key	O(n × k log k)	O(n × k)	Simple, easy to understand

// Frequency key	O(n × k)	O(n × 26) ≈ O(n)	Faster for large input