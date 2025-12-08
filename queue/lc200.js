// Problem: Number of Islands (LC 200)
// Question:

// Given an m x n grid filled with '1' (land) and '0' (water),
// return the number of islands.

// An island is formed by connecting adjacent lands horizontally or vertically (not diagonally).
// All water is surrounded by land but not necessarily connected.

// ✅ Example 1


// Input:
// grid = [
//   ["1","1","1","1","0"],
//   ["1","1","0","1","0"],
//   ["1","1","0","0","0"],
//   ["0","0","0","0","0"]
// ]

// Output: 1




// ✅ Example 2



// Input:
// grid = [
//   ["1","1","0","0","0"],
//   ["1","1","0","0","0"],
//   ["0","0","1","0","0"],
//   ["0","0","0","1","1"]
// ]

// Output: 3







// 💡 Intuition

// Think of '1' cells as pieces of land.
// Whenever we find a '1', that means a new island begins.

// We then:

//     Use DFS (or BFS) to explore and mark all connected '1' cells.

//     Convert them to '0' so we don’t count them again.

//     Increase island count.






// 🛠 Approach
// Steps:

// 1.Loop through every cell in the grid.

// 2.When you see '1':

//     Increment island count.

//     Run DFS/BFS to sink the island (turn all connected '1' to '0').

// 3.Continue scanning.






// ✅ JavaScript Solution — DFS (Most Common)









/**
 * @param {character[][]} grid
 * @return {number}
 */
var numIslands = function(grid) {
    if (!grid || grid.length === 0) return 0;

    const rows = grid.length;
    const cols = grid[0].length;
    let count = 0;

    const dfs = (r, c) => {
        // Out of bounds OR water → stop
        if (r < 0 || c < 0 || r >= rows || c >= cols || grid[r][c] === "0") {
            return;
        }

        // Mark as visited (sink land)
        grid[r][c] = "0";

        // Explore 4 directions
        dfs(r + 1, c); // down
        dfs(r - 1, c); // up
        dfs(r, c + 1); // right
        dfs(r, c - 1); // left
    };

    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            if (grid[i][j] === "1") {
                count++;     // Found new island
                dfs(i, j);   // Sink the island
            }
        }
    }

    return count;
};

// 🧪 Test
console.log(numIslands([
  ["1","1","0","0","0"],
  ["1","1","0","0","0"],
  ["0","0","1","0","0"],
  ["0","0","0","1","1"]
])); 
// ✅ Output: 3













// 🧠 Dry Run Example



[
 ["1","1","0","0","0"],
 ["1","1","0","0","0"],
 ["0","0","1","0","0"],
 ["0","0","0","1","1"]
]









// | Step  | Cell | Action                 | Islands | Resulting Grid (simplified) |
// | ----- | ---- | ---------------------- | ------- | --------------------------- |
// | (0,0) | '1'  | New island + DFS sink  | 1       | First block sunk            |
// | (2,2) | '1'  | New island             | 2       | Sinks single cell           |
// | (3,3) | '1'  | New island + DFS merge | 3       | Sinks last 2 cells          |











// 🚤 BFS Version (Alternative)




var numIslands = function(grid) {
    if (!grid || grid.length === 0) return 0;

    const rows = grid.length;
    const cols = grid[0].length;
    let count = 0;

    const bfs = (r, c) => {
        const queue = [[r, c]];
        grid[r][c] = "0";

        while (queue.length > 0) {
            const [x, y] = queue.shift();
            const dirs = [[1,0],[-1,0],[0,1],[0,-1]];

            for (let [dx, dy] of dirs) {
                const nr = x + dx, nc = y + dy;
                if (nr >= 0 && nc >= 0 && nr < rows && nc < cols && grid[nr][nc] === "1") {
                    grid[nr][nc] = "0";
                    queue.push([nr, nc]);
                }
            }
        }
    };

    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            if (grid[i][j] === "1") {
                count++;
                bfs(i, j);
            }
        }
    }

    return count;
};
