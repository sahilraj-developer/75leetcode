// Search in Rotated Sorted Array (LC 33)



// 📘 Problem Statement

// You are given an integer array nums sorted in ascending order, but it has been rotated at an unknown pivot.

// For example:

// Original sorted: [0,1,2,4,5,6,7]

// Rotated: [4,5,6,7,0,1,2]

// You are given a target value. If the target exists in the array, return its index. Otherwise, return -1.
// You must write an algorithm with O(log n) runtime complexity.





// 🔑 Key Insight

// Even though the array is rotated, at least one half (left or right) is always sorted.
// We use binary search with conditions to decide which half to explore.






var search = function(nums, target) {
    let left = 0, right = nums.length - 1;

    while (left <= right) {
        let mid = Math.floor((left + right) / 2);

        // 🎯 Case 1: Found target
        if (nums[mid] === target) return mid;

        // Case 2: Left half is sorted
        if (nums[left] <= nums[mid]) {
            if (nums[left] <= target && target < nums[mid]) {
                // target lies inside left half
                right = mid - 1;
            } else {
                // target lies in right half
                left = mid + 1;
            }
        } 
        // Case 3: Right half is sorted
        else {
            if (nums[mid] < target && target <= nums[right]) {
                // target lies inside right half
                left = mid + 1;
            } else {
                // target lies in left half
                right = mid - 1;
            }
        }
    }

    return -1; // target not found
};





console.log(search([4,5,6,7,0,1,2], 0)); // Output: 4
console.log(search([4,5,6,7,0,1,2], 3)); // Output: -1
console.log(search([1], 0));             // Output: -1
console.log(search([1,3], 3));           // Output: 1


















// 📝 Explanation (Step by Step)

// Start with two pointers:

// left = 0

// right = nums.length - 1

// Find the middle: mid = Math.floor((left + right) / 2)

// Check if nums[mid] == target. If yes → return mid.

// If not, decide which half is sorted:

// If nums[left] <= nums[mid] → left half is sorted

// Else → right half is sorted

// Narrow down the search:

// If target lies inside the sorted half → search that half

// Otherwise → search the other half

// Repeat until left > right.












// 🔹 Example Dry Run

// Input:
// nums = [4,5,6,7,0,1,2], target = 0

// Step 1: left=0, right=6, mid=3 → nums[mid]=7
// Left half [4,5,6,7] is sorted. Target 0 is not in [4..7].
// → Move to right half → left=4.

// Step 2: left=4, right=6, mid=5 → nums[mid]=1
// Left half [0,1] is sorted. Target 0 is in [0,1].
// → Move to left half → right=4.

// Step 3: left=4, right=4, mid=4 → nums[mid]=0 🎯 Found target!

// Output: 4