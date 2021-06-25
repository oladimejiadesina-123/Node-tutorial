const EventEmitter = require('events');
const http = require('http');



class Sales extends EventEmitter {
    constructor() {
        super()
    }

} 


const myEmitter = new Sales();
myEmitter.on('newSale', () => {
    console.log('There was a new sale')
});

myEmitter.on('newSale', () => {
    console.log('Customers name: James')
});

myEmitter.on('newSale', stock  => {
    console.log(`There are new ${stock} items left in stock`)
});

myEmitter.emit('newSale', 9);

/////////////////////////////


const server = http.createServer();

server.on('request', (req, res) => {
    console.log('Request receieved');
    console.log(req.url)
    res.end('Request receieved')
})

server.on('request', (req, res) => {
    console.log('Another Request 😆');
    
})

server.on('close', () => {
    console.log('Server closed')
})

server.listen(8000, '127.0.0.1', () => {
    console.log('Waiting for request....')
})