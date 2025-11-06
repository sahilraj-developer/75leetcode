// Problem: Meeting Rooms (LC 252)



// You are given an array of meeting time intervals intervals, where each interval is [start, end].

// Return true if a person can attend all meetings (no meeting times overlap).
// Return false if any two meetings overlap.




// ✅ Example 1


// Input: intervals = [[0,30],[5,10],[15,20]]
// Output: false



// Explanation:
// Meeting [0,30] overlaps with [5,10].
// So it's not possible to attend all.





// ✅ Example 2


// Input: intervals = [[7,10],[2,4]]
// Output: true




// Explanation:
// These two do not overlap → can attend all.






// 💡 Intuition

// To detect overlaps, we only need to check adjacent intervals if they are sorted.

// Steps:

// 1.Sort intervals by start time.

// 2.Compare each interval's start with the previous interval's end.

// 3.If any start < previous_end → Overlap → return false.

// 4.Otherwise → return true.







/**
 * @param {number[][]} intervals
 * @return {boolean}
 */
var canAttendMeetings = function(intervals) {
  if (intervals.length <= 1) return true;

  // 1️⃣ Sort intervals by start time
  intervals.sort((a, b) => a[0] - b[0]);

  // 2️⃣ Check for overlaps
  for (let i = 1; i < intervals.length; i++) {
    const [prevStart, prevEnd] = intervals[i - 1];
    const [currStart] = intervals[i];

    // If current meeting starts before previous meeting ends → overlap
    if (currStart < prevEnd) {
      return false;
    }
  }

  return true;
};

// 🧪 Example tests
console.log(canAttendMeetings([[0,30],[5,10],[15,20]])); // false
console.log(canAttendMeetings([[7,10],[2,4]]));          // true
console.log(canAttendMeetings([[1,2],[2,3],[3,4]]));     // true
