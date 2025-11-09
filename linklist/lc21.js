// Problem: Merge Two Sorted Lists (LC 21)



// Question:

// Given the heads of two sorted linked lists list1 and list2,
// merge them into one sorted list, and return its head.

// ✅ Example

// Input:


// list1: 1 → 2 → 4
// list2: 1 → 3 → 4



// Output:


// 1 → 1 → 2 → 3 → 4 → 4








// 💡 Intuition

// We use two pointers to walk through both lists.
// At each step, choose the smaller node and append it to the merged list.

// Use a dummy head to simplify list building.

// 🧠 Pointer Logic

// We maintain:


// | Pointer | Meaning                        |
// | ------- | ------------------------------ |
// | `p1`    | current node in list1          |
// | `p2`    | current node in list2          |
// | `tail`  | last added node in merged list |



// We compare p1.val and p2.val → attach the smaller one → move pointer.



// 🔁 Diagram Dry Run



// list1: 1 → 2 → 4
// list2: 1 → 3 → 4





// | Step | Compare                   | Pick | New List (tail grows) | Move      |
// | ---- | ------------------------- | ---- | --------------------- | --------- |
// | 1    | 1 vs 1                    | 1    | 1                     | p2 → 3    |
// | 2    | 1 vs 3                    | 1    | 1 → 1                 | p1 → 2    |
// | 3    | 2 vs 3                    | 2    | 1 → 1 → 2             | p1 → 4    |
// | 4    | 4 vs 3                    | 3    | 1 → 1 → 2 → 3         | p2 → 4    |
// | 5    | 4 vs 4                    | 4    | 1 → 1 → 2 → 3 → 4     | p2 → null |
// | 6    | Append leftover list1 (4) |      | 1 → 1 → 2 → 3 → 4 → 4 |           |





/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */

/**
 * @param {ListNode} list1
 * @param {ListNode} list2
 * @return {ListNode}
 */
var mergeTwoLists = function(list1, list2) {
  const dummy = new ListNode(-1);
  let tail = dummy;

  let p1 = list1;
  let p2 = list2;

  while (p1 !== null && p2 !== null) {
    if (p1.val <= p2.val) {
      tail.next = p1;
      p1 = p1.next;
    } else {
      tail.next = p2;
      p2 = p2.next;
    }
    tail = tail.next;
  }

  // Attach leftover part
  tail.next = p1 !== null ? p1 : p2;

  return dummy.next;
};





// 🧑‍💻 Optional Recursive Version



var mergeTwoLists = function(list1, list2) {
  if (!list1) return list2;
  if (!list2) return list1;

  if (list1.val <= list2.val) {
    list1.next = mergeTwoLists(list1.next, list2);
    return list1;
  } else {
    list2.next = mergeTwoLists(list1, list2.next);
    return list2;
  }
};




// ⏱️ Complexity




// | Complexity        | Value                                   |
// | ----------------- | --------------------------------------- |
// | Time              | **O(n + m)** (each list traversed once) |
// | Space (Iterative) | **O(1)**                                |
// | Space (Recursive) | **O(n + m)** stack space                |
