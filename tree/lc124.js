// Problem: Binary Tree Maximum Path Sum (LC 124)
// Question:

// A path in a binary tree is a sequence of nodes connected by edges.
// The path may start and end at any node in the tree, and it must contain at least one node.

// Return the maximum path sum of any path in the tree.

// ✅ Example 1



// Input: root = [1,2,3]
// Output: 6




// Explanation:


//    1
//   / \
//  2   3





//  → Path = 2 → 1 → 3
// → Sum = 6 ✅





// ✅ Example 2


// Input: root = [-10,9,20,null,null,15,7]
// Output: 42



// Explanation:


//     -10
//     /  \
//    9   20
//       /  \
//      15   7




//      → Path = 15 → 20 → 7
// → Sum = 42 ✅






// 💡 Intuition

// At each node, there are two main cases:

// 1.The best path through that node (possibly including both left and right children)

// 2.The best path going down from that node (to return upward in recursion)

// To compute this:

//     At every node:

//         Calculate the maximum gain from the left subtree.

//         Calculate the maximum gain from the right subtree.

//         The maximum path sum through that node =
//         node.val + leftGain + rightGain

//         Update a global maximum if this path is the best so far.

//     Return the max gain (one side only) =
//         node.val + max(leftGain, rightGain)
//         because a path can’t branch upward.





// 🧮 Step-by-Step Logic

// For each node:


// maxGain(node) = node.val + max(0, maxGain(node.left), maxGain(node.right))




// And while computing this,
// update:


// maxSum = max(maxSum, node.val + max(0, leftGain) + max(0, rightGain))










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
var maxPathSum = function(root) {
    let maxSum = -Infinity; // global maximum

    const dfs = (node) => {
        if (node === null) return 0;

        // Get max gain from left and right subtrees
        const leftGain = Math.max(dfs(node.left), 0);
        const rightGain = Math.max(dfs(node.right), 0);

        // Max path *through* the current node
        const currentPath = node.val + leftGain + rightGain;

        // Update global max
        maxSum = Math.max(maxSum, currentPath);

        // Return max gain to parent (one side only)
        return node.val + Math.max(leftGain, rightGain);
    };

    dfs(root);
    return maxSum;
};

// 🧪 Example Test
function TreeNode(val, left, right) {
    this.val = val;
    this.left = left || null;
    this.right = right || null;
}

const root = new TreeNode(-10,
  new TreeNode(9),
  new TreeNode(20, new TreeNode(15), new TreeNode(7))
);

console.log(maxPathSum(root)); // ✅ 42








// 🧠 Dry Run Example
// Input:



//        -10
//       /   \
//      9    20
//          /  \
//         15   7












// | Node | Left Gain | Right Gain | Path Through | Global Max | Return Up |
// | ---- | --------- | ---------- | ------------ | ---------- | --------- |
// | 15   | 0         | 0          | 15           | 15         | 15        |
// | 7    | 0         | 0          | 7            | 15         | 7         |
// | 20   | 15        | 7          | 42           | 42         | 35        |
// | 9    | 0         | 0          | 9            | 42         | 9         |
// | -10  | 9         | 35         | 34           | **42**     | 25        |





// ✅ Final Answer = 42