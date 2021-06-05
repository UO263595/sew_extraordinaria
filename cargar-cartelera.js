/* cargar-cartelera.js */
// Carga un archivo XML proporcionado por el usuario
// Si no se ha escogido ningún archivo, se carga uno por defecto

"use strict";

class ArchivoXML {
	constructor(nombre){
		this.nombre = nombre;
		this.correcto = "¡Todo correcto! archivo XML cargado"
	}
	
	cargarDatos(){
		$.ajax({
			dataType: "xml",
			url: this.nombre,
			method: 'GET',
			success: function(datos) {
	
			},
			
			error:function() {
				$("h3").html("¡Tenemos problemas! No se pudo cargar el archivo XML");
			}
		});
	}
	
	// Crea un nuevo elemento modificando el árbol DOM
	// El elemento creado es de 'tipoElemento' con un 'texto'
	// El elemento se coloca después del elemnto 'insertarDespuesDe'
	crearElemento(tipoElemento, texto, insertarDespuesDe) {
		var elemento = document.createElement(tipoElemento);
		elemento.innerHTML = texto;
		$(insertarDespuesDe).after(elemento);
	}
	
	// Muestra el archivo recibido
	verXML() {
		this.crearElemento("h3",this.correcto,"h2");
		this.cargarDatos();
	}
}

var archivoXML = new archivoXML();