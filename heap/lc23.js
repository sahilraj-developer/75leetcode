// Merge k Sorted Lists (LC 23)
// 🎯 Problem Statement

// You are given an array lists containing k linked lists, where each list is sorted in ascending order.
// Merge all these linked lists into one sorted list and return its head.

// 📍 Example
// Input:

// lists = [
//   1 -> 4 -> 5,
//   1 -> 3 -> 4,
//   2 -> 6
// ]





// Output:


// 1 -> 1 -> 2 -> 3 -> 4 -> 4 -> 5 -> 6








// 💡 Approaches


// | Approach                        | Time       | Space | Notes                       |
// | ------------------------------- | ---------- | ----- | --------------------------- |
// | **Brute Force**                 | O(N log N) | O(N)  | Collect all values and sort |
// | **Merge K lists pairwise**      | O(kN)      | O(1)  | Merge 2 at a time           |
// | **Min Heap (Priority Queue)** ⭐ | O(N log k) | O(k)  | Best approach               |
// | **Divide & Conquer**            | O(N log k) | O(1)  | Like merge sort             |




// 🚀 Best Approach — Priority Queue / Min Heap








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
    if (!lists || lists.length === 0) return null;

    // Min-heap using priority queue
    const minHeap = new MinPriorityQueue({ compare: (a, b) => a.val - b.val });

    // Add first node of each list to heap
    for (let node of lists) {
        if (node) minHeap.enqueue(node);
    }

    // Dummy node to build final result
    const dummy = new ListNode(0);
    let current = dummy;

    // Extract smallest and push its next
    while (minHeap.size() > 0) {
        const smallest = minHeap.dequeue();
        current.next = smallest;
        current = current.next;

        if (smallest.next) {
            minHeap.enqueue(smallest.next);
        }
    }

    return dummy.next;
};







// NOTE: MinPriorityQueue comes from @datastructures-js/priority-queue or built-in DS in LeetCode environment.









// 🧠 Dry Run Example
// Input:


// lists:
// 1->4->5
// 1->3->4
// 2->6







// Step-by-step:


// | Heap    | Remove | Result List | Push Next |
// | ------- | ------ | ----------- | --------- |
// | [1,1,2] | 1      | 1           | 4         |
// | [1,2,4] | 1      | 1→1         | 3         |
// | [2,4,3] | 2      | 1→1→2       | 6         |
// | [3,4,6] | 3      | 1→1→2→3     | 4         |
// | [4,4,6] | 4      | 1→1→2→3→4   | 5         |
// | [4,6,5] | 4      | ...         | —         |
// | [5,6]   | 5      | ...         | —         |
// | [6]     | 6      | ...         | —         |








// ✅ Final output


// 1→1→2→3→4→4→5→6









// ✨ Alternate Approach — Divide & Conquer

// Merge lists two at a time like merge sort → reduces to O(N log k) without heap









var mergeKLists = function(lists) {
    if (!lists || lists.length === 0) return null;

    while (lists.length > 1) {
        let merged = [];

        for (let i = 0; i < lists.length; i += 2) {
            merged.push(mergeTwoLists(lists[i], lists[i + 1] || null));
        }

        lists = merged;
    }

    return lists[0];
};

function mergeTwoLists(l1, l2) {
    const dummy = new ListNode();
    let tail = dummy;

    while (l1 && l2) {
        if (l1.val < l2.val) {
            tail.next = l1;
            l1 = l1.next;
        } else {
            tail.next = l2;
            l2 = l2.next;
        }
        tail = tail.next;
    }

    tail.next = l1 || l2;
    return dummy.next;
}
