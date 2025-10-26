// Problem: Clone Graph (LC 133)


// Question:

// Given a reference to a node in a connected undirected graph, return a deep copy (clone) of the graph.

// Each node contains:



// val  // the node's value
// neighbors[]  // list of neighbor nodes


// input

// 1 -- 2
// |    |
// 4 -- 3


// output


// 1' -- 2'
// |     |
// 4' -- 3'



// Graph Node Definition (Given by LeetCode):


class Node {
    constructor(val, neighbors) {
        this.val = val === undefined ? 0 : val;
        this.neighbors = neighbors === undefined ? [] : neighbors;
    }
}





// 💡 Intuition & Approach

// We need to create a deep copy of the entire graph, meaning:

// Each node in the original graph gets a new node in the cloned graph.

// The structure (connections between neighbors) must be preserved.

// Since graphs can contain cycles, we must avoid cloning the same node multiple times.






// 🔹 Approach 1: DFS (Depth-First Search)
// Steps:

// Use a map (visited) to track already-cloned nodes.
// 👉 key: original node, value: cloned node.

//     Start DFS from the given node:

//         If the node is already cloned, return it.

//         Otherwise, clone it and recursively clone all neighbors.

//     Return the cloned version of the start node.










    // Definition for a Node is already provided in the problem.

var cloneGraph = function(node) {
    if (!node) return null;  // Edge case: empty graph

    const visited = new Map();  // Stores mapping of original -> cloned node

    function dfs(currNode) {
        // If node already cloned, return it
        if (visited.has(currNode)) return visited.get(currNode);

        // Create a new clone node
        const clone = new Node(currNode.val);
        visited.set(currNode, clone);  // Mark as cloned

        // Clone all its neighbors recursively
        for (const neighbor of currNode.neighbors) {
            clone.neighbors.push(dfs(neighbor));
        }

        return clone;
    }

    return dfs(node);  // Start DFS from given node
};














// 🔹 Approach 2: BFS (Breadth-First Search)

// (Alternative approach — useful for large graphs)












var cloneGraph = function(node) {
    if (!node) return null;

    const visited = new Map();
    const cloneStart = new Node(node.val);
    visited.set(node, cloneStart);

    const queue = [node];

    while (queue.length > 0) {
        const curr = queue.shift();

        for (const neighbor of curr.neighbors) {
            if (!visited.has(neighbor)) {
                // Clone neighbor
                visited.set(neighbor, new Node(neighbor.val));
                queue.push(neighbor);
            }
            // Connect cloned nodes
            visited.get(curr).neighbors.push(visited.get(neighbor));
        }
    }

    return cloneStart;
};
