const fs = require('fs');

    class Contenedor {
        constructor(fileName) {
            this.fileName = fileName + ".txt";
        }

        async save(object) {
            try {
                let contenido = await fs.promises.readFile(this.fileName, 'utf-8');
                if (contenido === "") {
                    await fs.promises.writeFile(this.fileName, "[]");
                    contenido = "[]";
                } else {
                    const obj = JSON.parse(contenido);
                    if (obj.length > 0 ) {
                        let id = obj[obj.length - 1].id + 1;
                        object.id = id
                    } else {
                        object.id = 1;
                    }
                    obj.push(object);
                    contenido = JSON.stringify(obj, null, 2);
                }
                await fs.promises.writeFile(this.fileName, contenido);

                
                const obj = JSON.parse(contenido);
                const findProd = obj.find(item => item.id === object.id);
                console.log(findProd.id);
                return findProd.id;   
            } catch (error) {
                throw new Error(error);
            }
        }

        async getById(id) {
            try {
                let contenido = await fs.promises.readFile(this.fileName, 'utf-8');
                const obj = JSON.parse(contenido);
                const findProd = obj.find(item => item.id === id) ? obj.find(item => item.id === id) : null;
                console.log(findProd); //devuelve el objeto que coincide con el id
                return findProd;
            } catch (error) {
                throw new Error(error);
            }
        }

        async getAll() {
            try {
                let contenido = await fs.promises.readFile(this.fileName, 'utf-8');
                const obj = JSON.parse(contenido);
                console.log(obj); //devuelve todos los productos
                return obj;
            } catch (error) {
                throw new Error(error);
            }
        }

        async deleteById(id) {
            try {
                let contenido = await fs.promises.readFile(this.fileName, 'utf-8');
                const obj = JSON.parse(contenido);
                const findProd = obj.find(item => item.id === id);
                if (findProd) {
                    obj.splice(obj.indexOf(findProd), 1);
                    contenido = JSON.stringify(obj, null, 2);
                    await fs.promises.writeFile(this.fileName, contenido);
                }
            } catch (error) {
                throw new Error(error);
            }
        } 

        async deleteAll() {
            try {
                await fs.promises.writeFile(this.fileName, "[]");
            } catch (error) {
                throw new Error(error);
            }
        }
    }       


    const prod1 = {
        title: "Taza",
        price: 100,
        thumbnail: "https://producto1.com/123"
    };

    const prod2 = {
        title: "Plato",
        price: 200,
        thumbnail: "https://producto2.com/1234"
    };

    const prod3 = {
        title: "Cubiertos",
        price: 300,
        thumbnail: "https://producto3.com/12345"
    };

    const archivo = new Contenedor("products");
    //archivo.save(prod1);
    //archivo.save(prod2);
    //archivo.save(prod3);
    //archivo.getById(20);
    //archivo.getById(3);
    //archivo.getAll();
    //archivo.deleteById(2);
    //archivo.deleteAll();
    