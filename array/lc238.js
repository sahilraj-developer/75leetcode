// Product of Array Except Self (LC 238)



// Question:
// Given an integer array nums, return an array answer such that answer[i] is equal to the product of all the elements of nums except nums[i].

// You must write an algorithm that runs in O(n) time and without using division.



// Input: nums = [1,2,3,4]
// Output: [24,12,8,6]





// 🚀 Approach (Prefix & Suffix Product)

// We can’t use division, so we use two passes:

// Compute prefix products (product of all numbers before i).

// Compute suffix products (product of all numbers after i).

// Multiply prefix and suffix for each index.










// 🔹 Product of Array Except Self (LC 238)

// Function Implementation
var productExceptSelf = function(nums) {
    let n = nums.length;
    let res = new Array(n).fill(1); // result array initialized with 1s

    // Step 1️⃣: Build prefix products
    let prefix = 1;
    for (let i = 0; i < n; i++) {
        res[i] = prefix;       // res[i] = product of elements to the LEFT of i
        prefix *= nums[i];     // update prefix to include nums[i]
    }

    // Step 2️⃣: Build suffix products and multiply
    let suffix = 1;
    for (let i = n - 1; i >= 0; i--) {
        res[i] *= suffix;      // multiply with product of elements to the RIGHT of i
        suffix *= nums[i];     // update suffix to include nums[i]
    }

    return res;
};

// 🔎 Test Cases
console.log(productExceptSelf([1, 2, 3, 4]));   // Expected: [24, 12, 8, 6]
console.log(productExceptSelf([2, 3, 4, 5]));   // Expected: [60, 40, 30, 24]
console.log(productExceptSelf([5, 1, 10]));     // Expected: [10, 50, 5]






// [ 24, 12, 8, 6 ]
// [ 60, 40, 30, 24 ]
// [ 10, 50, 5 ]
