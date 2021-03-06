const fs = require('fs');

//Blocking Synchronous way

// const files = fs.readFileSync('./txt/input.txt', 'utf-8');
// console.log(files);

// const textOutput = `This is what we know about the avocado: ${files}.\n Created on ${Date.now()}`;

// fs.writeFileSync('./txt/output.txt', textOutput);
// console.log('file written');



//Non-blocking Asynchronous way

fs.readFile('./txt/start.txt', 'utf-8', (err, data1) => {
    fs.readFile(`./txt/${data1}.txt`, 'utf-8', (err, data2) => {
        console.log(data2);
        fs.readFile('./txt/append.txt', 'utf-8', (err, data3) => {
            console.log(data3);

            fs.writeFile('./txt/final.txt', `${data2}\n${data3}`, 'utf-8', err => {
                console.log('File written😆')
            })
        })
    

    })
    
})
console.log('wiil read file');
