// Problem: Binary Tree Level Order Traversal (LC 102)



// Question:

// Given the root of a binary tree, return the level order traversal of its nodes' values
// → i.e., from left to right, level by level.

// ✅ Example 1


// Input:
//     3
//    / \
//   9  20
//      / \
//     15  7

// Output:
// [[3],[9,20],[15,7]]






// ✅ Example 2


// Input: root = [1]
// Output: [[1]]




// ✅ Example 3


// Input: root = []
// Output: []











// 💡 Intuition

// We use a queue (FIFO) structure for level order traversal — this is a classic BFS (Breadth-First Search) approach.

// Steps:

// 1.Start with the root node in the queue.

// 2.While the queue isn’t empty:

//     Determine the number of nodes at this level (size of the queue).

//     Process all nodes in the current level:

//         Pop them from the queue.

//         Add their values to a currentLevel array.

//         Push their left and right children (if they exist).

//     Push the completed currentLevel array into the result.

// 3.Return the result array.










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
    if (!root) return [];

    const result = [];
    const queue = [root];

    while (queue.length > 0) {
        const levelSize = queue.length;
        const currentLevel = [];

        for (let i = 0; i < levelSize; i++) {
            const node = queue.shift();
            currentLevel.push(node.val);

            if (node.left) queue.push(node.left);
            if (node.right) queue.push(node.right);
        }

        result.push(currentLevel);
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
// ✅ Output: [[3],[9,20],[15,7]]






// 🧠 Dry Run Example
// Input:



//     3
//    / \
//   9  20
//      / \
//     15  7







// | Level | Queue Before | Nodes Processed | Queue After | Result              |
// | ----- | ------------ | --------------- | ----------- | ------------------- |
// | 1     | [3]          | 3               | [9,20]      | [[3]]               |
// | 2     | [9,20]       | 9,20            | [15,7]      | [[3],[9,20]]        |
// | 3     | [15,7]       | 15,7            | []          | [[3],[9,20],[15,7]] |






// ✅ Final Output: [[3],[9,20],[15,7]]






// ⚙️ Alternative Solution — Recursive DFS

// Although BFS is standard, you can also do level-order using recursion with depth tracking.






var levelOrder = function(root) {
    const result = [];

    const dfs = (node, level) => {
        if (!node) return;
        if (!result[level]) result[level] = [];
        result[level].push(node.val);

        dfs(node.left, level + 1);
        dfs(node.right, level + 1);
    };

    dfs(root, 0);
    return result;
};
