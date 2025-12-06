// Binary Tree Level Order Traversal (LC 102)
// Problem

// Given the root of a binary tree, return the level order traversal of its nodes' values
// (level by level, left to right).

// ✅ Example
// Input:


//     3
//    / \
//   9  20
//      / \
//     15  7




// Output:


// [[3], [9, 20], [15, 7]]






// 💡 Intuition

// We perform Breadth-First Search (BFS) using a queue:

// 1.Push root into queue.

// 2.Process nodes level by level:

//     Track how many nodes are in the current level (size = queue.length)

//     Remove those nodes from queue, add their children

//     Store values for this entire level into result.





// 🧠 Approach
// BFS (Queue) Algorithm:



// Queue = [root]

// While queue not empty:
//     levelSize = queue.length
//     levelArray = []

//     Loop levelSize times:
//         node = queue.shift()
//         levelArray.push(node.val)
//         push children into queue

//     Push levelArray to result













/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */

/**
 * @param {TreeNode} root
 * @return {number[][]}
 */
var levelOrder = function(root) {
    if (!root) return [];  // if empty tree

    const result = [];
    const queue = [root];  // BFS queue

    while (queue.length > 0) {
        const levelSize = queue.length;  // nodes in current level
        const level = [];

        for (let i = 0; i < levelSize; i++) {
            const node = queue.shift();
            level.push(node.val);

            if (node.left) queue.push(node.left);
            if (node.right) queue.push(node.right);
        }

        result.push(level);   // store current level results
    }

    return result;
};

// 🧪 Example Test
function TreeNode(val, left, right) {
  this.val = val;
  this.left = left || null;
  this.right = right || null;
}

const root = new TreeNode(3,
  new TreeNode(9),
  new TreeNode(20, new TreeNode(15), new TreeNode(7))
);

console.log(levelOrder(root)); 
// Output: [[3], [9, 20], [15, 7]]













// 🧮 Dry Run Explanation

// Queue flow:



// Start: [3]
// Level 1 → [3]                        → push children → [9, 20]

// Next: [9, 20]
// Level 2 → [9, 20]                    → push children → [15, 7]

// Next: [15, 7]
// Level 3 → [15, 7]                    → children none → []






// Final result:



// [[3], [9, 20], [15, 7]]
