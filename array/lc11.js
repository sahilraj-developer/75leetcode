// Container With Most Water (LC 11)



// 📘 Problem Statement

// You are given an integer array height of length n. There are n vertical lines drawn such that the two endpoints of the i-th line are at (i, 0) and (i, height[i]).

// Find two lines that together with the x-axis form a container, such that the container contains the most water.

// Return the maximum amount of water a container can store.



// Input: height = [1,8,6,2,5,4,8,3,7]
// Output: 49




// Explanation:
// The lines at indices 1 and 8 (heights 8 and 7) form a container with width 7 and height 7 → area = 7 * 7 = 49.





// 🔑 Key Idea

// The area formed between two lines =
// width * min(height[left], height[right])
// where width = right - left.

// To maximize area:

// Start with widest container (left=0, right=n-1).

// Move the pointer at the smaller height inward, because the limiting factor is the shorter line.

// Keep track of max area.

// This is the two-pointer greedy approach.






var maxArea = function(height) {
    let left = 0;
    let right = height.length - 1;
    let maxArea = 0;

    while (left < right) {
        // Calculate area between left and right
        let width = right - left;
        let h = Math.min(height[left], height[right]);
        let area = width * h;

        // Update maximum
        maxArea = Math.max(maxArea, area);

        // Move pointer of smaller height inward
        if (height[left] < height[right]) {
            left++;
        } else {
            right--;
        }
    }

    return maxArea;
};






console.log(maxArea([1,8,6,2,5,4,8,3,7])); 
// Output: 49

console.log(maxArea([1,1])); 
// Output: 1









// 📝 Explanation (Step by Step)

// 1.Initialize two pointers:

// left = 0, right = n-1

// This gives the widest possible container initially.

// 2.Compute area:

// area = (right - left) * min(height[left], height[right])




// 3.Compare with current maxArea and update if larger.

// 4.Move pointer:

// If height[left] < height[right], increment left → maybe find taller line.

// Else, decrement right.

// 5.Repeat until left >= right.







// Example Dry Run

// Input: [1,8,6,2,5,4,8,3,7]

// Start: left=0, right=8 → area = 8 * min(1,7) = 8

// Move left → left=1, right=8 → area = 7 * min(8,7) = 49 ✅

// Move right → left=1, right=7 → area = 6 * min(8,3) = 18

// … continue until pointers meet.

// Max area found = 49.






// ⏱ Complexity

// Time: O(n) (one pass with two pointers)

// Space: O(1)