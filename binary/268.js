// Problem — Missing Number (LeetCode 268)



// Question:
// Given an array nums containing n distinct numbers in the range [0, n], return the only number missing from the range.



// 💬 Example 1


// Input: nums = [3,0,1]
// Output: 2
// Explanation: n = 3 since there are 3 numbers, so all numbers are in the range [0,3].
// Here, 0, 1, and 3 are present, so 2 is missing.




// 💬 Example 2


// Input: nums = [0,1]
// Output: 2




// 💬 Example 3


// Input: nums = [9,6,4,2,3,5,7,0,1]
// Output: 8




// 💡 Approach 1 — Using Math Formula (Sum Difference)



/**
 * @param {number[]} nums
 * @return {number}
 */
var missingNumber = function(nums) {
    const n = nums.length;
    const expectedSum = (n * (n + 1)) / 2;
    const actualSum = nums.reduce((acc, num) => acc + num, 0);

    return expectedSum - actualSum;
};

// 🧪 Test Cases
console.log(missingNumber([3,0,1]));        // Output: 2
console.log(missingNumber([0,1]));          // Output: 2
console.log(missingNumber([9,6,4,2,3,5,7,0,1])); // Output: 8






// 🕵️ Dry Run Example

// Input: nums = [3,0,1]

// Step	           Action	            Result
// n	                  3	                There are 3 numbers
// Expected Sum	      (3 × 4) / 2 = 6	Sum of numbers from 0 → 3
// Actual Sum	           3 + 0 + 1 = 4	Sum of given numbers
// Missing Number	       6 - 4 = 2	    ✅ Output = 2









// 💡 Approach 2 — Using XOR (Bit Manipulation)



// We can also solve this without using extra space or sum formulas.

// 🧠 XOR Properties

// a ^ a = 0

// a ^ 0 = a

// XOR is commutative and associative.

// If we XOR all numbers from 0 to n and XOR all numbers in nums,
// the duplicates will cancel out, leaving only the missing number.







var missingNumber = function(nums) {
    let xor = 0;
    const n = nums.length;

    for (let i = 0; i <= n; i++) {
        xor ^= i;        // XOR all numbers from 0 to n
    }
    for (let num of nums) {
        xor ^= num;      // XOR with each element in nums
    }

    return xor;
};

// 🧪 Test
console.log(missingNumber([3,0,1])); // Output: 2








// 🧩 Time & Space Complexity
// Approach	Time Complexity	Space Complexity
// Sum Formula	O(n)	O(1)
// XOR	O(n)	O(1)