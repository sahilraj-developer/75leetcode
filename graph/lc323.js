// Problem: Number of Connected Components in an Undirected Graph (lc 323)





// Question:

// You are given:

//     n nodes labeled from 0 to n - 1

//     An array edges where each element [a, b] represents an undirected edge between nodes a and b.

// 👉 Your task is to find the number of connected components in the graph.






// Example 1
// Input:


// n = 5
// edges = [[0,1],[1,2],[3,4]]




// Output:

// 2





// Explanation:

// The graph has two connected components:

// Component 1 → [0, 1, 2]

// Component 2 → [3, 4]





// Example 2
// Input:



// n = 5
// edges = [[0,1],[1,2],[2,3],[3,4]]



// Output:

// 1




// Explanation:

// All nodes are connected → one component.





// 💡 Intuition

// There are two main approaches to solve this problem:

// 1.DFS/BFS Traversal

// 2.Union-Find (Disjoint Set Union)

// We’ll cover both — starting with Union-Find, which is cleaner and efficient.






// ✅ Solution 1: Union-Find (Disjoint Set Union)





/**
 * @param {number} n
 * @param {number[][]} edges
 * @return {number}
 */
var countComponents = function(n, edges) {
  // Initially, each node is its own parent (self component)
  const parent = Array(n).fill(0).map((_, i) => i);
  const rank = Array(n).fill(1);

  // Helper: Find root of node with path compression
  const find = (node) => {
    if (parent[node] !== node) parent[node] = find(parent[node]);
    return parent[node];
  };

  // Helper: Union two nodes by rank
  const union = (a, b) => {
    const rootA = find(a);
    const rootB = find(b);

    if (rootA === rootB) return 0; // already connected

    if (rank[rootA] > rank[rootB]) {
      parent[rootB] = rootA;
    } else if (rank[rootA] < rank[rootB]) {
      parent[rootA] = rootB;
    } else {
      parent[rootB] = rootA;
      rank[rootA] += 1;
    }

    return 1; // merged new component
  };

  let components = n; // Initially all are separate

  for (let [a, b] of edges) {
    components -= union(a, b);
  }

  return components;
};

// 🔍 Example Test Cases
console.log(countComponents(5, [[0,1],[1,2],[3,4]])); // ✅ Output: 2
console.log(countComponents(5, [[0,1],[1,2],[2,3],[3,4]])); // ✅ Output: 1




// 🧠 Dry Run Example
// Input:


// n = 5, edges = [[0,1],[1,2],[3,4]]



// | Step | Edge  | Components | Parents (after union) |
// | ---- | ----- | ---------- | --------------------- |
// | Init | —     | 5          | [0,1,2,3,4]           |
// | 1    | [0,1] | 4          | [0,0,2,3,4]           |
// | 2    | [1,2] | 3          | [0,0,0,3,4]           |
// | 3    | [3,4] | 2          | [0,0,0,3,3]           |



// ✅ Final Answer: 2










// ✅ Solution 2: DFS (Depth-First Search)





/**
 * @param {number} n
 * @param {number[][]} edges
 * @return {number}
 */
var countComponents = function(n, edges) {
  // Build adjacency list
  const graph = Array.from({ length: n }, () => []);
  for (let [a, b] of edges) {
    graph[a].push(b);
    graph[b].push(a);
  }

  const visited = new Set();
  let components = 0;

  const dfs = (node) => {
    if (visited.has(node)) return;
    visited.add(node);

    for (let nei of graph[node]) {
      dfs(nei);
    }
  };

  // Traverse all nodes
  for (let i = 0; i < n; i++) {
    if (!visited.has(i)) {
      components++;  // New component found
      dfs(i);
    }
  }

  return components;
};

// 🔍 Example Test Cases
console.log(countComponents(5, [[0,1],[1,2],[3,4]])); // ✅ 2
console.log(countComponents(5, [[0,1],[1,2],[2,3],[3,4]])); // ✅ 1





// | Approach   | Time Complexity   | Space Complexity |
// | ---------- | ----------------- | ---------------- |
// | Union-Find | `O(N + E * α(N))` | `O(N)`           |
// | DFS        | `O(N + E)`        | `O(N + E)`       |
