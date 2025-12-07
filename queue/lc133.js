// Clone Graph (LC 133)
// Problem Statement

// Given a reference to a node in a connected undirected graph, return a deep copy (clone) of the graph.

// Each node contains:


// val: number
// neighbors: Node[]






// 🌟 Example
// Input graph:



// 1 -- 2
// |    |
// 4 -- 3





// Output graph:


// 1 -- 2
// |    |
// 4 -- 3





// 💡 Intuition

// We need to clone every node and clone the edges (neighbors list).
// To avoid infinite loops (graph may contain cycles), we maintain a hash map that maps:



// original node → cloned node






// We perform either:

//     DFS (recursive) or

//     BFS (queue-based level traversal)

// Both approaches use the same idea:

// 1.Clone a node when you first see it.

// 2.Recursively/BFS clone its neighbors.

// 3.Use the map to avoid re-cloning already visited nodes.







// ✅ DFS Solution (Recursion)
// Time: O(V + E)
// Space: O(V) for map + recursion stack









/**
 * // Definition for a Node.
 * function Node(val, neighbors) {
 *    this.val = val === undefined ? 0 : val;
 *    this.neighbors = neighbors === undefined ? [] : neighbors;
 * };
 */

/**
 * @param {Node} node
 * @return {Node}
 */
   var cloneGraph = function(node) {
    if (!node) return null;

    const map = new Map(); // original -> cloned

    const dfs = (curr) => {
        if (map.has(curr)) return map.get(curr);

        // Create clone
        const clone = new Node(curr.val);
        map.set(curr, clone);

        // Clone neighbors
        for (let neighbor of curr.neighbors) {
            clone.neighbors.push(dfs(neighbor));
        }

        return clone;
    };

    return dfs(node);
};







// 🚀 BFS Solution (Iterative)





var cloneGraph = function(node) {
    if (!node) return null;

    const map = new Map();
    const queue = [node];

    // Create first cloned node
    map.set(node, new Node(node.val));

    while (queue.length > 0) {
        const curr = queue.shift();

        for (const neighbor of curr.neighbors) {
            if (!map.has(neighbor)) {
                map.set(neighbor, new Node(neighbor.val));
                queue.push(neighbor);
            }

            // Add cloned neighbor to cloned node's list
            map.get(curr).neighbors.push(map.get(neighbor));
        }
    }

    return map.get(node);
};



















// 🧪 Testing Code




// Build Example Graph
const n1 = new Node(1);
const n2 = new Node(2);
const n3 = new Node(3);
const n4 = new Node(4);

n1.neighbors = [n2, n4];
n2.neighbors = [n1, n3];
n3.neighbors = [n2, n4];
n4.neighbors = [n1, n3];

const cloned = cloneGraph(n1);
console.log(cloned);









// 🧠 Dry Run Example

// Graph:




// 1 → [2,4]
// 2 → [1,3]
// 3 → [2,4]
// 4 → [1,3]






// | Step              | Action                | Map Contents     |
// | ----------------- | --------------------- | ---------------- |
// | Visit 1           | Clone 1               | {1→1’}           |
// | Process neighbors | Clone 2 and 4         | {1→1’,2→2’,4→4’} |
// | Visit 2           | Clone 3               | {3→3’}           |
// | Finish links      | Create full adjacency | Completed        |






// Result:





// 1’ → [2’,4’]
// 2’ → [1’,3’]
// 3’ → [2’,4’]
// 4’ → [1’,3’]
