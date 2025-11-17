// Problem: Word Search (LC 79)
// Question:

// Given an m x n grid of characters and a string word,
// return true if word exists in the grid.

// The word can be constructed from letters of sequentially adjacent cells,
// where adjacent cells are horizontally or vertically neighboring.

// ⚠️ The same letter cell cannot be used more than once.

// ✅ Example 1


// Input:
// board = [
//   ["A","B","C","E"],
//   ["S","F","C","S"],
//   ["A","D","E","E"]
// ]
// word = "ABCCED"

// Output: true





// Explanation:
// The path A → B → C → C → E → D forms the word.

// ✅ Example 2



// Input:
// board = [
//   ["A","B","C","E"],
//   ["S","F","C","S"],
//   ["A","D","E","E"]
// ]
// word = "SEE"

// Output: true





// ✅ Example 3



// Input:
// board = [
//   ["A","B","C","E"],
//   ["S","F","C","S"],
//   ["A","D","E","E"]
// ]
// word = "ABCB"

// Output: false








// Explanation:
// You can’t reuse the same cell.

// 💡 Intuition

// This is a backtracking problem — we try to form the word by exploring possible paths in the matrix.

// 1.Start from each cell that matches the first letter of the word.

// 2.Use DFS (Depth-First Search) to explore in 4 directions (up, down, left, right).

// 3.Mark visited cells temporarily (e.g., by replacing with #) to avoid reuse.

// 4.If we successfully match all letters → return true.

// 5.Backtrack (restore original cell) after exploring each path.









// 🧭 Steps / Plan

// 1.Iterate through every cell in the grid.

// 2.When board[i][j] == word[0], start DFS search.

// 3.DFS:

//     If index == word.length → found the word.

//     If out of bounds or character mismatch → return false.

//     Temporarily mark cell as visited.

//     Recursively check 4 neighbors.

//     Backtrack (restore character).

// 4.If any DFS returns true, stop immediately.







/**
 * @param {character[][]} board
 * @param {string} word
 * @return {boolean}
 */
var exist = function(board, word) {
    const rows = board.length;
    const cols = board[0].length;

    // DFS Helper
    const dfs = (r, c, index) => {
        // Base case: found full word
        if (index === word.length) return true;

        // Out of bounds or mismatch
        if (
            r < 0 || c < 0 ||
            r >= rows || c >= cols ||
            board[r][c] !== word[index]
        ) return false;

        // Mark visited
        const temp = board[r][c];
        board[r][c] = '#';

        // Explore 4 directions
        const found =
            dfs(r + 1, c, index + 1) || // down
            dfs(r - 1, c, index + 1) || // up
            dfs(r, c + 1, index + 1) || // right
            dfs(r, c - 1, index + 1);   // left

        // Backtrack (restore original character)
        board[r][c] = temp;

        return found;
    };

    // Try starting from every cell
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            if (board[i][j] === word[0] && dfs(i, j, 0)) {
                return true;
            }
        }
    }

    return false;
};

// 🧪 Example Tests
console.log(exist([
  ["A","B","C","E"],
  ["S","F","C","S"],
  ["A","D","E","E"]
], "ABCCED")); // ✅ true

console.log(exist([
  ["A","B","C","E"],
  ["S","F","C","S"],
  ["A","D","E","E"]
], "SEE")); // ✅ true

console.log(exist([
  ["A","B","C","E"],
  ["S","F","C","S"],
  ["A","D","E","E"]
], "ABCB")); // ❌ false









// 🧠 Dry Run Example

// Input:


// board =
// A B C E
// S F C S
// A D E E
// word = "ABCCED"




// Start at: board[0][0] = A (matches first letter)


// A → B → C → C → E → D


// ✅ Found complete path → return true.
