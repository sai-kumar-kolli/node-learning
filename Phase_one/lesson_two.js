const fs = require('fs');

console.log('1. Program starts');
console.log('2. About to read file...');

fs.readFile(__filename, () => {
    console.log('4. File read complete!');
});

console.log(__filename);

console.log('3. File read initiated, continuing...');


// Output based 
(() => {
    const start = Date.now();
    const log = (msg) => console.log(`[${Date.now() - start}ms] ${msg}`);

    log('Start');

    setTimeout(() => log('Timer: 100ms'), 100);

    fs.readFile(__filename, () => {
        log('File: Read complete');

        process.nextTick(() => log('File → NextTick'));
        setTimeout(() => log('File → Timer'), 0);
        setImmediate(() => log('File → Immediate'));
    });

    process.nextTick(() => log('Main → NextTick'));
    setImmediate(() => log('Main → Immediate'));

    log('End');
})();

// Expected Output Order:
// [0ms] Start
// [7ms] End
// [8ms] Main → NextTick
// [8ms] Main → Immediate
// [9ms] File: Read complete
// [9ms] File → NextTick
// [9ms] File → Immediate
// [11ms] File → Timer
// [106ms] Timer: 100ms


//Another example
(() => {
    // First, create a large file
    const largeContent = 'Hello World! '.repeat(100000); // ~1.2MB
    fs.writeFileSync('large-file.txt', largeContent);

    const start = Date.now();
    const log = (msg) => console.log(`[${Date.now() - start}ms] ${msg}`);

    log('Start');

    // Timer that should fire during file read
    setTimeout(() => log('Timer: 30ms'), 30);

    // Read the large file
    fs.readFile('large-file.txt', () => {
        log('Large file read complete');
    });

    // Read a small file for comparison
    fs.readFile(__filename, () => {
        log('Small file read complete');
    });

    log('Setup complete');
})();

// Expected Output Order (timings may vary):
//[0ms] Start
// [5ms] Setup complete
// [5ms] Small file read complete
// [6ms] Large file read complete
// [34ms] Timer: 30ms


//Another example
(() => {
    const fs = require('fs');
    const start = Date.now();
    const log = (msg) => console.log(`[${Date.now() - start}ms] ${msg}`);

    log('Testing Poll phase timeout...');

    // Create a timer with a specific deadline
    setTimeout(() => log('Timer: MUST execute at 50ms'), 50);

    // Start a file operation
    fs.readFile(__filename, () => {
        log('File read complete');

        // Add some processing time in the I/O callback
        const processingStart = Date.now();
        while (Date.now() - processingStart < 20) {
            // Simulate 20ms of processing
        }
        log('File processing complete');
    });

    log('Experiment started');
})();

// Expected Output Order (timings may vary):
// [0ms] Testing Poll phase timeout...
// [5ms] Experiment started
// [6ms] File read complete
// [26ms] File processing complete
// [55ms] Timer: MUST execute at 50ms (may be slightly delayed due to processing in the I/O callback)