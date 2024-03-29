const fs = require('fs');
const os = require('os');

// console.log(os.cpus().length)
// console.log(os.totalmem())
// console.log(os.freemem())
// console.log(os.hostname());

// synchronous file write return value in variable 
// fs.writeFileSync('hello.txt', 'Hello from Node.js!');

// asynchronous file write return value in callback function
// fs.writeFile('hello.txt', 'Hello from Node.js!!', (err) => {
//     if (err) {
//         console.error(err);
//         return;
//     }
//     console.log('File written successfully');
// });


// synchronous file read return value in variable

// const result = fs.readFileSync('hello.txt', "utf-8");
// console.log(result);


// asynchronous file read return value in callback function
// fs.readFile('hello.txt', "utf-8", (err, result) => {
//     if (err) {
//         console.error(err);
//         return;
//     }
//     console.log(result);
// });

// fs.appendFileSync("hello.txt", `Date: ${new Date().getDate()}\n Hey there! I'm a Node.js script!\n`);

// fs.cpSync("hello.txt", "copy.txt");

// fs.unlinkSync("copy.txt");  // delete file

// fs.mkdirSync("newFolder/newFile", {recursive: true});  // create folder

// fs.rmdirSync("newFolder", {recursive: true});  // delete folder

// fs.renameSync("hello.txt", "helloWorld.txt");  // rename file

// fs.renameSync("helloWorld.txt", "hello.txt");

// fs.stat("hello.txt", (err, stats) => {
//     if (err) {
//         console.error(err);
//         return;
//     }
//     console.log(stats);
//     console.log(stats.isFile());
//     console.log(stats.isDirectory());
//     console.log(stats.size);
//     console.log(stats.birthtime);
// }
// );

// Blocking : synchronous

// console.log("Start");

// const data = fs.readFileSync("hello.txt", "utf-8");
// console.log(data);

// console.log("End");

// Non-Blocking : asynchronous

// console.log("Start");

// fs.readFile("hello.txt", "utf-8", (err, data) => {
//     if (err) {
//         console.error(err);
//         return;
//     }
//     console.log(data);
// })

// console.log("End");


// Default Thread pool size : 4

