// Find Minimum in Rotated Sorted Array (LC 153)   



// Problem

// Suppose an array of length n is sorted in ascending order and rotated between 1 and n times.

// Example: [0,1,2,4,5,6,7] → rotated → [4,5,6,7,0,1,2]

// Find the minimum element in O(log n) time.





// Input: nums = [3,4,5,1,2]
// Output: 1




// Input: nums = [4,5,6,7,0,1,2]
// Output: 0




// Input: nums = [11,13,15,17]
// Output: 11






// 🚀 Approach: Binary Search

// Since the array is rotated, one half is always sorted.

// The minimum lies in the unsorted half.

// Use binary search with conditions:

// 1. If nums[mid] > nums[right], the min is in the right half.

// 2. Otherwise, the min is in the left half (including mid).









// 🔹 Find Minimum in Rotated Sorted Array (LC 153)
var findMin = function(nums) {
    let left = 0, right = nums.length - 1;

    while (left < right) {
        let mid = Math.floor((left + right) / 2);

        // If mid element > right element,
        // then minimum is in the right half
        if (nums[mid] > nums[right]) {
            left = mid + 1;
        } 
        // Otherwise, min is in the left half (including mid)
        else {
            right = mid;
        }
    }

    // At the end, left == right → min element
    return nums[left];
};

// 🔎 Test Cases
console.log(findMin([3,4,5,1,2]));       // Expected: 1
console.log(findMin([4,5,6,7,0,1,2]));   // Expected: 0
console.log(findMin([11,13,15,17]));     // Expected: 11
console.log(findMin([2,3,4,5,6,7,1]));   // Expected: 1
