// Problem: Set Matrix Zeroes (LC 73)



// Question:

// Given an m x n integer matrix, if an element is 0,
// set its entire row and column to 0.

// You must do it in place — modify the matrix directly.

// ✅ Example 1



// Input: 
// matrix = [
//   [1,1,1],
//   [1,0,1],
//   [1,1,1]
// ]

// Output: 
// [
//   [1,0,1],
//   [0,0,0],
//   [1,0,1]
// ]






// ✅ Example 2


// Input:
// matrix = [
//   [0,1,2,0],
//   [3,4,5,2],
//   [1,3,1,5]
// ]

// Output:
// [
//   [0,0,0,0],
//   [0,4,5,0],
//   [0,3,1,0]
// ]





// 💡 Intuition

// If we set zeroes as we go, we’ll affect other rows/columns too early.
// We need to mark which rows and columns should be zeroed first.

// Three Possible Approaches:

// 1.Brute Force (Extra Matrix) – Mark in a copy → O(m×n) space ❌

// 2.Hash Sets – Use two sets for rows & cols → O(m + n) space ⚙️

// 3.Optimized In-place (Constant Space) – Use first row and first column as markers ✅




// ⚙️ Optimized Approach (O(1) Extra Space)
// Idea:

//     Use the first row and first column to store markers:

//         If matrix[i][j] == 0, mark:

//         matrix[i][0] = 0 (for row)

//         matrix[0][j] = 0 (for column)

//     Then zero out cells based on those markers.

//     Use two boolean flags to track:

//         Whether first row has zero

//         Whether first column has zero











/**
 * @param {number[][]} matrix
 * @return {void} Do not return anything, modify matrix in-place instead.
 */
var setZeroes = function(matrix) {
    const rows = matrix.length;
    const cols = matrix[0].length;

    let firstRowZero = false;
    let firstColZero = false;

    // 1️⃣ Check if first row has any zero
    for (let j = 0; j < cols; j++) {
        if (matrix[0][j] === 0) firstRowZero = true;
    }

    // 2️⃣ Check if first column has any zero
    for (let i = 0; i < rows; i++) {
        if (matrix[i][0] === 0) firstColZero = true;
    }

    // 3️⃣ Use first row and column as markers
    for (let i = 1; i < rows; i++) {
        for (let j = 1; j < cols; j++) {
            if (matrix[i][j] === 0) {
                matrix[i][0] = 0;
                matrix[0][j] = 0;
            }
        }
    }

    // 4️⃣ Zero out cells based on markers
    for (let i = 1; i < rows; i++) {
        for (let j = 1; j < cols; j++) {
            if (matrix[i][0] === 0 || matrix[0][j] === 0) {
                matrix[i][j] = 0;
            }
        }
    }

    // 5️⃣ Zero first row if needed
    if (firstRowZero) {
        for (let j = 0; j < cols; j++) {
            matrix[0][j] = 0;
        }
    }

    // 6️⃣ Zero first column if needed
    if (firstColZero) {
        for (let i = 0; i < rows; i++) {
            matrix[i][0] = 0;
        }
    }
};








// 🧠 Dry Run Example
// Input:


// [
//   [1,1,1],
//   [1,0,1],
//   [1,1,1]
// ]




// Step 1: Markers

//    Zero at (1,1)

//    Mark → matrix[1][0] = 0 and matrix[0][1] = 0

// Now matrix:


// [
//   [1,0,1],
//   [0,0,1],
//   [1,1,1]
// ]




// Step 2: Use markers to zero inner cells

//     Row 1 and Col 1 → mark zeros

// Result:



// [
//   [1,0,1],
//   [0,0,0],
//   [1,0,1]
// ]
