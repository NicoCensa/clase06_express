const { request } = require('express');
const express = require('express');

const fs = require('fs');
const { json } = require('stream/consumers');

const app = express();

const PORT = process.env.PORT || 8080;


class Contenedor{
  fileSystem;
    constructor(nombreArchivo, fs){
        this.fileSystem = fs;
        this.nombreArchivo = `./${nombreArchivo}`;
        this.fileSystem.writeFileSync(nombreArchivo,`{"listaObjetos": []}`);
    }

    getObjectById(id, data){
      if(data.length > 0){
        for(const item of data){
          if(id == item.id){
           return item;
          }
        }
        return null;
      }
    }
    
    save(objeto){
      try {
        const data = JSON.parse(this.fileSystem.readFileSync(this.nombreArchivo, `utf-8`));
        if(this.getObjectById(objeto.id,data.listaObjetos) == null){
          data.listaObjetos.push(objeto);
          this.fileSystem.writeFileSync(this.nombreArchivo, JSON.stringify(data))
        } 
      } catch (err) {
        console.log(err)
      }
        
    }

    getById(id){
      try {
        const data = JSON.parse(this.fileSystem.readFileSync(this.nombreArchivo, `utf-8`));
        return this.getObjectById(id, data.listaObjetos);
      } catch (err) {
        console.log(err)
      }
    }

    getAll(){
      try {
        return JSON.parse(this.fileSystem.readFileSync(this.nombreArchivo, `utf-8`));
      } catch (err) {
        console.log(err)
      }
      
    }

    deleteById(id){
      try {
        const data = JSON.parse(this.fileSystem.readFileSync(this.nombreArchivo, `utf-8`));
        data.listaObjetos = data.listaObjetos.filter(item => item.id != id);
        this.fileSystem.writeFileSync(this.nombreArchivo, JSON.stringify(data))
      } catch (err) {
        console.log(err)
      }
    }

    deleteAll(){
      this.fileSystem.writeFileSync(this.nombreArchivo,`{"listaObjetos": []}`);
    }
    
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min);
  }

let objeto1 = {                                                                                                                                                                                                                                                                                   
    title: 'Escuadra',                                                                                                                                 
    price: 123.45,                                                                                                                                     
    thumbnail: 'https://cdn3.iconfinder.com/data/icons/education-209/64/ruler-triangle-stationary-school-256.png',                                     
    id: 1                                                                                                                                              
  };
let objeto2= 
  {                                                                                                                                                    
    title: 'Calculadora',                                                                                                                              
    price: 234.56,                                                                                                                                     
    thumbnail: 'https://cdn3.iconfinder.com/data/icons/education-209/64/calculator-math-tool-school-256.png',                                          
    id: 2                                                                                                                                              
  };
let objeto3 =                                                                                                                                                  
  {                                                                                                                                                    
    title: 'Globo Terráqueo',                                                                                                                          
    price: 345.67,                                                                                                                                     
    thumbnail: 'https://cdn3.iconfinder.com/data/icons/education-209/64/globe-earth-geograhy-planet-school-256.png',                                   
    id: 3                                                                                                                                              
  };


const archivo = new Contenedor("productos.txt", fs);
archivo.save(objeto1);
archivo.save(objeto2);
archivo.save(objeto3);

app.get('/',(request, response) =>{

    response.send("Pagina Main");
})

app.get('/productos',(request, response) =>{
    response.send(archivo.getAll());
})

app.get('/productoRandom',(request, response) =>{
    console.log((archivo.getById(getRandomInt(1,(archivo.getAll().listaObjetos.length + 1)))))
})

const server = app.listen(PORT, ()=>{
    console.log(`Server http on ${PORT}...`);
})
server.on('error', error => console.log('Error on server', error));
