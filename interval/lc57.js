// Problem: Insert Interval (LC 57)



// Question:

// You are given an array of non-overlapping intervals intervals, where each interval is sorted by its start time,
// and a new interval newInterval.

// 👉 Insert newInterval into the list so that the list remains sorted and non-overlapping (merge if needed).

// Return the resulting list of intervals.



// Example 1
// Input:

// intervals = [[1,3],[6,9]]
// newInterval = [2,5]



// Output:


// [[1,5],[6,9]]




// Explanation:

// [2,5] overlaps with [1,3] → merged into [1,5].





// Example 2
// Input:



// intervals = [[1,2],[3,5],[6,7],[8,10],[12,16]]
// newInterval = [4,8]


// Output:


// [[1,2],[3,10],[12,16]]









// Explanation:

// [4,8] overlaps with [3,5], [6,7], and [8,10] → merged into [3,10].





// 💡 Intuition

// We can process this problem in three phases:

// 1.Add all intervals before the new interval (no overlap).

// 2.Merge all overlapping intervals with the new interval.

// 3.Add all intervals after the new interval (no overlap).

// We can do this in a single pass — O(N) time.








/**
 * @param {number[][]} intervals
 * @param {number[]} newInterval
 * @return {number[][]}
 */
var insert = function(intervals, newInterval) {
  const res = [];
  let i = 0;
  const n = intervals.length;

  // 1️⃣ Add all intervals ending before the new interval starts
  while (i < n && intervals[i][1] < newInterval[0]) {
    res.push(intervals[i]);
    i++;
  }

  // 2️⃣ Merge all overlapping intervals
  while (i < n && intervals[i][0] <= newInterval[1]) {
    newInterval[0] = Math.min(newInterval[0], intervals[i][0]);
    newInterval[1] = Math.max(newInterval[1], intervals[i][1]);
    i++;
  }

  // Add merged interval
  res.push(newInterval);

  // 3️⃣ Add remaining intervals
  while (i < n) {
    res.push(intervals[i]);
    i++;
  }

  return res;
};

// 🔍 Example Test Cases
console.log(insert([[1,3],[6,9]], [2,5])); 
// ✅ Output: [[1,5],[6,9]]

console.log(insert([[1,2],[3,5],[6,7],[8,10],[12,16]], [4,8])); 
// ✅ Output: [[1,2],[3,10],[12,16]]









// Step-by-step:



// | Step | Current Interval | Action                                         | Result                 |
// | ---- | ---------------- | ---------------------------------------------- | ---------------------- |
// | 1    | [1,2]            | Ends before 4 → Add                            | [[1,2]]                |
// | 2    | [3,5]            | Overlaps → Merge → newInterval = [3,8]         | -                      |
// | 3    | [6,7]            | Overlaps → Merge → newInterval = [3,8]         | -                      |
// | 4    | [8,10]           | Overlaps → Merge → newInterval = [3,10]        | -                      |
// | 5    | [12,16]          | After merge → Add newInterval → [[1,2],[3,10]] | [[1,2],[3,10],[12,16]] |








// ✅ Final Answer: [[1,2],[3,10],[12,16]]