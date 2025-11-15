// Problem: Rotate Image (LC 48)
// Question:

// You are given an n × n 2D matrix representing an image.
// Rotate the image by 90 degrees clockwise, in-place (i.e., without using extra space for another matrix).

// ✅ Example 1


// Input:
// matrix = [
//   [1,2,3],
//   [4,5,6],
//   [7,8,9]
// ]

// Output:
// [
//   [7,4,1],
//   [8,5,2],
//   [9,6,3]
// ]





// ✅ Example 2


// Input:
// matrix = [
//   [5,1,9,11],
//   [2,4,8,10],
//   [13,3,6,7],
//   [15,14,12,16]
// ]

// Output:
// [
//   [15,13,2,5],
//   [14,3,4,1],
//   [12,6,8,9],
//   [16,7,10,11]
// ]









// 💡 Intuition

// To rotate a matrix by 90° clockwise, we can achieve it in two main steps:

// Step 1️⃣ — Transpose the matrix

// Swap rows and columns:


// matrix[i][j] → matrix[j][i]









// After transpose, the matrix flips along its main diagonal.

// Step 2️⃣ — Reverse each row

// To complete the clockwise rotation, reverse the elements of each row.

// 🔁 Visual Example

// Input:


// 1 2 3
// 4 5 6
// 7 8 9




// After Transpose:



// 1 4 7
// 2 5 8
// 3 6 9




// After Reversing Rows:




// 7 4 1
// 8 5 2
// 9 6 3













/**
 * @param {number[][]} matrix
 * @return {void} Do not return anything, modify matrix in-place instead.
 */
var rotate = function(matrix) {
    const n = matrix.length;

    // 1️⃣ Transpose the matrix (swap across diagonal)
    for (let i = 0; i < n; i++) {
        for (let j = i + 1; j < n; j++) {
            [matrix[i][j], matrix[j][i]] = [matrix[j][i], matrix[i][j]];
        }
    }

    // 2️⃣ Reverse each row
    for (let i = 0; i < n; i++) {
        matrix[i].reverse();
    }
};

// 🧪 Example Test
let matrix1 = [
  [1,2,3],
  [4,5,6],
  [7,8,9]
];
rotate(matrix1);
console.log(matrix1); // ✅ [[7,4,1],[8,5,2],[9,6,3]]

let matrix2 = [
  [5,1,9,11],
  [2,4,8,10],
  [13,3,6,7],
  [15,14,12,16]
];
rotate(matrix2);
console.log(matrix2); 
// ✅ [[15,13,2,5],[14,3,4,1],[12,6,8,9],[16,7,10,11]]












// 🧠 Dry Run Example
// Input:


// [
//  [1,2,3],
//  [4,5,6],
//  [7,8,9]
// ]




// Step 1: Transpose


// [
//  [1,4,7],
//  [2,5,8],
//  [3,6,9]
// ]



// Step 2: Reverse Each Row



// [
//  [7,4,1],
//  [8,5,2],
//  [9,6,3]
// ]





// ✅ Output: [ [7,4,1], [8,5,2], [9,6,3] ]