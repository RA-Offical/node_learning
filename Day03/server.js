// // reading and writing file using stream
// const fs = require("fs");

// // reading stream
// const readStream = fs.createReadStream("./files/lorem.txt", { encoding: "utf8" });

// // writing stream
// const writeStream = fs.createWriteStream("./files/new-lorem.txt");

// // applying event listener on read stream
// // readStream.on("data", (dataChunk) => {
// // 	writeStream.write(dataChunk);
// // });

// readStream.pipe(writeStream);

// Working with  directory
// const fs = require("fs");
// const path = require("path");

// if (!fs.existsSync("./new")) {
// 	fs.mkdir("./new", (error) => {
// 		if (error) {
// 			console.log(error);
// 		}

// 		console.log("Created Directory");
// 	});
// }

// if (fs.existsSync("./new")) {
// 	fs.rmdir("./new", (error) => {
// 		if (error) {
// 			console.log(error);
// 		}

// 		console.log("Removed Directory");
// 	});
// }

console.log("Testing");
