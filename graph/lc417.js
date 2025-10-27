// Problem: Pacific Atlantic Water Flow (LC 417)




// Question:

// You are given an m x n matrix of non-negative integers heights, where heights[r][c] represents the height of a cell.

// Water can flow from a cell to another neighboring cell (up, down, left, or right) if the neighbor’s height is less than or equal to the current cell’s height.

//     The Pacific Ocean touches the left and top edges.

//     The Atlantic Ocean touches the right and bottom edges.

// Return a list of coordinates where water can flow to both oceans.



// Example 1:




// Input: heights = [
//   [1,2,2,3,5],
//   [3,2,3,4,4],
//   [2,4,5,3,1],
//   [6,7,1,4,5],
//   [5,1,1,2,4]
// ]
// Output: [
//   [0,4],
//   [1,3],
//   [1,4],
//   [2,2],
//   [3,0],
//   [3,1],
//   [4,0]
// ]




// Explanation:

// Cells that can reach both the Pacific (top/left) and Atlantic (bottom/right) are returned.

// Example 2:


// Input: heights = [[1]]
// Output: [[0,0]]






// 💡 Intuition

// Instead of checking for every cell if water can reach both oceans (which is expensive),
// we can reverse the problem:

// 🔹 Start DFS/BFS from both oceans and find which cells can reach them.
// 🔹 A cell that can be reached by both DFS traversals → answer.

// ⚙️ Approach

// 1.Create two boolean matrices:

//     pacific[m][n]

//     atlantic[m][n]

// 2.Start DFS/BFS from:

//     All top row and left column cells for Pacific.

//     All bottom row and right column cells for Atlantic.

// 3.In DFS:

//     Only move to a neighbor if its height ≥ current height (water can “flow” backward).

//     Mark reachable cells in their respective matrix.

// 4.After DFS from both oceans, collect all cells (r, c) where:


//     pacific[r][c] && atlantic[r][c]




//     🧠 DFS Solution (with comments):




    var pacificAtlantic = function(heights) {
    const rows = heights.length;
    const cols = heights[0].length;

    // Create boolean matrices
    const pacific = Array.from({ length: rows }, () => Array(cols).fill(false));
    const atlantic = Array.from({ length: rows }, () => Array(cols).fill(false));

    // Directions: up, down, left, right
    const directions = [[1,0], [-1,0], [0,1], [0,-1]];

    // DFS function
    const dfs = (r, c, visited, prevHeight) => {
        // Out of bounds
        if (r < 0 || c < 0 || r >= rows || c >= cols) return;
        // Already visited or lower height (can't flow upward)
        if (visited[r][c] || heights[r][c] < prevHeight) return;

        visited[r][c] = true;

        for (let [dr, dc] of directions) {
            dfs(r + dr, c + dc, visited, heights[r][c]);
        }
    };

    // Pacific Ocean DFS (top and left borders)
    for (let c = 0; c < cols; c++) {
        dfs(0, c, pacific, heights[0][c]);        // top row
        dfs(rows - 1, c, atlantic, heights[rows - 1][c]); // bottom row
    }

    for (let r = 0; r < rows; r++) {
        dfs(r, 0, pacific, heights[r][0]);        // left column
        dfs(r, cols - 1, atlantic, heights[r][cols - 1]); // right column
    }

    const result = [];
    // Cells that can reach both oceans
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
            if (pacific[r][c] && atlantic[r][c]) {
                result.push([r, c]);
            }
        }
    }

    return result;
};

// 🔹 Test Case
const heights = [
  [1,2,2,3,5],
  [3,2,3,4,4],
  [2,4,5,3,1],
  [6,7,1,4,5],
  [5,1,1,2,4]
];
console.log(pacificAtlantic(heights));
// Expected Output: [[0,4],[1,3],[1,4],[2,2],[3,0],[3,1],[4,0]]






// ⏱️ Complexity Analysis
// Type	Complexity
// Time Complexity	O(M × N) — each cell visited at most twice
// Space Complexity	O(M × N) — for visited matrices and recursion stack