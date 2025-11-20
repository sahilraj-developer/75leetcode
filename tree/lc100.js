// // Problem: Same Tree (LC 100)
// // Question:

// // Given the roots of two binary trees p and q,
// // return true if the two trees are structurally identical and the nodes have the same values, otherwise false.

// // ✅ Example 1


// // Input:
// // p = [1,2,3], q = [1,2,3]
// // Output: true


// Explanation:


// Tree p:       Tree q:
//    1              1
//   / \            / \
//  2   3          2   3




//  Both structure and values match → ✅ True

// ✅ Example 2


// Input:
// p = [1,2], q = [1,null,2]
// Output: false



// Explanation:


// Tree p:       Tree q:
//    1              1
//   /                \
//  2                  2




//  Different structure → ❌ False

// ✅ Example 3



// Input:
// p = [1,2,1], q = [1,1,2]
// Output: false







// Explanation:
// Same values but in different positions → ❌ False

// 💡 Intuition

// We’ll use recursion to check:

// 1.If both nodes are null → ✅ same.

// 2.If one is null and the other is not → ❌ different.

// 3.If both are non-null but values differ → ❌ different.

// 4.Otherwise → recursively check left and right subtrees.

// So, two trees are the same if:









/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */

/**
 * @param {TreeNode} p
 * @param {TreeNode} q
 * @return {boolean}
 */
var isSameTree = function(p, q) {
    // Base Case 1: both null → same
    if (!p && !q) return true;

    // Base Case 2: one null → different
    if (!p || !q) return false;

    // Base Case 3: values differ → different
    if (p.val !== q.val) return false;

    // Recursive Step: check both subtrees
    return isSameTree(p.left, q.left) && isSameTree(p.right, q.right);
};

// 🧪 Example Test
function TreeNode(val, left, right) {
    this.val = val;
    this.left = left || null;
    this.right = right || null;
}

const p = new TreeNode(1, new TreeNode(2), new TreeNode(3));
const q = new TreeNode(1, new TreeNode(2), new TreeNode(3));
console.log(isSameTree(p, q)); // ✅ true

const p2 = new TreeNode(1, new TreeNode(2));
const q2 = new TreeNode(1, null, new TreeNode(2));
console.log(isSameTree(p2, q2)); // ❌ false









// 🧠 Dry Run Example
// Input:


// p = [1,2,3]
// q = [1,2,3]








// | Node        | p.val | q.val | Action          |
// | ----------- | ----- | ----- | --------------- |
// | Root        | 1     | 1     | Equal → recurse |
// | Left        | 2     | 2     | Equal → recurse |
// | Left.left   | null  | null  | ✅ return true   |
// | Left.right  | null  | null  | ✅ return true   |
// | Right       | 3     | 3     | Equal → recurse |
// | Right.left  | null  | null  | ✅ return true   |
// | Right.right | null  | null  | ✅ return true   |



// All matched → ✅ true