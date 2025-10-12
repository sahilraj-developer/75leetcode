// Problem — Number of 1 Bits (LeetCode 191)



// Question:
// Write a function that takes an unsigned integer and returns the number of '1' bits it has (also known as the Hamming weight).



// 💬 Example 1


// Input: n = 00000000000000000000000000001011
// Output: 3
// Explanation: The input binary string has a total of three '1' bits.




// 💬 Example 2


// Input: n = 00000000000000000000000010000000
// Output: 1




// 💬 Example 3


// Input: n = 11111111111111111111111111111101
// Output: 31






// 💡 Approach — Bit Manipulation

// We can use bitwise operations to count the number of 1s in the binary representation of a number.

// 🧠 Key Idea:

//  If we AND (&) the number n with 1, we get the last bit of n.

//     If n & 1 == 1, the last bit is 1.

//  Then we right shift (>>> 1) the number to check the next bit.

//  Continue this process until n becomes 0.















 /**
 * @param {number} n - a positive integer
 * @return {number}
 */
var hammingWeight = function(n) {
    let count = 0;

    while (n !== 0) {
        count += n & 1;  // Add 1 if the last bit is 1
        n = n >>> 1;     // Unsigned right shift to move to the next bit
    }

    return count;
};

// 🧪 Test Cases
console.log(hammingWeight(0b00000000000000000000000000001011)); // Output: 3
console.log(hammingWeight(0b00000000000000000000000010000000)); // Output: 1
console.log(hammingWeight(0b11111111111111111111111111111101)); // Output: 31










// ⚙️ Alternate Optimized Solution — Brian Kernighan’s Algorithm

//    This method is faster because it turns off the rightmost 1-bit in each iteration.

// Explanation:

//    The operation n & (n - 1) clears the lowest set bit in n.

//    Each loop iteration removes one 1 bit until n becomes 0.





   var hammingWeight = function(n) {
    let count = 0;
    while (n !== 0) {
        n = n & (n - 1);
        count++;
    }
    return count;
};

// 🧪 Test
console.log(hammingWeight(0b00000000000000000000000000001011)); // 3











// 🧩 Time & Space Complexity

// Time Complexity: O(k) — where k is the number of 1 bits (at most 32 for 32-bit integers).

// Space Complexity: O(1) — uses only a few variables.