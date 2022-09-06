
class Usuario {
    constructor(nombre, apellido){
        this.nombre = nombre;
        this.apellido = apellido;
        this.libros = [];
        this.mascotas = [];
    }

    getFullName(){
        return `${this.nombre} ${this.apellido}`;
    }

    addMascota(nombre){
        this.mascotas.push(nombre);
    }

    countMascotas(){
        return this.mascotas.length;
    }

    addBook(nombre, autor){
        this.libros.push({nombre: nombre, autor: autor});
    }

    getBookNames(){
        let nombreLibros = [];
        this.libros.map(libro => {
            nombreLibros.push(libro.nombre);
        })
        return nombreLibros;
    }
}

let usuario = new Usuario('Hernan', 'Franco');

usuario.addMascota('Tomi');
usuario.addMascota('Eva');

usuario.addBook('La vida por la patria', 'Felipe Pigna');
usuario.addBook('El huracan rojo', 'Alejandro Horowicz');

console.log(`Usuario: ${usuario.getFullName()}\n
Mascotas: ${usuario.countMascotas()}\n
Libros: ${usuario.getBookNames()}`);