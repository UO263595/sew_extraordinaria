/* cargar-cartelera.js */
// Carga un archivo XML proporcionado por el usuario
// Si no se ha escogido ningún archivo, se carga uno por defecto

"use strict";

class ArchivoXML {
	constructor(nombre) {
		this.nombre = nombre;
		this.correcto = "¡Todo correcto! archivo XML cargado"
	}
	
	cargarDatos() {
		$.ajax({
			dataType: "xml",
			url: this.nombre,
			method: 'GET',
			success: function(datos) {
				// Pasar el archivo XML a un string
				var str = (new XMLSerializer()).serializeToString(datos);
				console.log(datos);
				// Cadena con todos los datos recogidos del XML
				var stringDatos = "";
				
				var totalPeliculas = $('pelicula', datos).length;// cuenta el número de películas
				//console.log(totalPeliculas);
				// Se recorren las películas
				for (let i=0; i<totalPeliculas; i++) {
					stringDatos += "<section>";
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
					stringDatos += "<p>Sinopsis: "+$('sinopsis', datosDescripcion).text()+"</p>";
					console.log($('sinopsis', datosDescripcion));
					stringDatos += "<p>Público recomendado: "+$('recomendacion', datosDescripcion).get(0).getAttribute("publico")+"</p>";
					stringDatos += "<p>Puntuación: "+$('recomendacion', datosDescripcion).get(0).getAttribute("puntuacion")+"</p>";
					stringDatos += "<h5>Críticas</h5>";
					let totalCriticas = $('critica', $('recomendacion', datosDescripcion)).length;
					// Se recorren las críticas
					for (let k=0; k<totalCriticas; k++) {
						let datosCritica = $('critica', $('recomendacion', datosDescripcion)).get(k);
						//console.log(datosCritica);
						//console.log($('critica', $('recomendacion', datosDescripcion)));
						//console.log(datosCritica.textContent);
						//console.log($('critica', $('recomendacion', datosDescripcion)).text());
						stringDatos += "<p>"+datosCritica.textContent+"</p>";
						stringDatos += "<p>- "+datosCritica.getAttribute("autor")+"</p>";
					}
					
					stringDatos += "<h4>Actores</h4>";
					let datosActores = $('actores', datosPelicula).get(0);
					let totalActores = $('actor', datosActores).length;
					// Se recorren los actores
					for (let l=0; l<totalActores; l++) {
						let datosActor = $('actor', datosActores).get(l);
						stringDatos += "<p><b>"+datosActor.getAttribute("nombre")+" "+datosActor.getAttribute("apellidos")+"</b></p>";
						stringDatos += "<p>Fecha de nacimiento: "+$('nacimiento', datosActor).get(0).getAttribute("fecha")+"</p>";
						stringDatos += "<p>País de origen: "+$('nacimiento', datosActor).get(0).getAttribute("pais")+"</p>";
					
						stringDatos += "<h5>Actores</h5>";
						let datosPremios =  $('premios', datosActor).get(0);
						let totalPremios = $('premio', datosPremios).length;
						//console.log(totalPremios);
						// Se recorren los premios
						for (let m=0; m<totalPremios; m++) {
							let datosPremio = $('premio', datosPremios).get(m);
							stringDatos += "<p><b>"+datosPremio.getAttribute("categoria")+"</b></p>";
							stringDatos += "<p>Fecha: "+datosPremio.getAttribute("fecha")+"</p>";
							if (datosPremio.getAttribute("pelicula") != null)
								stringDatos += "<p>Película: "+datosPremio.getAttribute("pelicula")+"</p>";
							stringDatos += "<p>Resultado: "+datosPremio.getAttribute("resultado")+"</p>";
						}
						
						stringDatos += "<h5>Galería</h5>";
						let datosGaleria =  $('galeria', datosActor).get(0);
						let totalFotografias = $('fotografia', datosGaleria).length;
						// Se recorren las fotografias
						for (let n=0; n<totalFotografias; n++) {
							let datosFotografia = $('fotografia', datosGaleria).get(n);
							stringDatos += "<figure><img src="+datosFotografia.getAttribute("enlace")+"/></figure>";
						}
						
						let totalVideos = $('video', datosGaleria).length;
						// Se recorren los videos
						for (let o=0; o<totalVideos; o++) {
							let datosVideo = $('video', datosGaleria).get(o);
							stringDatos += "<video controls preload='auto'><source src="+datosVideo.getAttribute("enlace")+"type='video/mp4'></video>";
						}
					}
					
					stringDatos += "<h4>Bibliografía</h4>";
					let datosBibliografia = $('bibliografia', datosPelicula).get(0);
					let totalReferencias = $('referencia', datosBibliografia).length;
					for (let p=0; p<totalReferencias; p++) {
						let datosReferencia = $('referencia', datosBibliografia).get(p);
						stringDatos += "<p><a href="+datosReferencia.getAttribute("enlace")+">"+datosReferencia.getAttribute("enlace")+"</a></p>";
					}
					stringDatos += "</section>";

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
	
	// Muestra el archivo por defecto
	verXML() {
		$("section").remove();
		$("h3").remove();
		this.crearElemento("section","","h2");
		//this.crearElemento("h3",this.correcto,"h2");
		this.cargarDatos();
	}
	
	// Carga un archivo
	cargarArchivo(files) {
		var archivo = files[0];
		console.log(archivo);
		
		var lector = new FileReader();
		lector.onload = function (evento) {
			console.log(lector.result);
		}      
		lector.readAsText(archivo);		
	}
}

var archivoXML = new ArchivoXML("peliculas.xml");