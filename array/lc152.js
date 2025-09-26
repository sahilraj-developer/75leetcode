// Maximum Product Subarray (LC 152)


// Problem

// Given an integer array nums, find the contiguous subarray within the array that has the largest product, and return the product.




// Input: nums = [2,3,-2,4]
// Output: 6
// Explanation: [2,3] gives the max product = 6




// Input: nums = [-2,0,-1]
// Output: 0
// Explanation: The result cannot be 2, because [-2,-1] is not a contiguous subarray.





// 🚀 Approach: Track Both Min and Max

// The key difference from Maximum Sum Subarray is that multiplying by a negative number flips min ↔ max.

// So at each step we track:

// currMax → maximum product ending at index i

// currMin → minimum product ending at index i (important when negative numbers flip the sign)

// Update result with the best product so far.









// 🔹 Maximum Product Subarray (LC 152)
var maxProduct = function(nums) {
    let currMax = nums[0]; // max product ending here
    let currMin = nums[0]; // min product ending here
    let result = nums[0];  // global maximum

    for (let i = 1; i < nums.length; i++) {
        let num = nums[i];

        // If num is negative, swap currMax and currMin
        if (num < 0) {
            [currMax, currMin] = [currMin, currMax];
        }

        // Extend or restart at nums[i]
        currMax = Math.max(num, currMax * num);
        currMin = Math.min(num, currMin * num);

        // Update result with best so far
        result = Math.max(result, currMax);
    }

    return result;
};

// 🔎 Test Cases
console.log(maxProduct([2,3,-2,4]));       // Expected: 6
console.log(maxProduct([-2,0,-1]));        // Expected: 0
console.log(maxProduct([-2,3,-4]));        // Expected: 24
console.log(maxProduct([0,2]));            // Expected: 2
console.log(maxProduct([-2]));             // Expected: -2






// 🔑 Complexity

// Time: O(n) → single pass

// Space: O(1) → only variables used
