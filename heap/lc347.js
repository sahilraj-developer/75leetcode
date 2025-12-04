// Top K Frequent Elements (LeetCode 347)

// with problem explanation, approach intuition, dry run, and multiple JavaScript solutions including heap / bucket sort (optimal).

// 🧩 Problem

// Given an integer array nums and an integer k, return the k most frequent elements.

// Example 1


// Input: nums = [1,1,1,2,2,3], k = 2
// Output: [1,2]



// Example 2


// Input: nums = [1], k = 1
// Output: [1]









// 🎯 Goal

// Find which elements appear most often in the array and return the top K.

// 💡 Intuition
// Steps:

// 1.Count frequency of each number using a HashMap.

// 2.Use a bucket sort array where index = frequency, and values = elements.

// 3.Iterate backward from highest frequency and collect elements until K reached.

// 🟢 This is more efficient than sorting the counting map.











// ✅ JavaScript Solution using Bucket Sort (Best Approach, O(n))



/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number[]}
 */
var topKFrequent = function(nums, k) {
    const freqMap = new Map();

    // 1️⃣ Count frequencies
    for (const num of nums) {
        freqMap.set(num, (freqMap.get(num) || 0) + 1);
    }

    // 2️⃣ Bucket array (size = nums.length + 1)
    const buckets = Array(nums.length + 1).fill().map(() => []);

    // Fill buckets: freq index holds list of numbers
    for (const [num, freq] of freqMap) {
        buckets[freq].push(num);
    }

    // 3️⃣ Traverse buckets backward → highest freq first
    const result = [];
    for (let i = buckets.length - 1; i >= 0 && result.length < k; i--) {
        if (buckets[i].length > 0) {
            result.push(...buckets[i]);
        }
    }

    return result.slice(0, k);
};

// 🧪 Test
console.log(topKFrequent([1,1,1,2,2,3], 2)); // [1,2]
console.log(topKFrequent([1], 1)); // [1]








// 🧠 Dry Run Example
// Input:


// nums = [1,1,1,2,2,3], k = 2




// Step 1: Frequency Map



// {
//  1: 3,
//  2: 2,
//  3: 1
// }





// Step 2: Bucket Array (index = frequency)



// 0: []
// 1: [3]
// 2: [2]
// 3: [1]




// Step 3: Collect from end


// i=3 → add [1]
// i=2 → add [2]
// Done → [1,2]








// 🧰 Alternative: Min-Heap Solution (Priority Queue)













var topKFrequent = function(nums, k) {
    const freqMap = new Map();
    for (const num of nums) {
        freqMap.set(num, (freqMap.get(num) || 0) + 1);
    }

    const minHeap = [];

    for (const [num, freq] of freqMap) {
        minHeap.push([num, freq]);
        minHeap.sort((a, b) => a[1] - b[1]); // sort by freq

        if (minHeap.length > k) minHeap.shift(); // pop smallest
    }

    return minHeap.map(pair => pair[0]);
};
