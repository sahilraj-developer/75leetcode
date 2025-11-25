// Problem: Subtree of Another Tree (LC 572)
// Question:

// Given the roots of two binary trees root and subRoot,
// return true if there is a subtree of root that is identical to subRoot,
// and false otherwise.

// ✅ Example 1


// Input:
// root = [3,4,5,1,2]
// subRoot = [4,1,2]

// Output: true





// Explanation:


// Main Tree (root):       Subtree (subRoot):

//       3                     4
//      / \                   / \
//     4   5                 1   2
//    / \
//   1   2

//   → The subtree [4,1,2] exists inside the main tree ✅




// ✅ Example 2


// Input:
// root = [3,4,5,1,2,null,null,null,null,0]
// subRoot = [4,1,2]

// Output: false








// Explanation:
// The structure is similar, but the node 2 in subRoot does not match
// because there’s an extra node 0 in the main tree under 2.

// 💡 Intuition

// We can break this into two problems:

// 1.At each node of the main tree, check if the subtree starting there matches subRoot.

// 2.Use the Same Tree check (from LC 100) to compare if two trees are identical.

// So:



//     Traverse root.

//     Whenever root.val === subRoot.val, run the isSameTree comparison.

//     If any comparison returns true, we’re done.






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
 * @param {TreeNode} subRoot
 * @return {boolean}
 */
var isSubtree = function(root, subRoot) {
    if (!root) return false; // base case

    // If trees match at this node → return true
    if (isSameTree(root, subRoot)) return true;

    // Otherwise, check left and right subtrees
    return isSubtree(root.left, subRoot) || isSubtree(root.right, subRoot);
};

// Helper: Check if two trees are identical
var isSameTree = function(p, q) {
    if (!p && !q) return true;      // both null → same
    if (!p || !q) return false;     // one null → not same
    if (p.val !== q.val) return false; // different values

    // Recurse on left & right
    return isSameTree(p.left, q.left) && isSameTree(p.right, q.right);
};

// 🧪 Example Test
function TreeNode(val, left, right) {
  this.val = val;
  this.left = left || null;
  this.right = right || null;
}

const root = new TreeNode(3,
  new TreeNode(4, new TreeNode(1), new TreeNode(2)),
  new TreeNode(5)
);
const subRoot = new TreeNode(4, new TreeNode(1), new TreeNode(2));

console.log(isSubtree(root, subRoot)); // ✅ true










// 🧠 Dry Run Example
// Input:



// root:
//       3
//      / \
//     4   5
//    / \
//   1   2

// subRoot:
//     4
//    / \
//   1   2








// Step-by-Step:


// | Step | Current Node                          | Match Check               | Result     |
// | ---- | ------------------------------------- | ------------------------- | ---------- |
// | 1    | 3                                     | 3 != 4                    | ❌ Continue |
// | 2    | 4                                     | 4 == 4 → check isSameTree | ✅ true     |
// | →    | Check left: (1 vs 1), right: (2 vs 2) | ✅                         |            |
// | ✅    | Subtree found → Return true           |                           |            |
