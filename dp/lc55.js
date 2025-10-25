Problem: Jump Game (LC 55)



Question:

You are given an integer array nums where each element represents your maximum jump length at that position.

Return true if you can reach the last index, otherwise return false.



Example 1:

Input: nums = [2,3,1,1,4]
Output: true




Explanation:

From index 0, you can jump to index 1 or 2.

From index 1, you can jump to index 4 (the end).
✅ You can reach the last index.






Example 2:

Input: nums = [3,2,1,0,4]
Output: false





Explanation:
You will always reach index 3, which has value 0, and you can’t jump any further.
❌ You cannot reach the last index.




💡 Approach (Greedy):

We track the farthest index we can reach as we move from left to right.

Initialize maxReach = 0.

Loop through each index i.

If i is greater than maxReach, it means we can’t move forward → return false.

Update maxReach = Math.max(maxReach, i + nums[i]).

If maxReach reaches or exceeds the last index → return true.

✅ This is an O(n) time and O(1) space greedy solution.











var canJump = function(nums) {
    let maxReach = 0;  // Tracks the farthest index we can reach
    
    for (let i = 0; i < nums.length; i++) {
        // If we are stuck (can't reach this position)
        if (i > maxReach) return false;
        
        // Update the farthest reachable index
        maxReach = Math.max(maxReach, i + nums[i]);
        
        // If we can reach or go beyond the last index
        if (maxReach >= nums.length - 1) return true;
    }
    
    return true;  // If loop finishes, we can reach the end
};

// 🔹 Test Cases
console.log(canJump([2,3,1,1,4])); // true
console.log(canJump([3,2,1,0,4])); // false
console.log(canJump([0]));         // true
console.log(canJump([2,0,0]));     // true













🧾 Dry Run Example
Input:

nums = [2,3,1,1,4]

i	nums[i] 	maxReach (before)	i + nums[i]	maxReach (after)	Notes
0	  2	         0	                  2	         2          	    Can  reach index 2
1	  3	         2	                  4	         4	                Can reach index 4 (end) ✅