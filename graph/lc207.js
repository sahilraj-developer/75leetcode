// Problem: Course Schedule (LC 207)







// Question:

// You are given numCourses courses labeled from 0 to numCourses - 1.
// You are also given an array prerequisites, where prerequisites[i] = [a, b] means you must take course b before course a.

// Return true if it is possible to finish all courses, otherwise return false.

// Example 1:



// Input: numCourses = 2, prerequisites = [[1,0]]
// Output: true




// Explanation:
// You can take course 0 first, then course 1.

// Example 2:


// Input: numCourses = 2, prerequisites = [[1,0],[0,1]]
// Output: false






// Explanation:
// There is a cycle (0 → 1 → 0).
// You cannot complete all courses.

// 💡 Intuition

//     We can think of this as a graph problem:

//     Each course is a node.

//     Each prerequisite [a, b] represents a directed edge b → a.


// We must check if the graph has a cycle:

// ✅ If no cycle, all courses can be finished.

// ❌ If cycle exists, it's impossible to complete all.










// ⚙️ Approach 1: BFS (Topological Sort using Kahn’s Algorithm)
// Steps:

// Create an adjacency list for all courses.

// Track in-degrees (number of prerequisites) for each course.

// Add all courses with in-degree = 0 to a queue (no prerequisites).

// Perform BFS:

// Remove a course from the queue.

// Reduce the in-degree of its neighbors.

// If any neighbor’s in-degree becomes 0, add it to the queue.

// If all courses are processed → return true, else false.

// 🧠 BFS Solution (with comments):













var canFinish = function(numCourses, prerequisites) {
    const adjList = new Map();  // adjacency list
    const inDegree = new Array(numCourses).fill(0);  // count prerequisites

    // Build graph
    for (const [course, prereq] of prerequisites) {
        if (!adjList.has(prereq)) adjList.set(prereq, []);
        adjList.get(prereq).push(course);
        inDegree[course]++;  // one more prereq for this course
    }

    const queue = [];
    // Add courses with no prerequisites
    for (let i = 0; i < numCourses; i++) {
        if (inDegree[i] === 0) queue.push(i);
    }

    let completed = 0;

    while (queue.length > 0) {
        const course = queue.shift();
        completed++;

        // Reduce in-degree of dependent courses
        if (adjList.has(course)) {
            for (const next of adjList.get(course)) {
                inDegree[next]--;
                if (inDegree[next] === 0) queue.push(next);
            }
        }
    }

    // If we completed all courses, return true
    return completed === numCourses;
};

// 🔹 Test Cases
console.log(canFinish(2, [[1,0]]));         // true
console.log(canFinish(2, [[1,0],[0,1]]));   // false
console.log(canFinish(4, [[1,0],[2,1],[3,2]])); // true









// 🧾 Dry Run Example


// Input:
// numCourses = 4
// prerequisites = [[1,0], [2,1], [3,2]]


// Graph representation:

// 0 → 1 → 2 → 3















// ⚙️ Approach 2: DFS (Cycle Detection)

// We can also detect cycles using DFS recursion:

// Use 3 states:

// 0: unvisited

// 1: visiting (in current DFS path)

// 2: visited (safe)

// If we reach a node that’s already in the visiting state → cycle exists.

// DFS Code:









var canFinish = function(numCourses, prerequisites) {
    const graph = new Map();
    for (let [a, b] of prerequisites) {
        if (!graph.has(b)) graph.set(b, []);
        graph.get(b).push(a);
    }

    const visited = new Array(numCourses).fill(0); // 0=unvisited, 1=visiting, 2=visited

    function dfs(course) {
        if (visited[course] === 1) return false; // cycle detected
        if (visited[course] === 2) return true;  // already checked safely

        visited[course] = 1; // mark as visiting

        if (graph.has(course)) {
            for (let next of graph.get(course)) {
                if (!dfs(next)) return false;
            }
        }

        visited[course] = 2; // mark as safe
        return true;
    }

    for (let i = 0; i < numCourses; i++) {
        if (!dfs(i)) return false;
    }

    return true;
};

// 🔹 Test Cases
console.log(canFinish(2, [[1,0]]));         // true
console.log(canFinish(2, [[1,0],[0,1]]));   // false














console.log(canFinish(2, [[1,0]]));          // true
console.log(canFinish(2, [[1,0],[0,1]]));    // false
console.log(canFinish(4, [[1,0],[2,1],[3,2]])); // true
