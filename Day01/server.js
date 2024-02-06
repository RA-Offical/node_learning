// Difference between Node JS and Vanilla JS

// 1) Node js runs on server while Vanilla js runs on a browser
// 2) The console of Node.js is terminal window
console.log("Hello world");
// 3) There is global object in Node.js instead of window object which refers to browser.
console.log(global);
// 4) Node.js has Common Core modules that relate to the operating system such as file management
// 5) Common JS module instead of ES6 modules

const os = require("os");
console.log(os);
console.log(os.hostname());
console.log(os.type());
console.log(os.version());
console.log(os.homedir());

// path module
const path = require("path");

console.log(path);
console.log(path.dirname(__filename));
console.log(path.basename(__filename));
console.log(path.extname(__filename));
console.log(path.parse(__filename));

// other values we have access to in node.js
console.log(__dirname);
console.log(__filename);

// importing own defined module
const math = require("./math");
console.log(math.add(2, 3));
console.log(math.subtract(2, 3));
console.log(math.multiply(2, 3));
console.log(math.divide(2, 3));
