const addBook = document.getElementById("add-book-btn");
const dialog = document.getElementById("book-dialog");
const cerrarDialog = document.getElementById("close-form");
const cancelDialog = document.getElementById("btn-cancelar");

//Dialogo
addBook.addEventListener("click", function () {
  dialog.showModal();
});

function cerrarFormDialog() {
  dialog.close();
}
cerrarDialog.addEventListener("click", function () {
  form.reset();
  cerrarFormDialog();
});
cancelDialog.addEventListener("click", function () {
  form.reset();
  cerrarFormDialog();
});

let myLibrary = [];

//Constructor
function Book(nombre, autor, paginas, leido) {
  this.nombre = nombre;
  this.autor = autor;
  this.paginas = paginas;
  this.leido = leido;
  this.ID = crypto.randomUUID();
}
// El prototipo es la “plantilla compartida” de todos los objetos creados con Book.
// Si añado un método aquí, todos los libros lo tendrán disponible sin duplicarlo en memoria.
Book.prototype.info = function () {
  let estado = this.leido ? "leido" : "no leido todavia";
  return `${this.nombre} de ${this.autor}, con ${this.paginas} páginas, ${estado}`;
};

function addBookToLibrary(nombre, autor, paginas, leido) {
  const nuevoLibro = new Book(nombre, autor, paginas, leido);
  myLibrary.push(nuevoLibro);
  return nuevoLibro;
}

//Creación de las cards
function renderBooks() {
  //Trabajamos con HTML para introducir los libros en el section creado para ello.
  const books = document.getElementById("books");

  //Creamos un NodoList de cada libro en el array para poder recorrer las card.Creada para el siguiente paso.
  const cards = books.querySelectorAll(".book-card");

  //Recorremos cada tarjeta creada.
  //Limpiamos las tarjetas para no duplicar al crear o modificar una nueva.
  cards.forEach((cardElement) => cardElement.remove());

  // Comprobar si el array está vacío o no, para mostrar u ocultar la sección "empty-state".
  const showEmpty = document.querySelector(".empty-state");
  if (myLibrary.length === 0) {
    showEmpty.style.display = "block";
    return;
  } else {
    showEmpty.style.display = "none";
  }

  //Creamos la card.
  myLibrary.forEach((item) => {
    const card = document.createElement("div"); //
    card.classList.add("book-card");

    const h3 = document.createElement("h3");
    h3.textContent = item.nombre;
    card.appendChild(h3);

    const p1 = document.createElement("p");
    p1.textContent = item.autor;
    card.appendChild(p1);

    const p2 = document.createElement("p");
    p2.textContent = item.paginas;
    card.appendChild(p2);

    const p3 = document.createElement("p");
    card.appendChild(p3);
    
    // Creando el botón de eliminar
    const quit = document.createElement("button");
    quit.textContent = "Eliminar";
    quit.classList.add("btn", "btn-quit");
    card.appendChild(quit);
    quit.dataset.id = item.ID;
    quit.addEventListener("click", function (event) {
      let id = event.target.dataset.id;
      myLibrary = myLibrary.filter((item) => item.ID !== id);
      renderBooks();
    });
    let check = document.createElement("input");
    check.type = "checkbox";
    if (item.leido === true) {
      check.checked = true;
    }
    //Para dejar permanente lo señalado.
    check.addEventListener("change", function (event) {
      if (event.target.checked == true) {
        item.leido = true;
      } else {
        item.leido = false;
      }
    });
    const label = document.createElement("label");
    label.textContent = "Leído";
    //Lo añade al principio, al contrario que appendChild que lo añade al final.
    label.prepend(check);
    card.appendChild(label);

    books.appendChild(card);
  });
}

//Seleccionamos el formulario al completo para poder usar la función siguiente y para guardar la card.
const form = document.getElementById("book-form");
form.addEventListener("submit", function (event) {
  event.preventDefault();

  const tituloInput = document.getElementById("titulo");
  const autorInput = document.getElementById("autor");
  const paginasInput = document.getElementById("paginas");
  const leidoInput = document.getElementById("leido");

  const nombre = tituloInput.value.trim();
  const autor = autorInput.value.trim();
  const paginas = parseInt(paginasInput.value, 10); //Con el 10 decimos que usamos el número en decimal.
  const leido = leidoInput.checked; //Devuelve booleano.

  addBookToLibrary(nombre, autor, paginas, leido);
  renderBooks();
  // guardarBiblioteca();
  form.reset();
  cerrarFormDialog();
});

// function guardarBiblioteca() {
//   const libreria = JSON.stringify(myLibrary);
//   const libreriaGuardada = localStorage.setItem("myLibrary", libreria);
//   const librerialeida = localStorage.getItem("myLibrary");
//   const libreriaObject = JSON.parse(librerialeida);
// }
