// Problem — Reverse Bits (LeetCode 190)



// Question:
// Reverse bits of a given 32-bit unsigned integer.

// 💬 Example 1


// Input: n = 00000010100101000001111010011100
// Output:    00111001011110000010100101000000
// Explanation: The input binary string represents the unsigned integer 43261596,
// so return 964176192 which represents:
// binary 00111001011110000010100101000000.







// 💬 Example 2



// Input: n = 11111111111111111111111111111101
// Output:    10111111111111111111111111111111
// Explanation: Returns 3221225471.







// 💡 Approach — Bit Manipulation

// We want to reverse all 32 bits of the given number.
// We can achieve this using bitwise operations.

// 🧠 Step-by-Step Logic

// 1.Initialize a result rev = 0.

// 2.Loop 32 times (since it’s a 32-bit number).

// 3.Each time:

//    Shift rev left by 1 (rev <<= 1).

//    Add the last bit of n to rev → rev |= n & 1.

//    Shift n right by 1 (n >>>= 1) to move to the next bit.

// Return rev.


















/**
 * @param {number} n - a positive integer
 * @return {number} - reversed bits
 */
var reverseBits = function(n) {
    let rev = 0;

    for (let i = 0; i < 32; i++) {
        rev <<= 1;       // Shift result left to make space for next bit
        rev |= n & 1;    // Add the last bit of n to rev
        n >>>= 1;        // Unsigned right shift n
    }

    // Ensure unsigned 32-bit integer result
    return rev >>> 0;
};

// 🧪 Test Cases
console.log(reverseBits(0b00000010100101000001111010011100)); 
// Output: 964176192 (binary: 00111001011110000010100101000000)

console.log(reverseBits(0b11111111111111111111111111111101)); 
// Output: 3221225471 (binary: 10111111111111111111111111111111)












// 🧩 Time & Space Complexity
// Operation	Complexity
// Time	    O(32) → constant time
// Space	    O(1)