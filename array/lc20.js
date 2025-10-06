// Valid Parentheses (LC 20)  





// 🔹 Problem

// Given a string s containing just the characters '(', ')', '{', '}', '[', and ']',
// determine if the input string is valid.

// A string is valid if:

// Open brackets are closed by the same type of brackets.

// Open brackets are closed in the correct order.






// ✅ Example 1


// Input: s = "()"
// Output: true



// ✅ Example 2


// Input: s = "()[]{}"
// Output: true



// ✅ Example 3




// Input: s = "(]"
// Output: false


// ✅ Example 4

// Input: s = "([)]"
// Output: false




// ✅ Example 5



// Input: s = "{[]}"
// Output: true







// 💡 Approach — Using a Stack

// We use a stack because it follows LIFO (Last In, First Out) —
// which matches the way parentheses must close in reverse order of opening.

// 🔸 Steps:

// 1.Initialize an empty stack.

// 2.Traverse the string:

// If you encounter an opening bracket '(', '{', '[' → push it onto the stack.

// If you encounter a closing bracket ')', '}', ']' →
// check if the top of the stack has the matching opening bracket.

// If yes → pop it from the stack.

// If not → return false.

// 3.After the loop, the string is valid only if the stack is empty.













var isValid = function(s) {
    const stack = [];
    const map = {
        ')': '(',
        ']': '[',
        '}': '{'
    };

    console.log("Processing string:", s);

    for (let char of s) {
        console.log(`\nCharacter: '${char}'`);
        
        if (char === '(' || char === '{' || char === '[') {
            stack.push(char);
            console.log("Stack after push:", stack);
        } 
        else {
            // Closing bracket encountered
            const top = stack.pop();
            console.log(`Popped: '${top}', Expected: '${map[char]}'`);
            
            if (top !== map[char]) {
                console.log("❌ Invalid pair found!");
                return false;
            }
        }
    }

    const result = stack.length === 0;
    console.log("\n✅ Final Stack:", stack);
    console.log("Is Valid?:", result);

    return result;
};

// 🔹 Test Cases
console.log("\nExample 1:");
isValid("()");

console.log("\nExample 2:");
isValid("()[]{}");

console.log("\nExample 3:");
isValid("(]");

console.log("\nExample 4:");
isValid("([)]");

console.log("\nExample 5:");
isValid("{[]}");

console.log("\nEdge Case 1: Empty String");
isValid("");

console.log("\nEdge Case 2: Single Character");
isValid("(");















// 🧠 Step-by-Step Example (Dry Run)
// Example: s = "{[]}"
// Step	Char	Stack Before	Action	Stack After
// 1	{	[]	Push	[{]
// 2	[	[{]	Push	[{, []
// 3	]	[{, []	Pop [	[{]
// 4	}	[{]	Pop {	[]




//     ✅ Final Stack Empty → Valid!











//     ⚙️ Time and Space Complexity
// Complexity	Explanation
// Time: O(n)	We iterate through the string once.
// Space: O(n)	In worst case (all opens), we store all characters in the stack.