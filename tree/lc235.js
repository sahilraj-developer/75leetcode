// Lowest Common Ancestor of a BST (LC 235)



// Question

// Given the root of a Binary Search Tree, and two nodes p and q,
// return their Lowest Common Ancestor (LCA).

// The LCA is defined as the lowest (deepest) node that has both p and q in its subtree (including itself).

// 🌟 Key Insight (because it’s a BST)

// A BST (Binary Search Tree) has this property:


// Left subtree nodes < root < right subtree nodes









// So:

//     If both p and q are smaller than root → LCA is in the left subtree

//     If both are greater than root → LCA is in the right subtree

//     Otherwise → current node is the LCA

// 🎯 Example
// Input:


//         6
//        / \
//       2   8
//      / \ / \
//     0  4 7  9
//       / \
//      3   5

// p = 2, q = 8





// Output:

// LCA = 6












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
 * @param {TreeNode} p
 * @param {TreeNode} q
 * @return {TreeNode}
 */
var lowestCommonAncestor = function(root, p, q) {
    let current = root;

    while (current) {
        if (p.val < current.val && q.val < current.val) {
            current = current.left;   // go left
        } else if (p.val > current.val && q.val > current.val) {
            current = current.right;  // go right
        } else {
            return current;           // split point = LCA
        }
    }
};













// 🤯 Dry Run Example
// Input:

// root = 6, p = 2, q = 8




// | Step | current node | Check           | Action            |
// | ---- | ------------ | --------------- | ----------------- |
// | 1    | 6            | 2 < 6 and 8 > 6 | split point found |
// | →    | return 6     | —               | LCA = 6           |
