// 🧩 Problem — Combination Sum IV (LeetCode 377)



// Question:

// Given an array of distinct integers nums and an integer target,
// return the number of possible combinations that add up to exactly target.

// Note: The order of numbers matters in this problem.





// 💬 Example 1



// Input: nums = [1, 2, 3], target = 4
// Output: 7
// Explanation: The possible combinations are:
// 1. 1+1+1+1
// 2. 1+1+2
// 3. 1+2+1
// 4. 2+1+1
// 5. 2+2
// 6. 1+3
// 7. 3+1





// 💬 Example 2



// Input: nums = [9], target = 3
// Output: 0






// 💡 Approach — Dynamic Programming (Bottom-Up)

//     We use DP array dp[i] where:

//     dp[i] = number of combinations to make sum = i.





// Base Case:

//     dp[0] = 1 → only 1 way to make sum 0 (choose nothing)




// Transition / Recurrence:

// For each i from 1 to target:





// dp[i] += dp[i - num]  // for each num in nums, if i-num >=0






/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
var combinationSum4 = function(nums, target) {
    const dp = new Array(target + 1).fill(0);
    dp[0] = 1; // base case

    // Build DP table
    for (let i = 1; i <= target; i++) {
        for (let num of nums) {
            if (i - num >= 0) {
                dp[i] += dp[i - num];
            }
        }
    }

    return dp[target];
};

// 🧪 Test Cases
console.log(combinationSum4([1,2,3], 4)); // Output: 7
console.log(combinationSum4([9], 3));     // Output: 0
console.log(combinationSum4([1,2,5], 5)); // Output: 9










// ⚙️ Complexity
// Type	Value
// ⏱ Time	O(target × n) → for each sum, check all nums
// 💾 Space	O(target) → DP array of size target+1