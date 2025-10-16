// Problem — Climbing Stairs (LeetCode 70)




// Question:

// You are climbing a staircase.
// It takes n steps to reach the top.
// Each time you can either climb 1 or 2 steps.

// How many distinct ways can you climb to the top?




// 💬 Example 1



// Input: n = 2
// Output: 2
// Explanation: 
// 1. 1 step + 1 step
// 2. 2 steps




// 💬 Example 2



// Input: n = 3
// Output: 3
// Explanation:
// 1. 1 step + 1 step + 1 step
// 2. 1 step + 2 steps
// 3. 2 steps + 1 step







// 💡 Approach — Dynamic Programming (Fibonacci Pattern)

// This problem follows the same pattern as Fibonacci numbers.

// 👉 To reach step n:

//     You can come from step n-1 (then take 1 step), OR

//     From step n-2 (then take 2 steps).

// So the recurrence relation:



//     ways(n) = ways(n - 1) + ways(n - 2)






// 🧠 Step-by-Step Logic

// If n = 1, only 1 way.

// If n = 2, only 2 ways.

// For n > 2, each step is sum of previous two:

// ways[i] = ways[i-1] + ways[i-2]









/**
 * @param {number} n
 * @return {number}
 */
var climbStairs = function(n) {
    if (n <= 2) return n;

    let one = 1; // ways to reach step 1
    let two = 2; // ways to reach step 2

    for (let i = 3; i <= n; i++) {
        let temp = one + two; // total ways for current step
        one = two;            // move forward
        two = temp;
    }

    return two;
};

// 🧪 Test Cases
console.log(climbStairs(2)); // Output: 2
console.log(climbStairs(3)); // Output: 3
console.log(climbStairs(5)); // Output: 8







// ⚙️ Time & Space Complexity
// Complexity	Value
// Time	    O(n)
// Space	    O(1)