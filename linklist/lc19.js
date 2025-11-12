// Problem: Remove Nth Node From End of List (LC 19)



// Question:

// Given the head of a linked list, remove the n-th node from the end of the list and return its head.

// ✅ Example 1



// Input: head = [1,2,3,4,5], n = 2
// Output: [1,2,3,5]



// Explanation:
// The 2nd node from the end is 4, so we remove it.




// ✅ Example 2


// Input: head = [1], n = 1
// Output: []



// Explanation:
// Removing the only node leaves an empty list.



// ✅ Example 3



// Input: head = [1,2], n = 1
// Output: [1]






// 💡 Intuition

// We need to remove the n-th node from the end, not from the start.

// The clever way:
// 👉 Use two pointers (fast and slow) so you can find the target node in one pass.




// ⚙️ Approach (Two-Pointer Technique)

// 1.Create a dummy node before head (helps handle edge cases like removing the first node).

// 2.Move fast pointer n+1 steps ahead — this ensures the gap between fast and slow is n.

// 3.Move both pointers one step at a time until fast reaches the end.

// 4.Now slow is right before the node to delete.

// 5.Skip that node by doing:


// slow.next = slow.next.next


// 6.Return dummy.next as the new head.








/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */

/**
 * @param {ListNode} head
 * @param {number} n
 * @return {ListNode}
 */
var removeNthFromEnd = function(head, n) {
    const dummy = new ListNode(0, head); // helps in edge cases
    let fast = dummy;
    let slow = dummy;

    // 1️⃣ Move fast pointer n+1 steps ahead
    for (let i = 0; i <= n; i++) {
        fast = fast.next;
    }

    // 2️⃣ Move both fast and slow pointers
    while (fast) {
        fast = fast.next;
        slow = slow.next;
    }

    // 3️⃣ Delete target node
    slow.next = slow.next.next;

    // 4️⃣ Return new head
    return dummy.next;
};

// 🧪 Example Tests
function ListNode(val, next) {
    this.val = val;
    this.next = next || null;
}
const head = new ListNode(1, new ListNode(2, new ListNode(3, new ListNode(4, new ListNode(5)))));
console.log(removeNthFromEnd(head, 2)); // Output: [1,2,3,5]







// 🧠 Dry Run Example
// Input:



// head = [1,2,3,4,5], n = 2



// | Step                    | fast pointer | slow pointer | Action  |
// | ----------------------- | ------------ | ------------ | ------- |
// | Initial                 | dummy        | dummy        | —       |
// | Move fast (n+1=3 steps) | at node 3    | dummy        | gap = 2 |
// | Move both → 1 step      | 4            | 1            | —       |
// | Move both → 2nd step    | 5            | 2            | —       |
// | Move both → 3rd step    | null         | 3            | —       |





// Now slow.next is the target (4).
// Remove node 4 → connect 3.next to 5.

// ✅ Final list → [1,2,3,5].