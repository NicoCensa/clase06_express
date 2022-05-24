const { request } = require('express');
const express = require('express');

const app = express();

const PORT = process.env.PORT || 8080;

app.get('/',(request, response) =>{

    response.send("WOLOLO");
})

app.get('/productos',(request, response) =>{

    response.send([
        {                                                                                                                                                                                                                                                                                   
            title: 'Escuadra',                                                                                                                                 
            price: 123.45,                                                                                                                                     
            thumbnail: 'https://cdn3.iconfinder.com/data/icons/education-209/64/ruler-triangle-stationary-school-256.png',                                     
            id: 1,

            title: 'Calculadora',                                                                                                                              
            price: 234.56,                                                                                                                                     
            thumbnail: 'https://cdn3.iconfinder.com/data/icons/education-209/64/calculator-math-tool-school-256.png',                                          
            id: 2,                                                                                                                                              
                                                                                                                                             
            title: 'Globo Terráqueo',                                                                                                                          
            price: 345.67,                                                                                                                                     
            thumbnail: 'https://cdn3.iconfinder.com/data/icons/education-209/64/globe-earth-geograhy-planet-school-256.png',                                   
            id: 3                                                                                                                                              
          }
    ])
})

const server = app.listen(PORT, ()=>{
    console.log(`Server http on ${PORT}...`);
})
server.on('error', error => console.log('Error on server', error));