// //1.Synchronous code example
// console.log("start");
// console.log("end");

// //answer : start and end

// //2.Asynchronous code example
// console.log("start");
// setTimeout(() => {
//     console.log("Executed after 2 seconds");
// }, 2000);
// console.log("end");

// //answer : start , end and after 2 sec middle

// //3. More async code added
// console.log("start");
// setTimeout(() => {
//     console.log("Executed after 2 seconds");
// }, 0);

// setImmediate(() => {
//     console.log("Executed immediately after I/O events");
// }, 0);

// console.log("end");

// //answer : start , end , after 2 sec and immediately after I/O events

// //4.Using Promises
// console.log("start");

// process.nextTick(() => {
//     console.log("Next tick callback");
// });

// setTimeout(() => {
//     console.log("Timeout callback");
// }, 0);

// Promise.resolve().then(() => {
//     console.log("Promise resolved");
// });

// console.log("end");

// //answer : start , end , next tick callback , promise resolved and timeout callback


// Timer precision
const start = Date.now();

console.log(`[${Date.now() - start}ms] Start`);

setTimeout(() => {
  console.log(`[${Date.now() - start}ms] Timer`);
}, 100);

console.log(`[${Date.now() - start}ms] End`);

// Expected output: 
// [0ms] Start
// [1ms] End
// [100ms] Timer (approximately, may vary slightly)