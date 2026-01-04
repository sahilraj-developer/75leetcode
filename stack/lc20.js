


// Valid Parentheses (LC 20)
// 📌 Problem Statement

// Given a string s containing just the characters:


// '(', ')', '{', '}', '[', ']'





// Determine if the input string is valid.

// A string is valid if:

// Open brackets must be closed by the same type of brackets

// Open brackets must be closed in the correct order

// Every closing bracket has a corresponding opening bracket




// 🔥 Examples
// Example 1


// Input: s = "()"
// Output: true



// Example 2


// Input: s = "()[]{}"
// Output: true







// 💡 Intuition

// This is a stack problem.

// Why Stack?

//     Parentheses must close in LIFO (Last In, First Out) order

//     The most recent opening bracket must be closed first

// Strategy:

//     Push opening brackets onto stack

//     For closing brackets:

//         Stack must not be empty

//         Top of stack must match the closing type

//     At the end, stack should be empty














// 🧠 Approach (Step-by-Step)

// 1.Create an empty stack

// 2.Create a map of closing → opening brackets

// 3.Traverse the string:

//     If opening bracket → push to stack

//     If closing bracket:

//         If stack empty → ❌ invalid

//         Pop stack and check if it matches

// 4.After traversal:

//     Stack empty → ✅ valid

//     Else → ❌ invalid






// ✅ JavaScript Solution (Clean + Commented)



/**
 * @param {string} s
 * @return {boolean}
 */
var isValid = function(s) {
    const stack = [];
    const map = {
        ')': '(',
        '}': '{',
        ']': '['
    };

    for (let char of s) {
        // If opening bracket → push
        if (char === '(' || char === '{' || char === '[') {
            stack.push(char);
        } 
        // If closing bracket
        else {
            if (stack.length === 0) return false;

            const top = stack.pop();
            if (top !== map[char]) return false;
        }
    }

    // Stack must be empty at the end
    return stack.length === 0;
};

// 🧪 Test Cases
console.log(isValid("()"));        // true
console.log(isValid("()[]{}"));    // true
console.log(isValid("(]"));        // false
console.log(isValid("([)]"));      // false
console.log(isValid("{[]}"));      // true
