/* buscador.js */
// Realiza una búsqueda de noticias relacionadas con la palabra que se introduce
// Ordena las noticias por fecha de publicación

"use strict";

class BuscadorNoticias {
	constructor() {
		this.apikey = "8244169070c7a2fada685c65ea3a54c9";
		this.idioma = "&languages=es";
		this.orden = "&orden=published_desc"; // ordena las noticias por fecha de publicación
	}
	
	cargarDatos() {
		$.ajax({
			dataType: "json",
			url: this.url,
			method: 'GET',
			success: function(datos) {
				var stringArticulos = "";
				for (var i = 0; i < datos.articles.length; i+=1) {
					stringArticulos += "<h3>" + datos.articles[i].title + " - " + datos.articles[i].source.name + "</h3>";
					stringArticulos += "<img src='" + datos.articles[i].image + "'/>";
					stringArticulos += "<p>" + datos.articles[i].description + "</p>";
					stringArticulos += "<a href='" + datos.articles[i].url + "'>Ver noticia</a>";
				}
				
				$("div").html(stringArticulos);
				$("h4").html("Total resultados: " + datos.totalArticles);
			},
			error:function() {
				$("h3").html("¡Tenemos problemas! No puedo obtener JSON de <a href='https://gnews.io/'>GNews</a>"); 

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
		// https://gnews.io/api/v4/search?q=example&token=API-Token
		this.url = "http://api.mediastack.com/v1/news?keywords=" + busqueda + this.idioma + this.orden + "&access_key=" + this.apikey;
		console.log("El valor actual de la url es " + this.url);
		this.crearElemento("h4","","#bBuscar");
		this.crearElemento("div","","#bBuscar");
		this.cargarDatos();
	}
}

var buscadorNoticias = new BuscadorNoticias();