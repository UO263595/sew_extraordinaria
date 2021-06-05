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
					
					stringDatos += "<h4>Cines</h4>";
					let datosCines = $('cines', datosPelicula).get(0);
					//console.log(datosCines);
					let totalCines = $('cine', datosCines).length;
					//console.log(totalCines);
					// Se recorren los cines
					for (let j=0; j<totalCines; j++) {
						let datosCine = $('cine', datosCines).get(j);
						stringDatos += "<p><b>"+datosCine.getAttribute("nombre")+"</b></p>";	
						stringDatos += "<p>Dirección: "+$('direccion', datosCine).get(0).getAttribute("calle")+", "+$('direccion', datosCine).get(0).getAttribute("ciudad")+"</p>";
						stringDatos += "<p>Programación: "+$('programacion', datosCine).get(0).getAttribute("fecha")+" // "+$('programacion', datosCine).get(0).getAttribute("hora")+"</p>";
					}
					
					stringDatos += "<h4>Descripción</h4>";
					let datosDescripcion = $('descripcion', datosPelicula).get(0);
					stringDatos += "<p>Duración: "+$('duracion', datosDescripcion).get(0).getAttribute("minutos")+" minutos</p>";
//					stringDatos += "<p>Sinopsis: "+$('sinopsis', datosDescripcion).get(0).getText()+"</p>";
					stringDatos += "<p>Público recomendado: "+$('recomendacion', datosDescripcion).get(0).getAttribute("publico")+"</p>";
					stringDatos += "<p>Puntuación: "+$('recomendacion', datosDescripcion).get(0).getAttribute("puntuacion")+"</p>";
					stringDatos += "<h5>Críticas</h5>";
					let totalCriticas = $('critica', $('recomendacion', datosDescripcion)).length;
					for (let k=0; k<totalCriticas; k++) {
						let datosCritica = $('critica', $('recomendacion', datosDescripcion)).get(k);
//						stringDatos += "<p>"+datosCritica.getText()+"</p>";
						stringDatos += "<p>- "+datosCritica.getAttribute("autor")+"</p>";
					}
					
					stringDatos += "<h4>Bibliografía</h4>";
					let datosBibliografia = $('bibliografia', datosPelicula).get(0);
					let totalReferencias = $('referencia', datosBibliografia).length;
					for (let l=0; l<totalReferencias; l++) {
						let datosReferencia = $('referencia', datosBibliografia).get(l);
						stringDatos += "<p><a href="+datosReferencia.getAttribute("enlace")+">referencia</a></p>";
					}

					//console.log(datos);
					//console.log($('pelicula', datos).get(i).getAttribute("nombre"));
					//console.log(datosPelicula);
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