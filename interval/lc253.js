// Problem: Meeting Rooms II



// You are given an array intervals, where each interval is [start, end].

// You need to return the minimum number of meeting rooms required so that no meetings overlap in the same room.

// ✅ Example 1




// Input: intervals = [[0,30],[5,10],[15,20]]
// Output: 2




// Explanation:

// Meeting [0,30] overlaps with [5,10], so we need 2 rooms.

// Meeting [15,20] starts after [5,10] ends, so that fits in an existing room → still 2 rooms total.





// ✅ Example 2


// Input: intervals = [[7,10],[2,4]]
// Output: 1





// No overlaps → only 1 room required.

// 💡 Idea

// Instead of tracking rooms one by one, track start times and end times separately:

// 1.Extract all start times and all end times.

// 2.Sort them.

// 3.Use two pointers:

//     Iterate through start times.

//     If the start time is before the earliest end time → need another room.

//     Else → a room is freed ⇒ move end pointer (reuse the room).

// This is a clean sweep line algorithm, like processing events in time order.












/**
 * @param {number[][]} intervals
 * @return {number}
 */
var minMeetingRooms = function(intervals) {
  if (intervals.length === 0) return 0;

  // Separate start and end times
  const starts = intervals.map(i => i[0]).sort((a, b) => a - b);
  const ends = intervals.map(i => i[1]).sort((a, b) => a - b);

  let rooms = 0;
  let endPtr = 0;

  // Iterate through start times
  for (let i = 0; i < starts.length; i++) {
    if (starts[i] < ends[endPtr]) {
      // Need a new room
      rooms++;
    } else {
      // Meeting finished — reuse room
      endPtr++;
    }
  }

  return rooms;
};

// 🧪 Tests
console.log(minMeetingRooms([[0,30],[5,10],[15,20]])); // 2
console.log(minMeetingRooms([[7,10],[2,4]]));          // 1
console.log(minMeetingRooms([[1,5],[2,6],[4,8],[10,12]])); // 3





// 🧠 Dry Run (Main Example)
// Input:

// [[0,30], [5,10], [15,20]]



// Step 1: Extract and Sort

// starts = [0, 5, 15]
// ends   = [10, 20, 30]




// | Start | Earliest End | Compare  | Action                  | Rooms | endPtr |
// | ----- | ------------ | -------- | ----------------------- | ----- | ------ |
// | 0     | 10           | 0 < 10   | Need room               | 1     | 0      |
// | 5     | 10           | 5 < 10   | Need room               | 2     | 0      |
// | 15    | 10           | 15 >= 10 | End meeting, reuse room | 2     | 1      |



// ✅ Minimum Rooms = 2