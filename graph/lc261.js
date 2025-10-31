// 🧩 Problem: Graph Valid Tree (LC 261)
// Question:

// You are given n nodes labeled from 0 to n - 1 and a list of undirected edges.
// Write a function to check if these edges make up a valid tree.

// A valid tree must satisfy:

// 1.It is fully connected — every node is reachable from any other node.

// 2.It has no cycles.





// Example 1:


// Input:  
//  n = 5
// edges = [[0,1],[0,2],[0,3],[1,4]]



// Output:

// true


// Explanation:

// All 5 nodes are connected and there is no cycle → ✅ forms a tree.











// Example 2:
// Input:


// n = 5
// edges = [[0,1],[1,2],[2,3],[1,3],[1,4]]



// Output:

// false






// Explanation:

// There is a cycle (1-2-3-1) → ❌ not a valid tree.

// 💡 Approach (DFS or Union-Find)

// There are two common ways to solve this:

// 1.DFS/BFS Approach – Check for cycles + connectivity

// 2.Union-Find Approach – Detect cycles efficiently

// We’ll use Union-Find (Disjoint Set Union) here for better clarity.

// ✅ Union-Find Solution (with full explanation)












/**
 * @param {number} n
 * @param {number[][]} edges
 * @return {boolean}
 */
var validTree = function(n, edges) {
  // A valid tree must have exactly n - 1 edges
  if (edges.length !== n - 1) return false;

  // Initialize parent array for union-find
  const parent = Array(n).fill(0).map((_, i) => i);

  // Helper function to find the root of a node
  const find = (x) => {
    if (parent[x] !== x) parent[x] = find(parent[x]); // Path compression
    return parent[x];
  };

  // Helper function to union two nodes
  const union = (a, b) => {
    const rootA = find(a);
    const rootB = find(b);

    // If both nodes share the same root, there's a cycle
    if (rootA === rootB) return false;

    // Merge the sets
    parent[rootB] = rootA;
    return true;
  };

  // Process each edge
  for (let [a, b] of edges) {
    if (!union(a, b)) return false; // Cycle detected
  }

  // If we connected all nodes without cycle, it’s a valid tree
  return true;
};

// 🔍 Example Test Cases
console.log(validTree(5, [[0,1],[0,2],[0,3],[1,4]])); // ✅ true
console.log(validTree(5, [[0,1],[1,2],[2,3],[1,3],[1,4]])); // ❌ false










// 🧠 Dry Run Example
// Input:


// n = 5, edges = [[0,1],[0,2],[0,3],[1,4]]




// | Step | Edge  | Parents Before | Union? | Parents After |
// | ---- | ----- | -------------- | ------ | ------------- |
// | 1    | [0,1] | [0,1,2,3,4]    | ✅      | [0,0,2,3,4]   |
// | 2    | [0,2] | [0,0,2,3,4]    | ✅      | [0,0,0,3,4]   |
// | 3    | [0,3] | [0,0,0,3,4]    | ✅      | [0,0,0,0,4]   |
// | 4    | [1,4] | [0,0,0,0,4]    | ✅      | [0,0,0,0,0]   |





// No cycles → ✅ Tree is valid.




// 🧩 Time & Space Complexity

// | Operation  | Complexity                  |
// | ---------- | --------------------------- |
// | Union/Find | `O(α(N))` (≈ constant time) |
// | All Edges  | `O(N)`                      |
// | Space      | `O(N)`                      |
