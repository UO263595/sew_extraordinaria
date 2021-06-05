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
				// Pasar el archivo XML a un string
				var str = (new XMLSerializer()).serializeToString(datos);
				// Cadena con todos los datos recogidos del XML
				var stringDatos = "";
				
				var totalPeliculas = $('pelicula', datos).length;// cuenta el número de películas
				//console.log(totalPeliculas);
				// Se recorren las películas
				for (let i=0; i<totalPeliculas; i++) {
					let datosPelicula = $('pelicula', datos).get(i);
					stringDatos += "<h3>"+datosPelicula.getAttribute("nombre")+"</h3>";
					stringDatos += "<p>Género: "+datosPelicula.getAttribute("genero")+"</p>";
					stringDatos += "<p>Fecha de estreno: "+$('estreno', datosPelicula).get(0).getAttribute("fecha")+"</p>";
					
					let datosCines = $('cines', datosPelicula).get(0);
					console.log(datosCines);
					let totalCines = $('cine', datosCines).length;
					console.log(totalCines);
					// Se recorren los cines
					for (let j=0; j<totalCines; j++) {
						console.log("cine "+j);
					}
					
					
					//console.log(datos);
					console.log($('pelicula', datos).get(i).getAttribute("nombre"));
					
					console.log(datosPelicula);
					//console.log($('estreno', datosPelicula).get(0).getAttribute("fecha"));
				}	
				// Mostrar todos los datos
				$("section").html(stringDatos);
			},
			
			error:function() {
				$("section").remove();
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
		$("section").remove();
		$("h3").remove();
		this.crearElemento("section","","h2");
		//this.crearElemento("h3",this.correcto,"h2");
		this.cargarDatos();
	}
}

var archivoXML = new ArchivoXML("peliculas.xml");