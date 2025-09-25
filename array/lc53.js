// Maximum Subarray (LC 53)



// Problem

// Given an integer array nums, find the contiguous subarray (containing at least one number) which has the largest sum, and return its sum.



// Input: nums = [-2,1,-3,4,-1,2,1,-5,4]
// Output: 6
// Explanation: [4,-1,2,1] has the largest sum = 6




// 🚀 Approach: Kadane’s Algorithm

// Keep a running sum currentSum of the subarray.

// At each index:

// Either extend the current subarray (currentSum + nums[i])

// Or start fresh from nums[i].

// Track the global maximum maxSum.

// Runs in O(n) time and O(1) space.





// 🔹 Maximum Subarray (LC 53)
// Using Kadane’s Algorithm
var maxSubArray = function(nums) {
    // Initialize with first element
    let currentSum = nums[0];
    let maxSum = nums[0];

    // Traverse the array
    for (let i = 1; i < nums.length; i++) {
        // Either add nums[i] to current subarray OR start fresh from nums[i]
        currentSum = Math.max(nums[i], currentSum + nums[i]);

        // Update maxSum if currentSum is greater
        maxSum = Math.max(maxSum, currentSum);
    }

    return maxSum;
};

// 🔎 Test Cases
console.log(maxSubArray([-2,1,-3,4,-1,2,1,-5,4])); // Expected: 6
console.log(maxSubArray([1]));                      // Expected: 1
console.log(maxSubArray([5,4,-1,7,8]));             // Expected: 23






// 🔑 Complexity

// Time: O(n) → single pass

// Space: O(1) → only a few variables