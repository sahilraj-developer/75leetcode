// Problem: Spiral Matrix (LC 54)
// Question:

// Given an m x n matrix, return all elements of the matrix in spiral order.

// ✅ Example 1


// Input:
// matrix = [
//   [1, 2, 3],
//   [4, 5, 6],
//   [7, 8, 9]
// ]

// Output:
// [1,2,3,6,9,8,7,4,5]





// Explanation:
// You start from the top-left and move right → down → left → up in spiral order.

// ✅ Example 2



// Input:
// matrix = [
//   [1, 2, 3, 4],
//   [5, 6, 7, 8],
//   [9,10,11,12]
// ]

// Output:
// [1,2,3,4,8,12,11,10,9,5,6,7]





// 💡 Intuition

// We can think of the matrix as layers (or rings).
// For each layer:

// 1.Traverse the top row (left → right)

// 2.Traverse the right column (top → bottom)

// 3.Traverse the bottom row (right → left)

// 4.Traverse the left column (bottom → top)

// Then move inward and repeat until all elements are visited.








// ⚙️ Approach

// We use four boundaries to control traversal:

//    top → initially 0

//    bottom → m - 1

//    left → 0

//    right → n - 1

// We iterate in the spiral direction and shrink boundaries after each full traversal.

// ✅ JavaScript Solution (Clean + Commented)









/**
 * @param {number[][]} matrix
 * @return {number[]}
 */
var spiralOrder = function(matrix) {
    const result = [];

    if (matrix.length === 0) return result;

    let top = 0;
    let bottom = matrix.length - 1;
    let left = 0;
    let right = matrix[0].length - 1;

    while (top <= bottom && left <= right) {
        // 1️⃣ Traverse top row (left → right)
        for (let i = left; i <= right; i++) {
            result.push(matrix[top][i]);
        }
        top++;

        // 2️⃣ Traverse right column (top → bottom)
        for (let i = top; i <= bottom; i++) {
            result.push(matrix[i][right]);
        }
        right--;

        // 3️⃣ Traverse bottom row (right → left)
        if (top <= bottom) {
            for (let i = right; i >= left; i--) {
                result.push(matrix[bottom][i]);
            }
            bottom--;
        }

        // 4️⃣ Traverse left column (bottom → top)
        if (left <= right) {
            for (let i = bottom; i >= top; i--) {
                result.push(matrix[i][left]);
            }
            left++;
        }
    }

    return result;
};

// 🧪 Example Tests
console.log(spiralOrder([
  [1,2,3],
  [4,5,6],
  [7,8,9]
])); 
// ✅ Output: [1,2,3,6,9,8,7,4,5]

console.log(spiralOrder([
  [1,2,3,4],
  [5,6,7,8],
  [9,10,11,12]
]));
// ✅ Output: [1,2,3,4,8,12,11,10,9,5,6,7]







// 🧠 Dry Run Example
// Input:


// [
//   [1,2,3],
//   [4,5,6],
//   [7,8,9]
// ]









// | Step | Direction  | Elements Added | Updated Boundaries |
// | ---- | ---------- | -------------- | ------------------ |
// | 1    | Top row    | 1, 2, 3        | top = 1            |
// | 2    | Right col  | 6, 9           | right = 1          |
// | 3    | Bottom row | 8, 7           | bottom = 1         |
// | 4    | Left col   | 4              | left = 1           |
// | 5    | Center     | 5              | done               |




// ✅ Result: [1,2,3,6,9,8,7,4,5]