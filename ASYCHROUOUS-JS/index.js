const fs = require('fs');
const { resolve } = require('path');
const superagent = require('superagent');

const readFilePro = file => {
    return new Promise((resolve, reject) => {
        fs.readFile(file, (err, data) => {
            if(err) reject('I could not find that file 😘')
            resolve(data)
        })
    })
}

const writeFilePro = (file, data) => {
    return new Promise((resolve, reject) => {
        fs.writeFile(file, data, err => {
            if(err)reject('Could not write 😘');
            resolve('success')
        })
    })
}

const dogPick = async () => {
    try {
        const data = await readFilePro(`${__dirname}/dog.txt`);
    console.log(`Breed: ${data}`);

    const res1 =   superagent.get(`https://dog.ceo/api/breed/${data}/images/random`);
    const res2 =   superagent.get(`https://dog.ceo/api/breed/${data}/images/random`);
    const res3 =  superagent.get(`https://dog.ceo/api/breed/${data}/images/random`);

    const all = await Promise.all([res1, res2, res3]);
    const imgs = all.map(el => el.body.message);

    console.log(imgs);



    await writeFilePro('dog-img.txt', imgs.join('\n'));
    console.log('Random dog image save to file') 
    } catch (err) {
        console.log(err);
        throw(err)
    }
   return "2: Ready 🤯"
}

( async () => {
    try {
        console.log('1: Will get dog pics');
        const x = await dogPick()
        console.log(x)
        console.log('3: Done getting dog pics');
    } catch (err) {
        console.log("ERROR 🔥") 
    }
})();



// console.log('1: Will get dog pics');
//  dogPick().then(x => {

//      console.log(x)
//      console.log('2: Done getting dog pics');
//  })
//  .catch(err => {
//      console.log("ERROR 🔥")
//  });








/*
readFilePro(`${__dirname}/dog.txt`).then(data => {
    console.log(`Breed: ${data}`);
    return superagent.get(`https://dog.ceo/api/breed/${data}/images/random`)
}).then(res => {
        console.log(res.body.message);
        return writeFilePro('dog-img.txt', res.body.message)
    })
    .then(() => {
        console.log('Random dog image save to file') 
    })
    .catch(err => {
      console.log(err.message)
    })
*/


// fs.readFile(`${__dirname}/dog.txt`, (err, data) => {
//     console.log(`Breed: ${data}`)
//     superagent.get(`https://dog.ceo/api/breed/${data}/images/random`)
//     .then(res => {
//         console.log(res.body.message);

//         fs.writeFile('dog-img.txt', res.body.message, err => {
//             console.log('Radom dog image save to file')
//         })
//     }).catch(err => {
//       console.log(err.message)
//     })
// })