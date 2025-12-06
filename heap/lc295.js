// Find Median from Data Stream (LC 295)

// Complete with problem explanation, intuition, approach, dry run, and full JavaScript implementation using 2 Heaps (the optimal approach used in real interview solutions).

// 📌 Problem Statement

// Design a data structure that:

// Adds numbers from a data stream using addNum(num)

// Finds the median using findMedian()

// Example




// Input:
// ["MedianFinder", "addNum", "addNum", "findMedian", "addNum", "findMedian"]
// [[], [1], [2], [], [3], []]

// Output:
// [null, null, null, 1.5, null, 2.0]






// 💡 Intuition

// Median relies on ordering data, but sorting the whole array on every insert is expensive.

// ❌ Brute Force

// Store all numbers → sort each time
// Time: O(n log n) per insertion → too slow












// ✅ Optimal Solution — Two Heaps

// Use two priority queues/heaps:




// | Heap         | Stores                  | Behavior                       |
// | ------------ | ----------------------- | ------------------------------ |
// | **Max Heap** | smaller half of numbers | root = largest in smaller half |
// | **Min Heap** | larger half of numbers  | root = smallest in larger half |





// Goal: keep heaps balanced (sizes differ by ≤ 1)

// Median is:

//     If sizes equal → average of both heap roots

//     Else → root of bigger heap











// 🧠 Approach Steps
// addNum(num)

// 1.Add to maxHeap

// 2.Move maxHeap top to minHeap (to maintain order)

// 3.If size imbalance > 1 → move minHeap top back to maxHeap

// findMedian()

//     If heaps same size → (maxHeap.top + minHeap.top) / 2

//     Else return root of larger heap










// 🧪 Dry Run Example



// Stream: [1,2,3]

// Insert 1:
// maxHeap = [1]
// minHeap = []
// Median = 1

// Insert 2:
// maxHeap = [1]
// minHeap = [2]
// Median = (1+2)/2 = 1.5

// Insert 3:
// maxHeap = [2,1]
// minHeap = [3]
// Median = 2















class MaxHeap {
  constructor() { this.heap = []; }
  push(val) { this.heap.push(val); this._bubbleUp(); }
  pop() { const top = this.heap[0]; const end = this.heap.pop(); if (this.heap.length) { this.heap[0] = end; this._sinkDown(); } return top; }
  peek() { return this.heap[0]; }
  size() { return this.heap.length; }
  _bubbleUp() {
    let idx = this.heap.length - 1;
    while (idx > 0) {
      let parent = Math.floor((idx - 1) / 2);
      if (this.heap[parent] >= this.heap[idx]) break;
      [this.heap[parent], this.heap[idx]] = [this.heap[idx], this.heap[parent]];
      idx = parent;
    }
  }
  _sinkDown() {
    let idx = 0;
    const length = this.heap.length;
    while (true) {
      let left = 2 * idx + 1, right = 2 * idx + 2;
      let swap = null;
      if (left < length && this.heap[left] > this.heap[idx]) swap = left;
      if (right < length && this.heap[right] > (swap === null ? this.heap[idx] : this.heap[left])) swap = right;
      if (swap === null) break;
      [this.heap[idx], this.heap[swap]] = [this.heap[swap], this.heap[idx]];
      idx = swap;
    }
  }
}

class MinHeap {
  constructor() { this.heap = []; }
  push(val) { this.heap.push(val); this._bubbleUp(); }
  pop() { const top = this.heap[0]; const end = this.heap.pop(); if (this.heap.length) { this.heap[0] = end; this._sinkDown(); } return top; }
  peek() { return this.heap[0]; }
  size() { return this.heap.length; }
  _bubbleUp() {
    let idx = this.heap.length - 1;
    while (idx > 0) {
      let parent = Math.floor((idx - 1) / 2);
      if (this.heap[parent] <= this.heap[idx]) break;
      [this.heap[parent], this.heap[idx]] = [this.heap[idx], this.heap[parent]];
      idx = parent;
    }
  }
  _sinkDown() {
    let idx = 0;
    const length = this.heap.length;
    while (true) {
      let left = 2 * idx + 1, right = 2 * idx + 2;
      let swap = null;
      if (left < length && this.heap[left] < this.heap[idx]) swap = left;
      if (right < length && this.heap[right] < (swap === null ? this.heap[idx] : this.heap[left])) swap = right;
      if (swap === null) break;
      [this.heap[idx], this.heap[swap]] = [this.heap[swap], this.heap[idx]];
      idx = swap;
    }
  }
}

var MedianFinder = function() {
  this.maxHeap = new MaxHeap(); // smaller half
  this.minHeap = new MinHeap(); // larger half
};

MedianFinder.prototype.addNum = function(num) {
  this.maxHeap.push(num);
  this.minHeap.push(this.maxHeap.pop());

  if (this.minHeap.size() > this.maxHeap.size()) {
    this.maxHeap.push(this.minHeap.pop());
  }
};

MedianFinder.prototype.findMedian = function() {
  if (this.maxHeap.size() > this.minHeap.size()) return this.maxHeap.peek();
  return (this.maxHeap.peek() + this.minHeap.peek()) / 2;
};

// Example Usage
const mf = new MedianFinder();
mf.addNum(1);
mf.addNum(2);
console.log(mf.findMedian()); // 1.5
mf.addNum(3);
console.log(mf.findMedian()); // 2
