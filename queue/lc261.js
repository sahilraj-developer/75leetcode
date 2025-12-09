// Graph Valid Tree (LC 261 - Premium)
// 🎯 Problem

// You are given:

//     n nodes labeled from 0 to n-1

//     edges — a list of undirected edges

// Return true if the edges form a valid tree, otherwise false.

// 🧠 What is a Valid Tree?

// A graph is a valid tree if:

// 1.It has exactly n-1 edges

// 2.It is fully connected — all nodes are reachable from each other

// 3.It contains NO cycles

// So we need to check:





// edges.length === n - 1   ⟵ must be true
// graph is connected      ⟵ must be true
// no cycle exists         ⟵ must be true








// 💡 Intuition
// Approach 1: Union-Find (Disjoint Set)

//     Try to union all edges.

//     If union finds two nodes already connected → cycle exists.

//     After processing all edges, check all nodes belong to one component.





/**
 * @param {number} n
 * @param {number[][]} edges
 * @return {boolean}
 */
var validTree = function(n, edges) {
    // 1️⃣ A tree must have exactly n-1 edges
    if (edges.length !== n - 1) return false;

    const parent = Array(n).fill(0).map((_, i) => i);
    const rank = Array(n).fill(1);

    const find = (node) => {
        if (parent[node] !== node) parent[node] = find(parent[node]);
        return parent[node];
    };

    const union = (a, b) => {
        const rootA = find(a);
        const rootB = find(b);

        if (rootA === rootB) return false; // found cycle

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

    // 2️⃣ Process all edges
    for (let [a, b] of edges) {
        if (!union(a, b)) return false; // cycle detected
    }

    return true; // no cycle + correct number of edges
};

// 🧪 Example Tests
console.log(validTree(5, [[0,1],[0,2],[0,3],[1,4]]));     // true
console.log(validTree(5, [[0,1],[1,2],[2,3],[1,3],[1,4]])); // false (cycle)















// 🧠 Dry Run Example
// Input:



// n = 5
// edges = [[0,1],[0,2],[0,3],[1,4]]





// | Edge | Action | Components Connected? |
// | ---- | ------ | --------------------- |
// | 0-1  | union  | OK                    |
// | 0-2  | union  | OK                    |
// | 0-3  | union  | OK                    |
// | 1-4  | union  | OK                    |













// edges.length = 4 = n-1 → good
// No cycles → good
// Fully connected → good
// 👉 Result: true