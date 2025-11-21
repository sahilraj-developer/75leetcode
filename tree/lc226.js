// Problem: Invert / Flip Binary Tree (LC 226)
// Question:

// Given the root of a binary tree, invert the tree, and return its root.

// Inverting means:

// Swap every node’s left and right children.

// ✅ Example 1



// Input:
//     4
//    / \
//   2   7
//  / \ / \
// 1  3 6  9



// Output:


//     4
//    / \
//   7   2
//  / \ / \
// 9  6 3  1





// ✅ Example 2


// Input: root = [2,1,3]
// Output: [2,3,1]



// ✅ Example 3


// Input: root = []
// Output: []





// 💡 Intuition

// At each node:

//     Swap the left and right child.

//     Then recursively repeat the same process for both subtrees.

// So the operation follows a postorder traversal pattern:

//     Invert left subtree

//     Invert right subtree

//     Swap them










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
 * @return {TreeNode}
 */
var invertTree = function(root) {
    if (root === null) return null; // Base case

    // Recursively invert both subtrees
    const left = invertTree(root.left);
    const right = invertTree(root.right);

    // Swap left and right children
    root.left = right;
    root.right = left;

    return root;
};

// 🧪 Example Test
function TreeNode(val, left, right) {
    this.val = val;
    this.left = left || null;
    this.right = right || null;
}

const root = new TreeNode(4,
  new TreeNode(2, new TreeNode(1), new TreeNode(3)),
  new TreeNode(7, new TreeNode(6), new TreeNode(9))
);

console.log(JSON.stringify(invertTree(root), null, 2));









// ✅ Output:


// {
//   "val": 4,
//   "left": {
//     "val": 7,
//     "left": {"val": 9},
//     "right": {"val": 6}
//   },
//   "right": {
//     "val": 2,
//     "left": {"val": 3},
//     "right": {"val": 1}
//   }
// }








// 🧠 Dry Run Example
// Input:



//     2
//    / \
//   1   3






//   Process:

//     At root (2):

//     invert left (1) → no children

//     invert right (3) → no children

//     swap → left = 3, right = 1

// ✅ Output:


//     2
//    / \
//   3   1














//   ⚙️ Alternative: Iterative BFS (Using Queue)

// You can also invert iteratively by swapping children at each level.




var invertTree = function(root) {
    if (!root) return null;

    const queue = [root];

    while (queue.length > 0) {
        const node = queue.shift();

        // Swap children
        [node.left, node.right] = [node.right, node.left];

        if (node.left) queue.push(node.left);
        if (node.right) queue.push(node.right);
    }

    return root;
};
