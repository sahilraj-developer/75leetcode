// Problem — Sum of Two Integers (LeetCode 371)




// Question:
// Given two integers a and b, return the sum of the two integers without using the operators + and -.

// Example:



// Input: a = 1, b = 2
// Output: 3







// Example 2:



// Input: a = 2, b = 3
// Output: 5




// 💡 Approach — Using Bit Manipulation

// We can simulate addition using bitwise operations:

// XOR (^) gives the sum without carry.

// AND (&) finds the carry bits, but we must shift them left (<< 1) to add in the next position.

// We repeat the process until no carry remains.





// 🧠 Explanation

// Let’s take an example:
// a = 2 (010) and b = 3 (011)

// Step	a (bin)	b (bin)	XOR (sum without carry)	AND<<1 (carry)
// 1	      010	    011	  001	                100
// 2	      001	    100	  101	                000














/**
 * @param {number} a
 * @param {number} b
 * @return {number}
 */
var getSum = function(a, b) {
    // Loop until there is no carry
    while (b !== 0) {
        // Calculate carry
        let carry = (a & b) << 1;
        // Add without carry using XOR
        a = a ^ b;
        // Move carry to b
        b = carry;
    }
    return a;
};

// 🧪 Test Cases
console.log(getSum(1, 2)); // Output: 3
console.log(getSum(2, 3)); // Output: 5
console.log(getSum(-2, 3)); // Output: 1
console.log(getSum(-5, -7)); // Output: -12







// 🕵️ Dry Run Example

// Input: a = -2, b = 3

// Step 1: a ^ b = -3, carry = ((a & b) << 1) = 4

// Step 2: a = -3, b = 4

// Step 3: a ^ b = -7, carry = ((a & b) << 1) = 8

// Step 4: a = -7, b = 8

// Step 5: a ^ b = 1, carry = ((a & b) << 1) = 0

// ✅ Output = 1







// 🧩 Time & Space Complexity

// Time Complexity: O(1) — runs in constant time (at most 32 iterations for 32-bit integers).

// Space Complexity: O(1) — no extra space used.