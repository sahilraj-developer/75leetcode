// Problem — Longest Increasing Subsequence (LeetCode 300)



// Question:

// Given an integer array nums, return the length of the longest strictly increasing subsequence.

// A subsequence is a sequence derived from the array by deleting some (or no) elements without changing the order of the remaining elements.





// 💬 Example 1


// Input: nums = [10, 9, 2, 5, 3, 7, 101, 18]
// Output: 4
// Explanation: The LIS is [2, 3, 7, 101], so length = 4




// 💬 Example 2


// Input: nums = [0, 1, 0, 3, 2, 3]
// Output: 4
// Explanation: One LIS is [0, 1, 2, 3]




// 💬 Example 3



// Input: nums = [7,7,7,7,7,7,7]
// Output: 1






// 💡 Approach 1 — Dynamic Programming (O(n²))

// We will use a dp array where:

// dp[i] = the length of the longest increasing subsequence ending at index i.

// Steps:

// 1.Initialize dp with 1 for all elements (since each number itself is a subsequence of length 1).

// 2.For each element nums[i], check all previous elements nums[j] (where j < i):

//     If nums[j] < nums[i], then we can extend the subsequence ending at j.

//     Update dp[i] = max(dp[i], dp[j] + 1).

// Finally, return the maximum value in the dp array.










/**
 * @param {number[]} nums
 * @return {number}
 */
var lengthOfLIS = function(nums) {
    const n = nums.length;
    const dp = new Array(n).fill(1); // each element is LIS of length 1

    for (let i = 1; i < n; i++) {
        for (let j = 0; j < i; j++) {
            if (nums[j] < nums[i]) {
                dp[i] = Math.max(dp[i], dp[j] + 1);
            }
        }
    }

    // The longest increasing subsequence length
    return Math.max(...dp);
};

// 🧪 Test Cases
console.log(lengthOfLIS([10, 9, 2, 5, 3, 7, 101, 18])); // Output: 4
console.log(lengthOfLIS([0, 1, 0, 3, 2, 3]));           // Output: 4
console.log(lengthOfLIS([7,7,7,7,7]));                  // Output: 1









// ⚙️ Complexity
// Type	Value
// Time Complexity	O(n²)
// Space Complexity	O(n)
















// ⚡ Approach 2 — Binary Search (O(n log n))

// For large arrays, we can use a smart greedy + binary search method.

// We maintain an array sub where:

//     sub[i] = smallest possible tail of an increasing subsequence of length i + 1.

// For each num:

//     If num > last element of sub, append it.

//     Else, replace the smallest element ≥ num (using binary search).

// The length of sub = LIS length.











var lengthOfLIS = function(nums) {
    const sub = [];

    for (let num of nums) {
        let left = 0, right = sub.length;

        // Binary search for the insertion point
        while (left < right) {
            let mid = Math.floor((left + right) / 2);
            if (sub[mid] < num) left = mid + 1;
            else right = mid;
        }

        // Replace or append
        sub[left] = num;
    }

    return sub.length;
};

// 🧪 Test
console.log(lengthOfLIS([10,9,2,5,3,7,101,18])); // Output: 4
