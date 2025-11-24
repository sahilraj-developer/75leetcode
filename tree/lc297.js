// Problem: Serialize and Deserialize Binary Tree (LC 297)
// Question:

// Design an algorithm to serialize and deserialize a binary tree.

// Serialize: Convert the tree into a string.

// Deserialize: Convert the string back into the original tree.

// Your serialized format should allow reconstructing the exact same tree structure.

// ✅ Example

// Input:
//     1
//    / \
//   2   3
//      / \
//     4   5

// Serialize → "1,2,null,null,3,4,null,null,5,null,null"

// Deserialize → reconstructs the same tree








// 💡 Intuition

// You can serialize a binary tree using preorder traversal (root → left → right)
// and record "null" for missing children.

// Then, during deserialization, you rebuild the tree by reading tokens sequentially.

// Key Idea

//     null means no node → backtrack up.

//     Node values appear in the order of traversal → rebuild recursively.




// ⚙️ Step-by-Step Approach
// 🔸 Serialize (DFS Preorder)

// 1.Start from root.

// 2.Add node.val to the result.

// 3.If node is null → add "null".

// 4.Recursively process left and right children.

// 5.Join values with commas.

// Example preorder traversal for:


//    1
//   / \
//  2   3
//     / \
//    4   5



//    → 1,2,null,null,3,4,null,null,5,null,null




// 🔸 Deserialize

// 1.Split the serialized string by commas into a list.

// 2.Process sequentially:

//     Read a value.

//     If "null" → return null.

//     Else, create node with the value.

//     Recursively build left and right children.






/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */

var serialize = function(root) {
    const res = [];

    const dfs = (node) => {
        if (!node) {
            res.push("null");
            return;
        }

        res.push(String(node.val));
        dfs(node.left);
        dfs(node.right);
    };

    dfs(root);
    return res.join(",");
};

var deserialize = function(data) {
    const values = data.split(",");
    let index = 0;

    const buildTree = () => {
        if (values[index] === "null") {
            index++;
            return null;
        }

        const node = new TreeNode(Number(values[index]));
        index++;
        node.left = buildTree();
        node.right = buildTree();
        return node;
    };

    return buildTree();
};

// 🧪 Example Test
function TreeNode(val, left, right) {
  this.val = val;
  this.left = left || null;
  this.right = right || null;
}

const root = new TreeNode(1,
  new TreeNode(2),
  new TreeNode(3, new TreeNode(4), new TreeNode(5))
);

const data = serialize(root);
console.log("Serialized:", data);
// ✅ "1,2,null,null,3,4,null,null,5,null,null"

const restored = deserialize(data);
console.log("Deserialized:", JSON.stringify(restored, null, 2));






// 🧠 Dry Run Example
// Input Tree:


//      1
//     / \
//    2   3
//       / \
//      4   5




// Serialize Steps:

//     Visit 1 → "1"

//     Visit 2 → "2"

//     Left of 2 → null → "null"

//     Right of 2 → null → "null"

//     Visit 3 → "3"

//     Visit 4 → "4"

//     Left/Right of 4 → nulls

//     Visit 5 → "5"

//     Left/Right of 5 → nulls




// ✅ Serialized Output:
// "1,2,null,null,3,4,null,null,5,null,null"