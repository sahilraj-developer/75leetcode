Encode and Decode Strings



Question:

Design an algorithm to encode a list of strings into a single string.
Then decode that single string back into the original list.

You need to ensure that:

The encoded string is compact and unambiguous (you can always decode correctly).

You can handle empty strings and special characters like #, /, etc.





🧩 Example 1


Input: ["lint", "code", "love", "you"]
Output (encoded): "4#lint4#code4#love3#you"
After decoding: ["lint", "code", "love", "you"]




🧩 Example 2



Input: ["we", "say", ":", "yes!"]
Output (encoded): "2#we3#say1#:4#yes!"
After decoding: ["we", "say", ":", "yes!"]





Example:


["lint", "code"]  →  "4#lint4#code"



While decoding, we:

Read the number before # → gives the length of the next word.

Then take that many characters after #.

Repeat until the string ends.

✅ This ensures we can correctly separate even if words contain # or spaces.















/**
 * Encodes a list of strings to a single string.
 * @param {string[]} strs
 * @return {string}
 */
var encode = function(strs) {
    let encoded = '';
    for (let s of strs) {
        // Add "length#string" format
        encoded += s.length + '#' + s;
    }
    return encoded;
};

/**
 * Decodes a single string to a list of strings.
 * @param {string} s
 * @return {string[]}
 */
var decode = function(s) {
    let res = [];
    let i = 0;

    while (i < s.length) {
        // Step 1: Find the position of '#'
        let j = i;
        while (s[j] !== '#') {
            j++;
        }

        // Step 2: Extract the length of the word
        let length = parseInt(s.slice(i, j));

        // Step 3: Extract the actual word
        let word = s.slice(j + 1, j + 1 + length);
        res.push(word);

        // Step 4: Move i to the next word
        i = j + 1 + length;
    }

    return res;
};

// 🧪 Test Cases
const input1 = ["lint", "code", "love", "you"];
const encoded1 = encode(input1);
const decoded1 = decode(encoded1);
console.log("Input:", input1);
console.log("Encoded:", encoded1);
console.log("Decoded:", decoded1);

const input2 = ["we", "say", ":", "yes!"];
const encoded2 = encode(input2);
const decoded2 = decode(encoded2);
console.log("\nInput:", input2);
console.log("Encoded:", encoded2);
console.log("Decoded:", decoded2);






Input: [ 'lint', 'code', 'love', 'you' ]
Encoded: 4#lint4#code4#love3#you
Decoded: [ 'lint', 'code', 'love', 'you' ]

Input: [ 'we', 'say', ':', 'yes!' ]
Encoded: 2#we3#say1#:4#yes!
Decoded: [ 'we', 'say', ':', 'yes!' ]











🕒 Time & Space Complexity
Operation	Complexity
Encoding	O(N) — iterate through all characters
Decoding	O(N) — parse through each segment
Space	O(N) — for storing result