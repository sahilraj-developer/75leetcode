// 🧩 Problem Statement

// You are given a 2D grid of '1's (land) and '0's (water).
// An island is formed by connecting adjacent lands horizontally or vertically.

// Return the number of islands in the grid.




// 💡 Intuition

// We can think of the grid as a graph:

//     Each '1' is a node.

//     Adjacent '1's (up, down, left, right) are connected nodes.

// To find all islands, we:

// 1.Traverse each cell in the grid.

// 2.When we find '1', it means we’ve found a new island.

// 3.We then perform DFS or BFS to mark all land connected to that '1' as '0' (visited).

// 4.Continue until the entire grid is visited.





// 🧠 Approach: Depth-First Search (DFS)
// Steps:

// 1.Loop through each cell in the grid.

// 2.When you find a '1', increment the island count.

// 3.Call a helper function dfs(i, j) to mark all connected land ('1') to '0'.

// 4.DFS explores up, down, left, and right recursively.












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
        // Base conditions: out of bounds or water
        if (r < 0 || c < 0 || r >= rows || c >= cols || grid[r][c] === '0') {
            return;
        }

        // Mark as visited
        grid[r][c] = '0';

        // Explore all 4 directions
        dfs(r + 1, c);
        dfs(r - 1, c);
        dfs(r, c + 1);
        dfs(r, c - 1);
    };

    // Traverse grid
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            if (grid[i][j] === '1') {
                count++;
                dfs(i, j);
            }
        }
    }

    return count;
};

// 🧪 Example Tests:
console.log(numIslands([
  ["1","1","1","1","0"],
  ["1","1","0","1","0"],
  ["1","1","0","0","0"],
  ["0","0","0","0","0"]
])); // Output: 1

console.log(numIslands([
  ["1","1","0","0","0"],
  ["1","1","0","0","0"],
  ["0","0","1","0","0"],
  ["0","0","0","1","1"]
])); // Output: 3









// ⏱️ Complexity Analysis

// Time: O(M × N) — every cell is visited once.

// Space: O(M × N) — recursion stack in the worst case (DFS).












// 🚀 Alternative: BFS Approach (Iterative)

// If you prefer not using recursion, use a queue:













var numIslands = function(grid) {
    if (!grid || grid.length === 0) return 0;
    const rows = grid.length, cols = grid[0].length;
    let count = 0;

    const directions = [[1,0],[-1,0],[0,1],[0,-1]];

    const bfs = (r, c) => {
        const queue = [[r, c]];
        grid[r][c] = '0';

        while (queue.length) {
            const [row, col] = queue.shift();
            for (const [dr, dc] of directions) {
                const nr = row + dr, nc = col + dc;
                if (nr >= 0 && nc >= 0 && nr < rows && nc < cols && grid[nr][nc] === '1') {
                    grid[nr][nc] = '0';
                    queue.push([nr, nc]);
                }
            }
        }
    };

    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            if (grid[i][j] === '1') {
                count++;
                bfs(i, j);
            }
        }
    }

    return count;
};
