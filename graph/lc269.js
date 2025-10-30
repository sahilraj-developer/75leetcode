// Problem: Alien Dictionary (LC 269 – Premium)



// 🔍 Problem Statement

// You are given a list of words sorted lexicographically according to the rules of an alien language.

// Your task is to determine the order of characters in this alien language.

// If the given order is invalid (i.e., not possible), return an empty string "".



// 🧠 Example

// Input:
// words = ["wrt", "wrf", "er", "ett", "rftt"]



// Output:


// "wertf"




// Explanation:
// From the sorted order of words, we deduce:

//     w comes before e (from “wrt” → “er”)

//     e comes before r (from “er” → “ett”)

//     r comes before t (from “rftt”)

// Thus, one valid order is "wertf".






// ⚙️ Constraints

//     1 <= words.length <= 100

//     1 <= words[i].length <= 100

// words[i] consists of lowercase letters 'a' to 'z'.





// 💡 Intuition & Approach (Topological Sort)

// This problem can be solved by modeling it as a graph problem —
// we’ll find the topological order of characters.

// ✨ Steps
// 1. Build Graph and In-Degree

//     Each unique character is a node in the graph.

//     Compare adjacent words to find the first different character.
//     That difference defines the ordering:
//     Example: "wrt" and "wrf" → 't' comes before 'f'.

// We’ll store:

//     adj[char] = [list of chars that come after char]

//     inDegree[char] = number of incoming edges

// 2. Topological Sort (BFS / Kahn’s Algorithm)

//     Initialize a queue with characters having inDegree = 0 (no prerequisites).

//     Repeatedly remove from the queue, append to the result, and reduce in-degree of neighbors.

//     If all characters are processed → valid order.

//     If there’s a cycle → invalid → return "".

// 3. Edge Case

//     If word1 is a prefix of word2 but longer, like:

//     ["abc", "ab"]

//     → Invalid because dictionary order violated. Return "".




// 🧠 Dry Run

// Example:

// words = ["wrt", "wrf", "er", "ett", "rftt"]



// | Step | Words Compared | First Difference | Rule  | Graph   |
// | ---- | -------------- | ---------------- | ----- | ------- |
// | 1    | wrt vs wrf     | t → f            | t → f | t → [f] |
// | 2    | wrf vs er      | w → e            | w → e | w → [e] |
// | 3    | er vs ett      | r → t            | r → t | r → [t] |
// | 4    | ett vs rftt    | e → r            | e → r | e → [r] |




// Final Graph (Adjacency List):


// w → [e]
// e → [r]
// r → [t]
// t → [f]
// f → []




// In-degree:


// w:0, e:1, r:1, t:1, f:1







// BFS Order:

//     Start with [w]

//     → add e

//     → add r

//     → add t

//     → add f

// ✅ Output: "wertf"

















/**
 * @param {string[]} words
 * @return {string}
 */
var alienOrder = function(words) {
    const adj = {}; // adjacency list
    const inDegree = {}; // in-degree count

    // Step 1: Initialize graph nodes
    for (const word of words) {
        for (const char of word) {
            if (!(char in adj)) {
                adj[char] = [];
                inDegree[char] = 0;
            }
        }
    }

    // Step 2: Build graph edges from adjacent words
    for (let i = 0; i < words.length - 1; i++) {
        const w1 = words[i];
        const w2 = words[i + 1];
        const minLen = Math.min(w1.length, w2.length);
        let foundDifference = false;

        for (let j = 0; j < minLen; j++) {
            const c1 = w1[j];
            const c2 = w2[j];

            if (c1 !== c2) {
                // Create edge c1 → c2
                if (!adj[c1].includes(c2)) {
                    adj[c1].push(c2);
                    inDegree[c2]++;
                }
                foundDifference = true;
                break;
            }
        }

        // Invalid case: prefix issue (e.g., "abc" -> "ab")
        if (!foundDifference && w1.length > w2.length) return "";
    }

    // Step 3: BFS (Kahn’s algorithm)
    const queue = [];
    for (const [char, deg] of Object.entries(inDegree)) {
        if (deg === 0) queue.push(char);
    }

    let result = "";

    while (queue.length > 0) {
        const c = queue.shift();
        result += c;

        for (const next of adj[c]) {
            inDegree[next]--;
            if (inDegree[next] === 0) queue.push(next);
        }
    }

    // Step 4: Validate result length (detect cycles)
    if (result.length !== Object.keys(adj).length) return "";

    return result;
};

// 🧪 Test Cases
console.log(alienOrder(["wrt", "wrf", "er", "ett", "rftt"])); // "wertf"
console.log(alienOrder(["z", "x"])); // "zx"
console.log(alienOrder(["z", "x", "z"])); // "" (cycle)
console.log(alienOrder(["abc", "ab"])); // "" (invalid)






// 🧮 Dry Run Example 2

// Input:
// ["z", "x", "z"]


// | Comparison | Result |
// | ---------- | ------ |
// | "z" vs "x" | z → x  |
// | "x" vs "z" | x → z  |




// → Cycle detected (z → x → z)
// ✅ Output: ""




// 🕒 Complexity


// | Type      | Complexity                                              |
// | --------- | ------------------------------------------------------- |
// | **Time**  | O(N × L) — N = number of words, L = average word length |
// | **Space** | O(1) or O(26) — limited to lowercase letters            |
