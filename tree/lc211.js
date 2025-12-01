// Problem: Add and Search Word (LC 211)
// Design a data structure that supports:

// 1.addWord(word) — add a word to the data structure.

// 2.search(word) — search for a word; may contain . which can match any single character.

// Example



// Input:
// ["WordDictionary","addWord","addWord","addWord","search","search","search","search"]
// [[],["bad"],["dad"],["mad"],["pad"],["bad"],[".ad"],["b.."]]

// Output:
// [null,null,null,null,false,true,true,true]








// Explanation:

//     "pad" → ❌ not found

//     "bad" → ✅ exists

//     ".ad" → matches "bad" "dad" "mad"

//     "b.." → matches "bad"



// 💡 Intuition

// We store words in a Trie (Prefix Tree).
// Searching normally works like LC 208, but the wildcard . means we must explore multiple branches.

// Key Points

//     Use DFS recursion when encountering . to check all possible children.

//     If a path exists to a valid ending → return true.




// 🧠 Approach
// Trie Node Structure:

// Each node contains:

//     children map with 26 letters

//     isEnd boolean → marks end of word

// Operations
// addWord(word)

// Traverse char by char, build missing nodes, mark end.

// search(word)

// Traverse:

//     If char is a normal letter → go to that child.

//     If char is . → recursively check all children.








class WordDictionary {
    constructor() {
        this.root = {};
    }

    // Add word to Trie
    addWord(word) {
        let node = this.root;

        for (let ch of word) {
            if (!node[ch]) node[ch] = {}; // create child if missing
            node = node[ch];
        }

        node.isEnd = true; // mark end of word
    }

    // Search word (with support for wildcard '.')
    search(word) {
        const dfs = (index, node) => {
            if (index === word.length) return node.isEnd === true;

            const ch = word[index];

            if (ch === ".") {
                // Try all children
                for (let key in node) {
                    if (key !== "isEnd" && dfs(index + 1, node[key])) {
                        return true;
                    }
                }
                return false;
            } else {
                // normal character
                if (!node[ch]) return false;
                return dfs(index + 1, node[ch]);
            }
        };

        return dfs(0, this.root);
    }
}

// 🧪 Example Usage
const obj = new WordDictionary();
obj.addWord("bad");
obj.addWord("dad");
obj.addWord("mad");

console.log(obj.search("pad")); // false
console.log(obj.search("bad")); // true
console.log(obj.search(".ad")); // true
console.log(obj.search("b..")); // true








// 🧠 Dry Run
// Search ".ad"

// Start at root:

//     . → check all branches → "b", "d", "m"

//         Try "b" → "a" matches → "d" exists → .isEnd=true → return true

// Search "b.."

//     "b" → go to branch "b"

//     "." → try children: "a"

//     "." → try children "d"

//     "d".isEnd == true → success