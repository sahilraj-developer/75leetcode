// Number of Connected Components in an Undirected Graph (LC 323)
// Problem Statement

// You are given:

//     n nodes labeled 0 to n-1

//     An array edges where each edge = [a, b] represents an undirected edge connecting node a to b.

// 👉 Return the number of connected components in the graph.

// 🔥 Example 1


// Input: n = 5, edges = [[0,1],[1,2],[3,4]]
// Output: 2




// Explanation:

// Connected groups:

// 0 — 1 — 2     3 — 4




// 🔥 Example 2


// Input: n = 5, edges = [[0,1],[1,2],[2,3],[3,4]]
// Output: 1








// Explanation: All nodes connected → 1 component

// 💡 Intuition & Approaches
// Two Common Solutions



// | Method               | Description                     | Time          | Space    |
// | -------------------- | ------------------------------- | ------------- | -------- |
// | **DFS/BFS**          | Count how many times DFS starts | O(n + e)      | O(n + e) |
// | **Union-Find (DSU)** | Merge sets and count            | O(n + e α(n)) | O(n)     |




// Union-Find is best because it's clean and fast.





// 🧮 Solution Using Union-Find





/**
 * @param {number} n
 * @param {number[][]} edges
 * @return {number}
 */
var countComponents = function(n, edges) {
    // Parent array: each node is its own parent initially
    const parent = Array(n).fill(0).map((_, i) => i);
    const rank = Array(n).fill(1);

    const find = (x) => {
        if (x !== parent[x]) parent[x] = find(parent[x]); // Path compression
        return parent[x];
    };

    const union = (a, b) => {
        let rootA = find(a);
        let rootB = find(b);

        if (rootA === rootB) return false; // already connected

        // Union by rank optimization
        if (rank[rootA] > rank[rootB]) {
            parent[rootB] = rootA;
        } else if (rank[rootA] < rank[rootB]) {
            parent[rootA] = rootB;
        } else {
            parent[rootB] = rootA;
            rank[rootA]++;
        }

        return true;
    };

    let components = n;

    for (let [a, b] of edges) {
        if (union(a, b)) components--; // successful merge → reduce component count
    }

    return components;
};

// Example Tests
console.log(countComponents(5, [[0,1],[1,2],[3,4]])); // 2
console.log(countComponents(5, [[0,1],[1,2],[2,3],[3,4]])); // 1









// 🧠 DFS Approach (Alternative)






var countComponents = function(n, edges) {
    const graph = Array.from({ length: n }, () => []);
    for (const [a, b] of edges) {
        graph[a].push(b);
        graph[b].push(a);
    }

    const visited = new Set();
    let components = 0;

    const dfs = (node) => {
        visited.add(node);
        for (let neighbor of graph[node]) {
            if (!visited.has(neighbor)) dfs(neighbor);
        }
    };

    for (let i = 0; i < n; i++) {
        if (!visited.has(i)) {
            components++;   // new component found
            dfs(i);
        }
    }

    return components;
};






// 🧠 Dry Run Example
// Input:




// n = 5, edges = [[0,1],[1,2],[3,4]]





// | Step       | Action | Components | Parent Array |
// | ---------- | ------ | ---------- | ------------ |
// | Init       | —      | 5          | [0,1,2,3,4]  |
// | union(0,1) | merge  | 4          | [0,0,2,3,4]  |
// | union(1,2) | merge  | 3          | [0,0,0,3,4]  |
// | union(3,4) | merge  | 2          | [0,0,0,3,3]  |




// 🎯 Final Output → 2