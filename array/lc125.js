// Valid Palindrome (LeetCode 125)




// 🔹 Problem

// A phrase is a palindrome if, after converting all uppercase letters into lowercase
// and removing all non-alphanumeric characters, it reads the same forward and backward.

// Return true if it is a palindrome, or false otherwise.




// ✅ Example 1:

// Input: s = "A man, a plan, a canal: Panama"
// Output: true

// Explanation: "amanaplanacanalpanama" is a palindrome.





// ✅ Example 2:


// Input: s = "race a car"
// Output: false

// Explanation: "raceacar" is not a palindrome.





// ✅ Example 3:


// Input: s = " "
// Output: true

// Explanation: Empty string after cleaning is a palindrome.








// 💡 Approach — Two Pointer Technique
// 🔸 Idea:

// 1.Clean the string:

//    Remove all non-alphanumeric characters (only keep a-z, A-Z, 0-9).

//    Convert everything to lowercase.

// 2.Use two pointers:

//    Start one from the beginning (left) and one from the end (right).

//    Move inward while comparing characters.

//    If any mismatch → return false.

// 3.If all match → return true.











var isPalindrome = function(s) {
    console.log("Original String:", s);

    // Step 1: Clean the string (remove non-alphanumeric & lowercase)
    let cleaned = s.replace(/[^a-zA-Z0-9]/g, '').toLowerCase();
    console.log("Cleaned String:", cleaned);

    // Step 2: Two-pointer check
    let left = 0;
    let right = cleaned.length - 1;

    while (left < right) {
        console.log(`Comparing: '${cleaned[left]}' and '${cleaned[right]}'`);

        if (cleaned[left] !== cleaned[right]) {
            console.log("❌ Mismatch found!");
            return false;
        }

        left++;
        right--;
    }

    console.log("✅ Palindrome confirmed!");
    return true;
};

// 🔹 Test Cases
console.log("\nExample 1:");
isPalindrome("A man, a plan, a canal: Panama");

console.log("\nExample 2:");
isPalindrome("race a car");

console.log("\nExample 3:");
isPalindrome(" ");

console.log("\nEdge Case 1: Numeric Palindrome");
isPalindrome("12321");

console.log("\nEdge Case 2: Mixed Case Palindrome");
isPalindrome("Noon");

console.log("\nEdge Case 3: With Symbols");
isPalindrome("Was it a car or a cat I saw?");









// 🧠 Step-by-Step Example
// Example: "A man, a plan, a canal: Panama"
// Step	Action	Result
// 1	Clean non-alphanumeric	"amanaplanacanalpanama"
// 2	Compare first and last	'a' == 'a' ✅
// 3	Move inward	'm' == 'm' ✅
// 4	Continue...	All pairs match ✅

// ✅	End	Returns true








// ⚙️ Time and Space Complexity
// Complexity	Explanation
// Time: O(n)	Single pass through string (clean + two-pointer)
// Space: O(n)	Cleaned string stored separately