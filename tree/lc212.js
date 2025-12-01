// Problem: Word Search II (LC 212)
// Question

// Given an m x n board of characters and an array of strings words, return all words in words that can be formed in the board.

// Words can be formed by adjacent cells (up, down, left, right), and
// the same letter cell cannot be used more than once.






// 🔍 Example
// Input




// board = [
//   ["o","a","a","n"],
//   ["e","t","a","e"],
//   ["i","h","k","r"],
//   ["i","f","l","v"]
// ]
// words = ["oath","pea","eat","rain"]




// Output


// ["oath","eat"]








// 💡 Intuition

// Brute force: Run DFS for each word → very slow (O(words × board × 4^L))

// ⚡ Optimized approach:
// Use Trie + DFS

// 1.Build a Trie of all words.

// 2.DFS from each board cell:

//     If letter not in Trie → stop early (pruning)

//     If a node in Trie is a word → record it and mark as found

// 3.Mark visited cells using #, backtrack after exploring.

// This avoids exploring unnecessary paths.






// 🧠 Trie Node Structure

// Each node stores:

//     children → map of letters

//     word → if a complete word ends here

// Example insert:


// words = ["oath","eat","rain"]




// Trie root →



// o → a → t → h (word="oath")
// e → a → t (word="eat")
// r → a → i → n (word="rain")











/**
 * @param {character[][]} board
 * @param {string[]} words
 * @return {string[]}
 */
var findWords = function(board, words) {

    // ---- Build TRIE ---- //
    const root = {};

    for (const word of words) {
        let node = root;
        for (const char of word) {
            if (!node[char]) node[char] = {};
            node = node[char];
        }
        node.word = word; // mark end of a complete word
    }

    const result = [];
    const rows = board.length, cols = board[0].length;

    // DFS Search
    function dfs(r, c, node) {
        if (r < 0 || c < 0 || r >= rows || c >= cols) return;

        const char = board[r][c];
        if (char === "#" || !node[char]) return;

        node = node[char];

        // found a word
        if (node.word) {
            result.push(node.word);
            node.word = null; // avoid duplicates
        }

        board[r][c] = "#"; // mark visited

        // explore four directions
        dfs(r + 1, c, node);
        dfs(r - 1, c, node);
        dfs(r, c + 1, node);
        dfs(r, c - 1, node);

        board[r][c] = char; // restore for backtracking
    }

    // start DFS from every cell
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            dfs(i, j, root);
        }
    }

    return result;
};

// 🧪 Example Test
console.log(findWords(
  [
    ["o","a","a","n"],
    ["e","t","a","e"],
    ["i","h","k","r"],
    ["i","f","l","v"]
  ],
  ["oath","pea","eat","rain"]
)); // ["oath","eat"]










// 🧮 Dry Run Example
// Board and Trie start at "o":


// o → a → t → h (match "oath")




// Path found:


// (0,0) → (0,1) → (1,1) → (2,1)





// Add "oath" to results, then continue.

// Next path finds "eat" using:


// (1,0) → (1,1) → (1,2)





// Words found: ["oath","eat"].