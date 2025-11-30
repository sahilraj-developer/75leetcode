// Problem: Implement Trie (Prefix Tree) — LC 208
// Design a data structure that supports the following operations:



// | Method               | Description                                           |
// | -------------------- | ----------------------------------------------------- |
// | `insert(word)`       | Inserts a word into the trie                          |
// | `search(word)`       | Returns true if the word exists                       |
// | `startsWith(prefix)` | Returns true if any word starts with the given prefix |










// 💡 Intuition

// A Trie is a tree-like data structure where:

//     Each node represents a character

//     A path from root to a node forms a prefix

//     A boolean marker defines whether a complete word ends there

// It offers:

//     Fast prefix searching

//     Better performance than repeatedly scanning strings

//     Time complexity: O(length of word) for all operations

// 🧱 Trie Node Structure

// Each node contains:

//     A map (or object) of children: { char → nextNode }

//     A boolean flag isEnd meaning: this node ends a valid word




// startsWith

// Same as search but no need to check isEnd










class TrieNode {
    constructor() {
        this.children = {};  // Hash map of char -> TrieNode
        this.isEnd = false;  // Marks end of word
    }
}

var Trie = function() {
    this.root = new TrieNode();
};

/**
 * @param {string} word
 * @return {void}
 */
Trie.prototype.insert = function(word) {
    let node = this.root;
    for (let char of word) {
        if (!node.children[char]) {
            node.children[char] = new TrieNode();
        }
        node = node.children[char];
    }
    node.isEnd = true; // mark end of word
};

/**
 * @param {string} word
 * @return {boolean}
 */
Trie.prototype.search = function(word) {
    let node = this.root;
    for (let char of word) {
        if (!node.children[char]) return false;
        node = node.children[char];
    }
    return node.isEnd;
};

/**
 * @param {string} prefix
 * @return {boolean}
 */
Trie.prototype.startsWith = function(prefix) {
    let node = this.root;
    for (let char of prefix) {
        if (!node.children[char]) return false;
        node = node.children[char];
    }
    return true;
};

// 🧪 Example Usage
const trie = new Trie();
trie.insert("apple");
console.log(trie.search("apple"));   // true
console.log(trie.search("app"));     // false
console.log(trie.startsWith("app")); // true
trie.insert("app");
console.log(trie.search("app"));     // true










// 🧠 Dry Run Example

// Insert "apple":



// root
//  └── a
//       └── p
//            └── p
//                 └── l
//                      └── e (isEnd = true)







// Search "app":







// | Step                                              | char | exists? | Node     |
// | ------------------------------------------------- | ---- | ------- | -------- |
// | 1                                                 | a    | yes     | continue |
// | 2                                                 | p    | yes     | continue |
// | 3                                                 | p    | yes     | continue |
// | End reached but `isEnd = false` → returns `false` |      |         |          |
