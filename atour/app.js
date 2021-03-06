const express = require('express');
const fs = require('fs');


const app = express();
app.use(express.json());

app.use((req, res, next) => {
    console.log('Hello from middleware 👏');
    next();
})

const tours = JSON.parse(fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`))
  

const getAllTour = (req, res) => {
    res.status(200).json({
        status: 'success',
        results: tours.length,
        data: {
            tours
        }
    })
};

const getTour = (req, res) => {
    console.log(req.params);
    const id = req.params.id * 1;
    const tour = tours.find(el => el.id === id)

    // if(id > tours.length) {
        if(!tour) {
        return res.status(404).json({
            status: 'fail',
            message: 'Invalid ID'
        })
    }
    res.status(200).json({
        status: 'success',
        data: {
            tours
        }
    })
};

const createTour = (req, res) => {
    const newId = tours[tours.length - 1].id + 1;
    const newTour = Object.assign({ id: newId}, req.body);
 
    tours.push(newTour);
    fs.writeFile(`${__dirname}/dev-data/data/tours-simple.json`, JSON.stringify(tours), 
    err => {
     res.status(201).json({
         status: 'success',
         data: {
             tour: newTour
         }
     })
    })  
 };

 const updateTour = (req, res) => {

    if(req.params.id * 1 > tours.length) {
           return res.status(404).json({
               status: 'fail',
               message: 'Invalid ID'
           })
       }
   
       res.status(200).json({
           status: 'success',
           data: {
               tour: "<Updated tour here....>"
           }
       })
   };

   const deleteTour = (req, res) => {

    if(req.params.id * 1 > tours.length) {
           return res.status(404).json({
               status: 'fail',
               message: 'Invalid ID'
           })
       }
   
       res.status(204).json({
           status: 'success',
           data: null
       })
   };

//app.get('/api/v1/tours', getAllTour);
//app.get('/api/v1/tours/:id', getTour);
//app.post('/api/v1/tours', createTour);
//app.patch('/api/v1/tours/:id', updateTour);
//app.delete('/api/v1/tours/:id', deletTour);


app.route('/api/v1/tours').get(getAllTour).post(createTour);
app.route('/api/v1/tours/:id').get(getTour).patch(updateTour).delete(deleteTour);

const port = 3000;

app.listen(port, () => {
    console.log(`server listening on port: ${port}`)
});