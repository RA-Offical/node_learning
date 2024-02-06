// importing fs common js module
const fs = require("fs");
const fsPromises = require("fs").promises;
const path = require("path");

// reading file
// this is asynchronous code

// fs.readFile("./files/bio.txt", "utf-8", (error, data) => {
// 	if (error) throw error;
// 	console.log(data);
// });

// fs.readFile(path.join(__dirname, "files", "bio.txt"), "utf-8", (error, data) => {
// 	if (error) throw error;
// 	console.log(data);
// });

// Just to test async nature of upper code
console.log("Hello world");

// writing to a file
// this is callback hell code
// fs.writeFile(path.join(__dirname, "files", "reply.txt"), "Hay! What's up bro?", (error) => {
// 	if (error) {
// 		console.log(error);
// 	}
// 	console.log("Writing operation done");
// 	// appending a file
// 	fs.appendFile(path.join(__dirname, "files", "reply.txt"), "What's happening?", (error) => {
// 		if (error) {
// 			console.log(error);
// 		}
// 		console.log("Append operation done");

// 		// renaming a file
// 		fs.rename(
// 			path.join(__dirname, "files", "reply.txt"),
// 			path.join(__dirname, "files", "newReply.txt"),
// 			(error) => {
// 				if (error) {
// 					console.log(error);
// 				}

// 				console.log("Rename operation done");
// 			}
// 		);
// 	});
// });

// code with async await for file operations

async function fileOperations() {
	try {
		const data = await fsPromises.readFile(path.join(__dirname, "files", "bio-1.txt"), "utf-8");
		await fsPromises.unlink(path.join(__dirname, "files", "bio-1.txt"));

		await fsPromises.writeFile(path.join(__dirname, "files", "promisesWrite.txt"), data);
		await fsPromises.appendFile(
			path.join(__dirname, "files", "promisesWrite.txt"),
			"\n\nNice to meet you!"
		);
		await fsPromises.rename(
			path.join(__dirname, "files", "promisesWrite.txt"),
			path.join(__dirname, "files", "promisesWriteRename.txt")
		);
	} catch (error) {
		console.error(error);
	}
}

fileOperations();

//exit on uncaught exception
process.on("uncaughtException", (error) => {
	console.log(`Error Occured: ${error}`);
	process.exit(1);
});
