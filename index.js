/*
    -First we will create an api endpoint that will send the pets information recieved from data.js
    -after we set up the app.get to the desired API endpoint
        -'/api/v1/pets'
    -we will simply do a req.send to containing the variable pets
        -pets contains the object of all pets and their information
    
    -To get the pet by name we will add a request param to the previous api endpoint
        -this allows us to view the current pet objects and find the desired name we wish to look for
        -once we find the desired name we will add it to the end of the url /'name'
    -to achieve this we can set up the app.get and include :name to the end of '/api/v1/pets'
    -then create a variable name that requests the params for name
    -set up a find array that compares the :name each pets.name until there is a match
    -finally we will send the result from the find array into res

    -To get the pet by owner we will complete the same steps for name just switch the name parets with owner

*/




// import the pets array from data.js
const pets = require('./data');

// init express app
const express = require('express');
const app = express();

const PORT = 8080;

app.use('/api/v1/pets', (req, res, next) => {
    console.log('A new request received at ' + Date.now());
    next();
});
// GET - / - returns homepage
app.get('/', (req, res) => {
    // serve up the public folder as static index.html file
    res.sendFile(__dirname + '/public/index.html')
});

// hello world route
app.get('/api', (req, res) => {
    res.send('Hello World!');
});

// get all pets from the database
app.get('/api/v1/pets/', (req, res) => {
    // send the pets array as a response
    // console.log(req.query)
    // console.log(pets.id);
    
    res.send(pets)
    
});

// get pet by owner with query string
app.get('/api/v1/pets/owner/:owner', (req, res) => {
    // get the owner from the request
    //create a variable that request the params of owner
    //user will need to fidn the owner they want to find so they can input in url
    const owner = req.params.owner

    // find the pet in the pets array
    const pet = pets.find(pet => pet.owner === owner);

    // send the pet as a response
    res.send(pet)
});


// get pet by name
app.get('/api/v1/pets/:name', (req, res) => {
    // get the name from the request
    //create a variable that request the params of pet
    //user will need to find the name they want so they can input in url
    const name = req.params.name;

    // find the pet in the pets array
    const pet = pets.find(pet => pet.name === name);

    // send the pet as a response
    res.send(pet)
});

app.listen(PORT, () => {
    console.log('Server is listening on port ' + PORT);
});

module.exports = app;