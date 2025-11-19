Problem: Maximum Depth of Binary Tree (LC 104)



Question:

Given the root of a binary tree, return its maximum depth.

A binary tree’s maximum depth is the number of nodes along the longest path from the root node down to the farthest leaf node.

✅ Example 1


Input: root = [3,9,20,null,null,15,7]
Output: 3



Explanation:



    3
   / \
  9  20
     / \
    15  7

Depth = 3









✅ Example 2


Input: root = [1,null,2]
Output: 2










💡 Intuition

We can solve this easily using recursion (DFS).

    For each node,
    → the maximum depth = 1 + max(leftDepth, rightDepth)

    The base case:
    → if the node is null, depth = 0.

This works top-down naturally as we return up the recursion stack.










⚙️ Two Approaches
1️⃣ Recursive DFS (Most Common)

Simple, clean, and efficient.

2️⃣ Iterative BFS (Level Order Traversal)

Use a queue to traverse level by level and count the number of levels.

✅ Approach 1: Recursive DFS (Clean & Elegant)











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
 * @return {number}
 */
var maxDepth = function(root) {
    if (root === null) return 0; // Base case

    const leftDepth = maxDepth(root.left);
    const rightDepth = maxDepth(root.right);

    return 1 + Math.max(leftDepth, rightDepth);
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
console.log(maxDepth(root)); // ✅ Output: 3











✅ Approach 2: Iterative BFS (Level Order Traversal)

We can also find the depth using a queue.
Each time we finish one level, we increase the depth count.











var maxDepth = function(root) {
    if (!root) return 0;

    let depth = 0;
    const queue = [root];

    while (queue.length > 0) {
        const size = queue.length;
        for (let i = 0; i < size; i++) {
            const node = queue.shift();
            if (node.left) queue.push(node.left);
            if (node.right) queue.push(node.right);
        }
        depth++; // Finished one level
    }

    return depth;
};





🧠 Dry Run Example

Input:


root = [3,9,20,null,null,15,7]
