// Problem — House Robber II (LeetCode 213)




// Question:

// You are a professional robber planning to rob houses along a street.
// Each house has a certain amount of money, but now the houses are arranged in a circle —
// which means the first and last houses are adjacent.

// Return the maximum amount of money you can rob without robbing two adjacent houses.







// 💬 Example 1


// Input: nums = [2,3,2]
// Output: 3
// Explanation: You can rob house 2 (3) but not both 2s since they are adjacent.




// 💬 Example 2


// Input: nums = [1,2,3,1]
// Output: 4
// Explanation: Rob houses 1 and 3 (1 + 3 = 4).




// 💬 Example 3



// Input: nums = [1,2,3]
// Output: 3
// Explanation: Rob house 3 for maximum profit.







// 💡 Approach — Dynamic Programming + Circular Handling

// The only difference from House Robber I:

// You cannot rob the first and last house together, because they are adjacent in a circle.

// So, to solve this:

// 1.Rob houses from 0 → n-2 (exclude last)

// 2.Rob houses from 1 → n-1 (exclude first)

// 3.Take the maximum of both.









// Helper Function (robLinear):

// We’ll reuse our previous House Robber I logic for a linear street.



// function robLinear(nums) {
//     let prev1 = 0; // dp[i-1]
//     let prev2 = 0; // dp[i-2]

//     for (let num of nums) {
//         let temp = Math.max(prev1, prev2 + num);
//         prev2 = prev1;
//         prev1 = temp;
//     }

//     return prev1;
// }













/**
 * @param {number[]} nums
 * @return {number}
 */
var rob = function(nums) {
    const n = nums.length;
    if (n === 0) return 0;
    if (n === 1) return nums[0];

    // Option 1: Exclude last house
    const option1 = robLinear(nums.slice(0, n - 1));
    // Option 2: Exclude first house
    const option2 = robLinear(nums.slice(1));

    return Math.max(option1, option2);
};

// Helper function for linear robber problem
function robLinear(nums) {
    let prev1 = 0; // max till previous house
    let prev2 = 0; // max till before previous

    for (let num of nums) {
        let temp = Math.max(prev1, prev2 + num);
        prev2 = prev1;
        prev1 = temp;
    }

    return prev1;
}

// 🧪 Test Cases
console.log(rob([2,3,2]));    // Output: 3
console.log(rob([1,2,3,1]));  // Output: 4
console.log(rob([1,2,3]));    // Output: 3














// 🧠 Dry Run Example

// Input: [1,2,3,1]

// 👉 Two possible robbing ranges:

// Exclude last: [1,2,3] → max = 4

// Exclude first: [2,3,1] → max = 3
// ✅ Final Answer = max(4, 3) = 4















// ⚙️ Complexity Analysis
// Type	Value
// ⏱ Time	O(n)
// 💾 Space	O(1)