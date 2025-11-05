// Problem: Non-overlapping Intervals (LC 435)



// Question:

// Given an array of intervals, return the minimum number of intervals to remove so that the rest of the intervals do not overlap.

// Important Detail:

// This is a greedy problem — we want to keep intervals, not remove them directly.




// Example 1


// Input: intervals = [[1,2],[2,3],[3,4],[1,3]]
// Output: 1



// Explanation:

// Remove [1,3], then all remaining intervals do not overlap.








// Example 2


// Input: intervals = [[1,2],[1,2],[1,2]]
// Output: 2






// 💡 Key Insight (Greedy Strategy)

// To minimize removals → keep intervals with the smallest end time.
// Why? Because a smaller end time leaves more room for future intervals → fewer conflicts.

// Steps:

// 1.Sort intervals by end time (ascending).

// 2.Use a pointer to track the last included interval.

// 3.Count overlaps — if current interval starts before the last kept interval ends → remove it.











/**
 * @param {number[][]} intervals
 * @return {number}
 */
var eraseOverlapIntervals = function(intervals) {
  if (intervals.length === 0) return 0;

  // 1️⃣ Sort by end time (smallest end first)
  intervals.sort((a, b) => a[1] - b[1]);

  let count = 0;            // number of intervals to remove
  let prevEnd = intervals[0][1]; // end of last non-overlapping interval

  // 2️⃣ Iterate from second interval onward
  for (let i = 1; i < intervals.length; i++) {
    const [start, end] = intervals[i];

    // If overlapping → remove this interval
    if (start < prevEnd) {
      count++;
    } else {
      // No overlap → update prevEnd
      prevEnd = end;
    }
  }

  return count;
};

// 🧪 Example Tests
console.log(eraseOverlapIntervals([[1,2],[2,3],[3,4],[1,3]])); // ✅ 1
console.log(eraseOverlapIntervals([[1,2],[1,2],[1,2]]));       // ✅ 2
console.log(eraseOverlapIntervals([[1,2],[2,3]]));             // ✅ 0




// Step-by-step after sorting by end:

// Sorted → [[1,2],[1,3],[2,3],[3,4]]







// | Interval | Compare start with prevEnd | Action | Removed Count | prevEnd |
// | -------- | -------------------------- | ------ | ------------- | ------- |
// | [1,2]    | —                          | Keep   | 0             | 2       |
// | [1,3]    | 1 < 2 (overlap)            | Remove | 1             | 2       |
// | [2,3]    | 2 >= 2                     | Keep   | 1             | 3       |
// | [3,4]    | 3 >= 3                     | Keep   | 1             | 4       |
