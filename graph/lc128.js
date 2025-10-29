// Problem: Longest Consecutive Sequence (LC 128)
// 🔍 Problem Statement

// Given an unsorted array of integers nums, return the length of the longest consecutive elements sequence.

// You must write an algorithm that runs in O(n) time.





// 🧠 Example


// nums = [100, 4, 200, 1, 3, 2]



// 4






// Explanation:
// The longest consecutive elements sequence is [1, 2, 3, 4], so the length is 4.

// ⚙️ Constraints

// 0 <= nums.length <= 10^5

// -10^9 <= nums[i] <= 10^9








// 💡 Intuition and Approach

// We need O(n), so sorting (O(n log n)) won’t work.
// The trick is to use a Set for O(1) lookups.

// Put all numbers into a Set.
//     This lets us quickly check if a number exists.

// For each number num in nums:

//     If num - 1 doesn’t exist, that means num is the start of a new sequence.

//     From num, keep checking consecutive numbers (num + 1, num + 2, …) in the Set.

// Count how long the streak is.

//    Update the maximum length found.

//    Return the maximum streak length.

// ✅ Why this works:
//     Each sequence is counted exactly once — only when its first number is found — giving O(n) overall.




    /**
 * @param {number[]} nums
 * @return {number}
 */
var longestConsecutive = function(nums) {
    // Base case: empty array
    if (nums.length === 0) return 0;

    // Step 1: Put all numbers in a Set for O(1) lookups
    const numSet = new Set(nums);
    let maxLength = 0;

    // Step 2: Traverse each number
    for (const num of numSet) {
        // Step 3: Only start counting if it's the start of a sequence
        if (!numSet.has(num - 1)) {
            let currentNum = num;
            let currentStreak = 1;

            // Step 4: Count consecutive numbers
            while (numSet.has(currentNum + 1)) {
                currentNum += 1;
                currentStreak += 1;
            }

            // Step 5: Track max length
            maxLength = Math.max(maxLength, currentStreak);
        }
    }

    return maxLength;
};

// 🧪 Test Cases
console.log(longestConsecutive([100, 4, 200, 1, 3, 2])); // ➜ 4
console.log(longestConsecutive([0,3,7,2,5,8,4,6,0,1]));  // ➜ 9
console.log(longestConsecutive([]));                     // ➜ 0
console.log(longestConsecutive([1,2,0,1]));              // ➜ 3









// 🔍 Dry Run #2

// Input: [0,3,7,2,5,8,4,6,0,1]

// Set = {0,1,2,3,4,5,6,7,8}

// Start at 0 (since -1 not in set)

// 0→1→2→3→4→5→6→7→8 → streak = 9
// ✅ Output: 9









// 🕒 Complexity
// Type	Complexity
// Time	O(n) — each number processed once
// Space	O(n) — for the Set