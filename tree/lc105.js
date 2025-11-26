// Construct Binary Tree from Preorder and Inorder Traversal (LC 105)



// Question

// Given two integer arrays preorder and inorder where:

// preorder is the preorder traversal of a binary tree (Root → Left → Right)

// inorder is the inorder traversal of the same tree (Left → Root → Right)

// Construct the binary tree and return its root.





// 📌 Example 1


// Input:
// preorder = [3,9,20,15,7]
// inorder = [9,3,15,20,7]

// Output: [3,9,20,null,null,15,7]



// Visually:


//       3
//      / \
//     9  20
//       /  \
//      15   7



// 💡 Intuition / Key Observations
// 🔹 Preorder traversal:


// [ Root | Left Subtree | Right Subtree ]



// 🔹 Inorder traversal:


// [ Left Subtree | Root | Right Subtree ]




// Plan:

// 1.The first element of preorder is always the root.

// 2.Find the root’s index in inorder:

//     Left subtree is everything left of root in inorder

//     Right subtree is everything right of root in inorder

// 3.Recursively build left and right subtrees using array segments.



// 🧠 Approach + Steps

// 1.Use preorder index pointer to track current root.

// 2.Use a hashmap to quickly find values in inorder.

// 3.Recursively build tree sections based on inorder boundaries.












/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */

/**
 * @param {number[]} preorder
 * @param {number[]} inorder
 * @return {TreeNode}
 */
var buildTree = function(preorder, inorder) {
    const map = new Map(); // store index of each inorder value
    for (let i = 0; i < inorder.length; i++) {
        map.set(inorder[i], i);
    }

    let preIndex = 0;

    const arrayToTree = (left, right) => {
        if (left > right) return null; // no subtree

        const rootVal = preorder[preIndex++];
        const root = new TreeNode(rootVal);

        // find inorder index
        const mid = map.get(rootVal);

        // recursively build left and right subtrees
        root.left = arrayToTree(left, mid - 1);
        root.right = arrayToTree(mid + 1, right);

        return root;
    };

    return arrayToTree(0, inorder.length - 1);
};

// 🧪 Example usage
function TreeNode(val, left, right) {
  this.val = val;
  this.left = left || null;
  this.right = right || null;
}

console.log(buildTree([3,9,20,15,7], [9,3,15,20,7]));









// 🧠 Dry Run
// Input:


// preorder = [3,9,20,15,7]
// inorder  = [9,3,15,20,7]





// Step-by-step:


// | Preorder | Inorder                                         | Action                  |
// | -------- | ----------------------------------------------- | ----------------------- |
// | **3**    | [9,3,15,20,7]                                   | root = 3                |
// |          | split inorder → left: `[9]`, right: `[15,20,7]` |                         |
// | **9**    | [9]                                             | left child; no subtrees |
// | **20**   | [15,20,7]                                       | root of right subtree   |
// | **15**   | [15]                                            | left child              |
// | **7**    | [7]                                             | right child             |










// Final Tree:


//       3
//      / \
//     9  20
//       /  \
//      15   7
