// LeetCode 207 — Course Schedule
// Problem Statement

// You are given:

//     numCourses → total number of courses labeled 0 to numCourses - 1

//     prerequisites → list of pairs [a, b] meaning:

//         To take course a, you must first take course b
//         (i.e., b → a is a dependency)

// Goal

// Return true if you can finish all courses
// Return false if there is a cycle in the graph.

// 🧠 Intuition

// This is a cycle detection problem in a directed graph.










// Two main approaches:

// | Algorithm                                     | Idea                                                            |
// | --------------------------------------------- | --------------------------------------------------------------- |
// | **BFS / Kahn’s Algorithm (Topological Sort)** | If we can visit all nodes without leftover cycles → return true |
// | **DFS cycle detection**                       | Track visited state to detect back edges                        |









// 🛠️ Approach 1 — BFS (Topological Sort)
// Steps:

// 1.Build graph adjacency list

// 2.Track indegree (number of prerequisites each course has)

// 3.Push all nodes with indegree 0 into a queue

// 4.Repeatedly remove from queue and reduce indegree of neighbors

// 5.Count processed courses

// 6.If processed equals total → no cycle





// ✅ JavaScript BFS Topological Sort Solution




/**
 * @param {number} numCourses
 * @param {number[][]} prerequisites
 * @return {boolean}
 */
var canFinish = function(numCourses, prerequisites) {
    const indegree = new Array(numCourses).fill(0);
    const graph = Array.from({ length: numCourses }, () => []);

    // Build graph & indegree
    for (let [course, prereq] of prerequisites) {
        graph[prereq].push(course);
        indegree[course]++;
    }

    // Collect courses with indegree 0
    const queue = [];
    for (let i = 0; i < numCourses; i++) {
        if (indegree[i] === 0) queue.push(i);
    }

    let completed = 0;

    while (queue.length > 0) {
        const current = queue.shift();
        completed++;

        for (let neighbor of graph[current]) {
            indegree[neighbor]--;
            if (indegree[neighbor] === 0) queue.push(neighbor);
        }
    }

    return completed === numCourses;
};

// 🧪 Example Tests
console.log(canFinish(2, [[1, 0]]));           // true (0 → 1)
console.log(canFinish(2, [[1, 0], [0, 1]]));   // false (cycle)








// 🛠️ Approach 2 — DFS Cycle Detection
// Key Idea:

// Use:

//     0 → unvisited

//     1 → visiting

//     2 → visited

// If DFS sees a 1 again → cycle detected













// ✅ JavaScript DFS Solution











var canFinish = function(numCourses, prerequisites) {
    const graph = Array.from({ length: numCourses }, () => []);
    const visited = new Array(numCourses).fill(0);

    for (let [a, b] of prerequisites) {
        graph[b].push(a);
    }

    const dfs = (course) => {
        if (visited[course] === 1) return false; // cycle
        if (visited[course] === 2) return true;  // already processed

        visited[course] = 1; // mark visiting

        for (let neighbor of graph[course]) {
            if (!dfs(neighbor)) return false;
        }

        visited[course] = 2; // mark done
        return true;
    };

    for (let c = 0; c < numCourses; c++) {
        if (!dfs(c)) return false;
    }

    return true;
};

// 🧪 example cases
console.log(canFinish(2, [[1,0]]));            // true
console.log(canFinish(2, [[1,0],[0,1]]));      // false
