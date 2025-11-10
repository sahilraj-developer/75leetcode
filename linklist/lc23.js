// Problem: Merge k Sorted Lists (LC 23)



// Question:

// Given an array of k sorted linked list heads, merge them into one sorted linked list and return the head.

// ✅ Example

// Input:

// [
//   1 → 4 → 5,
//   1 → 3 → 4,
//   2 → 6
// ]


// Output:

// 1 → 1 → 2 → 3 → 4 → 4 → 5 → 6




// 💡 Intuition

// Since all lists are sorted, we always want to pick the smallest head across all the lists.

// We use a Min-Heap (Priority Queue) to efficiently pull the smallest node each time.

// Steps:

// 1.Initialize a min-heap.

// 2.Push the head of each non-empty list into the heap.

// 3.Pop the smallest node from the heap and attach it to the result list.

// 4.If that node has a next, push next into the heap.

// 5.Continue until heap is empty.












/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */

/**
 * @param {ListNode[]} lists
 * @return {ListNode}
 */
var mergeKLists = function(lists) {
  // Min Heap (by list node value)
  const heap = new MinPriorityQueue({ priority: (node) => node.val });

  // Add head of each list to heap
  for (const node of lists) {
    if (node !== null) heap.enqueue(node);
  }

  const dummy = new ListNode(-1);
  let tail = dummy;

  // Extract smallest, then push its next
  while (!heap.isEmpty()) {
    const smallest = heap.dequeue().element;
    tail.next = smallest;
    tail = tail.next;

    if (smallest.next !== null) {
      heap.enqueue(smallest.next);
    }
  }

  return dummy.next;
};




🧠 Dry Run Example

Input:


lists = [[1,4,5], [1,3,4], [2,6]]



Heap initial:

[1, 1, 2]




| Step | Pop Min   | Add to Result     | Push Next | Heap After |
| ---- | --------- | ----------------- | --------- | ---------- |
| 1    | 1 (list1) | 1                 | push 4    | [1,2,4]    |
| 2    | 1 (list2) | 1 → 1             | push 3    | [2,3,4]    |
| 3    | 2         | 1 → 1 → 2         | push 6    | [3,4,6]    |
| 4    | 3         | 1 → 1 → 2 → 3     | push 4    | [4,4,6]    |
| 5    | 4         | 1 → 1 → 2 → 3 → 4 | push 5    | [4,5,6]    |
| 6    | 4         | ... → 4           | (no next) | [5,6]      |
| 7    | 5         | ... → 5           | (no next) | [6]        |
| 8    | 6         | ... → 6           | (no next) | []         |



✅ Final:

1 → 1 → 2 → 3 → 4 → 4 → 5 → 6
