// Contains Duplicate (LeetCode 217).



// 📌 Problem Statement

// Given an integer array nums, return true if any value appears at least twice in the array, and false if every element is distinct.

// 🔹 Approach 1: HashSet (Optimal)

// Use a Set to track seen numbers.

// If a number already exists in the set → return true.

// Otherwise, add it to the set.

// 👉 Best solution:

// Time Complexity: O(n)

// Space Complexity: O(n)






// 🔹 JavaScript Solution (HashSet)




// 🔹 Problem: Contains Duplicate (LC 217)
// Given an array, return true if any number appears at least twice.

/**
 * Approach: HashSet
 * Time Complexity: O(n)
 * Space Complexity: O(n)
 */
function containsDuplicate(nums) {
  let seen = new Set();

  for (let num of nums) {
    if (seen.has(num)) {
      return true; // duplicate found
    }
    seen.add(num);
  }

  return false; // all unique
}





// ✅ Test Cases
console.log(containsDuplicate([1, 2, 3, 1]));       // true (1 repeats)
console.log(containsDuplicate([1, 2, 3, 4]));       // false (all unique)
console.log(containsDuplicate([1, 1, 1, 3, 3, 4])); // true (1 repeats)
console.log(containsDuplicate([]));                 // false (empty array)
console.log(containsDuplicate([99]));               // false (single element)
console.log(containsDuplicate([0, -1, 2, -1]));     // true (-1 repeats)









// 🔹 Approach 2: Sorting (Less Efficient but Simple)

// Sort the array.

// Check adjacent elements — if any are equal, return true.







// function containsDuplicateSort(nums) {
//   nums.sort((a, b) => a - b); // O(n log n)
//   for (let i = 1; i < nums.length; i++) {
//     if (nums[i] === nums[i - 1]) return true;
//   }
//   return false;
// }








// HashSet approach → O(n) ✅

// Sorting approach → O(n log n) ❌