// 🔹 Problem: Two Sum (LC 1)

// Question:
// Given an array of integers nums and an integer target, return the indices of the two numbers such that they add up to target.

// You may assume that each input would have exactly one solution, and you may not use the same element twice.
// You can return the answer in any order.




// Input:

// nums = [2,7,11,15], target = 9


// Steps:

// i = 0 → num = 2 → complement = 7 → not in map → store {2:0}

// i = 1 → num = 7 → complement = 2 → found in map! → return [0,1]

// Output:

// [0,1]





// solution





// var twoSum = function(nums, target) {
//     let map = new Map(); // number -> index
//     for (let i = 0; i < nums.length; i++) {
//         let complement = target - nums[i];
//         if (map.has(complement)) {
//             return [map.get(complement), i];
//         }
//         map.set(nums[i], i);
//     }
// };





/**
 * LeetCode 1: Two Sum
 * Approach: HashMap for complement lookup
 * Time Complexity: O(n), Space Complexity: O(n)
 */

function twoSum(nums, target) {
  // Create a HashMap to store numbers we’ve already seen
  let map = new Map();

  // Loop through the array
  for (let i = 0; i < nums.length; i++) {
    let num = nums[i];
    let complement = target - num;

    // Check if the complement exists in the HashMap
    if (map.has(complement)) {
      // If yes, return the indices
      return [map.get(complement), i];
    }

    // Otherwise, store the current number with its index
    map.set(num, i);
  }

  // If no solution is found (not expected as per problem statement)
  return [];
}



// ✅ Test Cases
console.log(twoSum([2, 7, 11, 15], 9));   // [0, 1]
console.log(twoSum([3, 2, 4], 6));        // [1, 2]
console.log(twoSum([3, 3], 6));           // [0, 1]
console.log(twoSum([1, 5, 9, 14], 10));   // [0, 2]
console.log(twoSum([0, 4, 3, 0], 0));     // [0, 3] (handles duplicate 0s)
console.log(twoSum([-1, -2, -3, -4, -5], -8)); // [2, 4] (works with negatives)