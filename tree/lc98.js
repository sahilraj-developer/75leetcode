// Problem: Validate Binary Search Tree (LC 98)


Question:

Given the root of a binary tree, determine if it is a valid binary search tree (BST).

A valid BST must satisfy:

1.Left subtree values < node value

2.Right subtree values > node value

3.Both left and right must also be valid BSTs recursively.











💡 Intuition

Use DFS while carrying min and max allowable value range for each node.

For each node:


min < node.val < max



When going left:


newMax = node.val






When going right:


newMin = node.val












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
 * @return {boolean}
 */
var isValidBST = function(root) {
    const validate = (node, min, max) => {
        if (!node) return true;

        // Check if current value respects min/max bounds
        if ((min !== null && node.val <= min) || 
            (max !== null && node.val >= max)) {
            return false;
        }

        // Recurse left (max allowed becomes current node value)
        // Recurse right (min allowed becomes current node value)
        return validate(node.left, min, node.val) &&
               validate(node.right, node.val, max);
    };

    return validate(root, null, null);
};

// 🧪 Example Test
function TreeNode(val, left, right) {
  this.val = val;
  this.left = left || null;
  this.right = right || null;
}

const root1 = new TreeNode(2, new TreeNode(1), new TreeNode(3));
console.log(isValidBST(root1)); // true

const root2 = new TreeNode(5,
  new TreeNode(1),
  new TreeNode(4, new TreeNode(3), new TreeNode(6))
);
console.log(isValidBST(root2)); // false












🧠 Dry Run Example
Input:


    5
   / \
  1   4
     / \
    3   6





| Node | Allowed Range | Valid?   | Result       |
| ---- | ------------- | -------- | ------------ |
| 5    | (-∞, ∞)       | yes      | continue     |
| 1    | (-∞, 5)       | yes      | continue     |
| 4    | (5, ∞)        | 4 <= 5 ❌ | return false |




❌ Not a valid BST.







⏱️ Complexity



| Type      | Complexity                                  |
| --------- | ------------------------------------------- |
| **Time**  | O(N) — visit each node once                 |
| **Space** | O(H) — recursion depth (H = height of tree) |
