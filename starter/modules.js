// console.log(arguments);
//console.log(require('module').wrapper);

/* const C = require('./test-module-1');
const calc = new C();
console.log(calc.add(4,6)); */

//const text = require('./test-module-2');
//or
const { add, multiply, divide } = require('./test-module-2');

console.log(add(10, 30))

//caching

require('./test-module-3')();
require('./test-module-3')();
require('./test-module-3')();