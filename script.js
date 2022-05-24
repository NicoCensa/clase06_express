const fs = require('fs');
const { json } = require('stream/consumers');

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

archivo.deleteById(1);
archivo.deleteById(2);
archivo.deleteById(3);

console.log(archivo.getById(2));

console.log(archivo.getAll());

archivo.deleteAll();
