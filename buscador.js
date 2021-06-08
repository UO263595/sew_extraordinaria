/* buscador.js */
// Realiza una búsqueda de noticias relacionadas con la palabra que se introduce
// Ordena las noticias por fecha de publicación

"use strict";

class BuscadorNoticias {
	// Constructor de la clase
	constructor() {
		this.apikey = "8244169070c7a2fada685c65ea3a54c9";
		this.idioma = "&languages=es";
		this.orden = "&orden=published_desc"; // ordena las noticias por fecha de publicación
	}
	
	// Carga y muestra los datos de las noticias
	cargarDatos() {
		$.ajax({
			dataType: "json",
			url: this.url,
			method: 'GET',
			success: function(datos) {
				var stringArticulos = "";
				for (let i = 0; i < datos.data.length; i++) {
					stringArticulos += "<section>";
					stringArticulos += "<h3>" + datos.data[i].title + " - " + datos.data[i].source + "</h3>";
					if (datos.data[i].image != null) {
						let extension = datos.data[i].image.substring(datos.data[i].image.lastIndexOf('.') + 1).toLowerCase();
						if (extension == "mp3")
							stringArticulos += "<audio controls><source src='"+datos.data[i].image+"' type='audio/mpeg'/></audio>";
						else if (extension == "mp4") 
							stringArticulos += "<video controls preload='auto'><source src='"+datos.data[i].image+" type='video/mp4'></video>";
						else
							stringArticulos += "<figure class='izquierda'><img class='imgBuscador' alt='Imagen adjunta a la noticia' src='"+datos.data[i].image+"'/></figure>";
					}
					stringArticulos += "<p>" + datos.data[i].description + "</p>";
					stringArticulos += "<a href='" + datos.data[i].url + "'>Ver noticia</a>";
					stringArticulos += "</section>";
				}
				
				$("div").html(stringArticulos);
				$("h4").html("Total resultados: " + datos.pagination.total);
			},
			error:function() {
				this.crearElemento("h3","","#bBuscar");
				$("h3").html("¡Tenemos problemas! No puedo obtener JSON de <a href='https://mediastack.com/'>Mediastack</a>"); 
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
	
	// Realiza la búsqueda
	buscar() {
		$("div").remove();
		$("h3").remove();
		$("h4").remove();
		var busqueda = $("#inputBusqueda").val();
		// http://api.mediastack.com/v1/news?keywords=example&access_key=API-Token
		this.url = "http://api.mediastack.com/v1/news?keywords=" + busqueda + this.idioma + this.orden + "&access_key=" + this.apikey;
		console.log("El valor actual de la url es " + this.url);
		this.crearElemento("h4","","#bBuscar");
		this.crearElemento("div","","#bBuscar");
		this.cargarDatos();
	}
}

var buscadorNoticias = new BuscadorNoticias();