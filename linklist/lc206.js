Problem: Reverse Linked List (LC 206)


Question:

You are given the head of a singly linked list.
Reverse the list and return the new head.

Example
Input:  1 → 2 → 3 → 4 → 5 → null



Output:

5 → 4 → 3 → 2 → 1 → null






💡 Intuition

We reverse the direction of the next pointers one-by-one.

We maintain three pointers:


| Pointer | Meaning                                                     |
| ------- | ----------------------------------------------------------- |
| `prev`  | Points to the reversed list built so far                    |
| `curr`  | The node we are currently processing                        |
| `next`  | A temporary pointer to store `curr.next` before overwriting |





🔁 Process Visualization

Initial:


prev = null
curr = 1 → 2 → 3 → 4 → 5




Step-by-step:


| Step | Action                                       | Result                         |
| ---- | -------------------------------------------- | ------------------------------ |
| 1    | Save next (`2`) → Reverse `1` → Move forward | `1 → null`, prev=1, curr=2     |
| 2    | Save next (`3`) → Reverse `2` → Move forward | `2 → 1 → null`, prev=2, curr=3 |
| 3    | Reverse `3`                                  | `3 → 2 → 1 → null`             |
| 4    | Reverse `4`                                  | `4 → 3 → 2 → 1 → null`         |
| 5    | Reverse `5`                                  | `5 → 4 → 3 → 2 → 1 → null`     |





Final:


prev = 5 (new head)





/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */

/**
 * @param {ListNode} head
 * @return {ListNode}
 */
var reverseList = function(head) {
  let prev = null;
  let curr = head;

  while (curr !== null) {
    let next = curr.next; // Save next
    curr.next = prev;     // Reverse pointer
    prev = curr;          // Move prev forward
    curr = next;          // Move curr forward
  }

  return prev; // New head
};





🧠 Dry Run

Input list:

1 → 2 → 3 → null



| curr | prev | Action                 | Resulting Links    |
| ---- | ---- | ---------------------- | ------------------ |
| 1    | null | reverse → move forward | `1 → null`         |
| 2    | 1    | reverse → move forward | `2 → 1 → null`     |
| 3    | 2    | reverse → move forward | `3 → 2 → 1 → null` |
| null | 3    | end                    | return `3`         |





✅ Output:


3 → 2 → 1 → null




🧑‍💻 Optional Recursive Version




var reverseList = function(head) {
  if (!head || !head.next) return head;
  const newHead = reverseList(head.next);
  head.next.next = head;
  head.next = null;
  return newHead;
};
