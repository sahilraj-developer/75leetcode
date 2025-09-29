// 3Sum (LC 15)



// 📘 Problem Statement

// Given an integer array nums, return all the unique triplets [nums[i], nums[j], nums[k]] such that:

// i != j, i != k, j != k

// nums[i] + nums[j] + nums[k] == 0

// The solution must not contain duplicate triplets.

// 🔑 Key Points

// Sorting helps: After sorting, we can use the two-pointer technique to find pairs that sum up to a target.

// To avoid duplicates:

// Skip duplicate elements when moving the main loop.

// Skip duplicate numbers when adjusting left/right pointers. 











var threeSum = function(nums) {
    nums.sort((a, b) => a - b); // Sort array
    let res = [];

    for (let i = 0; i < nums.length; i++) {
        // Skip duplicate values for i
        if (i > 0 && nums[i] === nums[i - 1]) continue;

        let left = i + 1;
        let right = nums.length - 1;

        while (left < right) {
            let sum = nums[i] + nums[left] + nums[right];

            if (sum === 0) {
                res.push([nums[i], nums[left], nums[right]]);
                left++;
                right--;

                // Skip duplicates for left and right
                while (left < right && nums[left] === nums[left - 1]) left++;
                while (left < right && nums[right] === nums[right + 1]) right--;
            } 
            else if (sum < 0) {
                left++; // Need a bigger sum
            } 
            else {
                right--; // Need a smaller sum
            }
        }
    }

    return res;
};



console.log(threeSum([-1,0,1,2,-1,-4]));
// Output: [ [ -1, -1, 2 ], [ -1, 0, 1 ] ]

console.log(threeSum([0,1,1]));
// Output: []

console.log(threeSum([0,0,0]));
// Output: [ [0,0,0] ]












// 📝 Explanation (Step by Step)

// Sort the array → makes duplicate handling easier and allows two-pointer technique.
// Example: [-1, 0, 1, 2, -1, -4] → [-4, -1, -1, 0, 1, 2]

// Loop through each element (i) as the first number of the triplet.

// For each i, use two pointers:

// left = i + 1

// right = nums.length - 1

// Calculate sum = nums[i] + nums[left] + nums[right]:

// If sum == 0 → store triplet, move both pointers inward, and skip duplicates.

// If sum < 0 → move left++ (need a larger number).

// If sum > 0 → move right-- (need a smaller number).

// Continue until left >= right.

// Return all unique triplets.

// 🔹 Example Dry Run

// Input: nums = [-1,0,1,2,-1,-4]

// Sorted: [-4, -1, -1, 0, 1, 2]

// i=0 → -4
// left=1, right=5 → sum < 0 (increase left). No triplet.

// i=1 → -1
// left=2, right=5 → sum=0 → [-1, -1, 2] ✅
// left=3, right=4 → sum=0 → [-1, 0, 1] ✅

// i=2 → -1 (duplicate of i=1) → skip

// i=3 → 0
// left=4, right=5 → sum > 0 → move right. No new triplet.

// Final Answer: [[-1, -1, 2], [-1, 0, 1]]