const { request } = require('express');
const express = require('express');

const app = express();

const PORT = process.env.PORT || 8080;

app.get('/',(request, response) =>{

    response.send("WOLOLO");
})

app.get('/productos',(request, response) =>{

    response.send([
        {name:"Beers",price:250},
        {name:"Wine",price:300}
    ])
})

const server = app.listen(PORT, ()=>{
    console.log(`Server http on ${PORT}...`);
})
server.on('error', error => console.log('Error on server', error));