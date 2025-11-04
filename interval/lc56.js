// Problem: Merge Intervals (LC 56)



// Question:

// You are given an array of intervals intervals, where each interval is represented as [start, end].

// Merge all overlapping intervals, and return an array of the non-overlapping intervals that cover all the input intervals.

// Example 1
// Input:  intervals = [[1,3],[2,6],[8,10],[15,18]]



// Output:

// [[1,6],[8,10],[15,18]]




// Explanation:

// [1,3] and [2,6] overlap → merged to [1,6].

// [8,10] and [15,18] don’t overlap → remain as is.

// Example 2
// Input: intervals = [[1,4],[4,5]]



// Output:

// [[1,5]]








// Explanation:

// [1,4] and [4,5] overlap (touching at 4 is considered overlapping).




// 💡 Intuition

// 1.Sort intervals by start time.
//     This ensures we can linearly merge overlapping ones.

// 2.Compare current interval with the last added one in the result:

//     If overlap → merge (update end = max of both ends).

//     If no overlap → simply add current interval to result.










/**
 * @param {number[][]} intervals
 * @return {number[][]}
 */
var merge = function(intervals) {
  if (intervals.length === 0) return [];

  // 1️⃣ Sort by start time
  intervals.sort((a, b) => a[0] - b[0]);

  const result = [];
  let current = intervals[0]; // Start with first interval

  // 2️⃣ Iterate and merge
  for (let i = 1; i < intervals.length; i++) {
    const [start, end] = intervals[i];

    // If overlapping: update end
    if (start <= current[1]) {
      current[1] = Math.max(current[1], end);
    } else {
      // No overlap → push current and move to next
      result.push(current);
      current = intervals[i];
    }
  }

  // Push last merged interval
  result.push(current);

  return result;
};

// 🧪 Example Tests
console.log(merge([[1,3],[2,6],[8,10],[15,18]])); 
// ✅ Output: [[1,6],[8,10],[15,18]]

console.log(merge([[1,4],[4,5]])); 
// ✅ Output: [[1,5]]

console.log(merge([[1,4],[5,6]])); 
// ✅ Output: [[1,4],[5,6]] (no overlap)





// | Step | Current | Next    | Overlap? | Action        | Result                 |
// | ---- | ------- | ------- | -------- | ------------- | ---------------------- |
// | 1    | [1,3]   | [2,6]   | ✅ Yes    | Merge → [1,6] | —                      |
// | 2    | [1,6]   | [8,10]  | ❌ No     | Push [1,6]    | [[1,6]]                |
// | 3    | [8,10]  | [15,18] | ❌ No     | Push [8,10]   | [[1,6],[8,10]]         |
// | 4    | End     | —       | —        | Push [15,18]  | [[1,6],[8,10],[15,18]] |





// ✅ Output: [[1,6],[8,10],[15,18]]