// Kth Smallest Element in a BST (LC 230)
// Question

// Given the root of a Binary Search Tree (BST) and an integer k, return the k-th smallest value among all values of nodes in the tree.

// 🧠 Key Insight

// In a BST:


// Left subtree < Node < Right subtree



// So, performing an Inorder Traversal (Left → Node → Right) gives values in sorted order.

// Therefore:

//     Traverse in-order.

//     Collect/Count elements.

//     When count == k → return that value.

// 🌟 Example 1

// Input:
// root = [3,1,4,null,2], k = 1
// Output: 1




//     3
//    / \
//   1   4
//    \
//     2
// Sorted = [1,2,3,4] → 1st smallest = 1





// 🌟 Example 2


// Input:
// root = [5,3,6,2,4,null,null,1], k = 3
// Output: 3



//          5
//        /   \
//       3     6
//      / \
//     2   4
//    /
//   1
// Sorted = [1,2,3,4,5,6] → 3rd smallest = 3










// 💡 Approach 1: Inorder DFS + Counter (O(N) Time, O(H) Space)
// ✔ Best and most common solution





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
 * @param {number} k
 * @return {number}
 */
var kthSmallest = function(root, k) {
    let count = 0;
    let result = null;

    const inorder = (node) => {
        if (!node || result !== null) return;

        inorder(node.left);

        count++;
        if (count === k) {
            result = node.val;
            return;
        }

        inorder(node.right);
    }

    inorder(root);
    return result;
};

// Example Test
function TreeNode(val, left, right) {
  this.val = val;
  this.left = left || null;
  this.right = right || null;
}

const root = new TreeNode(3,
  new TreeNode(1, null, new TreeNode(2)),
  new TreeNode(4)
);

console.log(kthSmallest(root, 1)); // 1













// 🔍 Dry Run

// Tree:



//     3
//    / \
//   1   4
//    \
//     2




// Inorder traversal:


// Visit 1 → count = 1 (k = 1, match!) → result = 1












// 🚀 Approach 2: Iterative Inorder Using Stack

// When recursion depth might be large (optimization option)






var kthSmallest = function(root, k) {
    const stack = [];
    let curr = root;

    while (true) {
        while (curr) {
            stack.push(curr);
            curr = curr.left;
        }
        curr = stack.pop();
        k--;
        if (k === 0) return curr.val;
        curr = curr.right;
    }
};
