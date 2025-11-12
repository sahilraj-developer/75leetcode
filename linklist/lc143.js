// Problem: Reorder List (LC 143)





// Question:

// You are given the head of a singly linked list:
// L0 → L1 → L2 → ... → Ln-1 → Ln

// Reorder it to:
// L0 → Ln → L1 → Ln-1 → L2 → Ln-2 → ...

// You must do it in-place without altering the node values (only change pointers).



// ✅ Example 1


// Input: head = [1,2,3,4]
// Output: [1,4,2,3]



// Explanation:


// 1 → 2 → 3 → 4
// ↓
// 1 → 4 → 2 → 3




// ✅ Example 2



// Input: head = [1,2,3,4,5]
// Output: [1,5,2,4,3]




// Explanation:


// 1 → 2 → 3 → 4 → 5
// ↓
// 1 → 5 → 2 → 4 → 3







// 💡 Intuition

// We can break this into 3 steps:

// 1.Find the middle of the linked list
// (using slow and fast pointers)

// 2.Reverse the second half of the list

// 3.Merge the two halves alternately (L0 → Ln → L1 → Ln-1 ...)






// 🧭 Step-by-Step Approach
// Step 1️⃣ – Find Middle

//     Use slow and fast pointers to locate the midpoint:

//         Move fast by 2 steps and slow by 1.

//         When fast reaches the end, slow will be in the middle.

// Step 2️⃣ – Reverse Second Half

//     Reverse the second half in-place starting from slow.next.

// Step 3️⃣ – Merge Both Lists

//     Alternate nodes between first half and reversed second half.





/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */

/**
 * @param {ListNode} head
 * @return {void} Do not return anything, modify head in-place instead.
 */
var reorderList = function(head) {
    if (!head || !head.next) return;

    // 1️⃣ Find the middle of the list
    let slow = head, fast = head;
    while (fast && fast.next) {
        slow = slow.next;
        fast = fast.next.next;
    }

    // 2️⃣ Reverse the second half
    let prev = null, curr = slow.next;
    slow.next = null; // Split the list into two halves
    while (curr) {
        let nextTemp = curr.next;
        curr.next = prev;
        prev = curr;
        curr = nextTemp;
    }

    // 3️⃣ Merge both halves
    let first = head, second = prev;
    while (second) {
        let tmp1 = first.next;
        let tmp2 = second.next;

        first.next = second;
        second.next = tmp1;

        first = tmp1;
        second = tmp2;
    }
};

// 🧪 Example Test
function ListNode(val, next) {
    this.val = val;
    this.next = next || null;
}

function printList(head) {
    let res = [];
    while (head) {
        res.push(head.val);
        head = head.next;
    }
    console.log(res);
}

// Create linked list: [1,2,3,4,5]
const head = new ListNode(1, new ListNode(2, new ListNode(3, new ListNode(4, new ListNode(5)))));
reorderList(head); // In-place modification
printList(head);   // Output: [1,5,2,4,3]









// 🧮 Dry Run Example

// Input: [1,2,3,4,5]

// Step 1: Find middle


// slow → 3
// fast → null




// Split into:


// First: 1 → 2 → 3
// Second: 4 → 5



// Step 2: Reverse second half



// Reversed second: 5 → 4




// Step 3: Merge


// 1 → 5 → 2 → 4 → 3




// ✅ Output: [1,5,2,4,3]