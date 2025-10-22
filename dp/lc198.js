// Problem — House Robber (LeetCode 198)



// Question:

// You are a professional robber planning to rob houses along a street.
// Each house has a certain amount of money stashed.
// All houses are arranged in a line, and adjacent houses have security systems connected, so you cannot rob two adjacent houses.

// Return the maximum amount of money you can rob without alerting the police.




// 💬 Example 1




// Input: nums = [1,2,3,1]
// Output: 4
// Explanation: Rob house 1 (money = 1) and house 3 (money = 3).
// Total = 1 + 3 = 4







// 💬 Example 1




// Input: nums = [2,7,9,3,1]
// Output: 12
// Explanation: Rob house 1 (2), house 3 (9), and house 5 (1).
// Total = 2 + 9 + 1 = 12









// 💡 Approach — Dynamic Programming

// Let’s define our state clearly 👇

// DP State:

// Let dp[i] = maximum money we can rob from the first i houses.






// Recurrence Relation:

// For each house i, you have two choices:

// 1.Rob current house → you can’t rob previous house →
// dp[i-2] + nums[i]

// 2.Skip current house →
// dp[i-1]







// dp[i] = Math.max(dp[i-1], dp[i-2] + nums[i])




// Base Cases:


// dp[0] = nums[0]
// dp[1] = Math.max(nums[0], nums[1])












/**
 * @param {number[]} nums
 * @return {number}
 */
var rob = function(nums) {
    const n = nums.length;
    if (n === 0) return 0;
    if (n === 1) return nums[0];

    // dp[i] = max money till house i
    const dp = new Array(n).fill(0);
    dp[0] = nums[0];
    dp[1] = Math.max(nums[0], nums[1]);

    for (let i = 2; i < n; i++) {
        // Choose to rob or skip
        dp[i] = Math.max(dp[i - 1], dp[i - 2] + nums[i]);
    }

    return dp[n - 1];
};

// 🧪 Test Cases
console.log(rob([1,2,3,1]));   // Output: 4
console.log(rob([2,7,9,3,1])); // Output: 12
console.log(rob([2,1,1,2]));   // Output: 4
















// ⚙️ Complexity Analysis
// Type	Value
// ⏱ Time	O(n)
// 💾 Space	O(n) (can be optimized to O(1))















// 🧠 Dry Run Example

// Input: [2,7,9,3,1]

// i	nums[i]	dp[i-2] + nums[i]	dp[i-1]	dp[i]	Explanation
// 0	2	—	—	2	Only one house
// 1	7	—	—	7	Max(2,7)=7
// 2	9	2+9=11	7	11	Rob 1st & 3rd
// 3	3	7+3=10	11	11	Skip 4th
// 4	1	11+1=12	11	12	Rob 5th









// 🔁 Space-Optimized Version

// We only need the last two states, so we can reduce space to O(1):









var rob = function(nums) {
    let prev1 = 0; // dp[i-1]
    let prev2 = 0; // dp[i-2]

    for (let num of nums) {
        let temp = Math.max(prev1, prev2 + num);
        prev2 = prev1;
        prev1 = temp;
    }

    return prev1;
};

// 🧪 Test
console.log(rob([2,7,9,3,1])); // Output: 12
