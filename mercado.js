/* mercado.js */
// Realiza una búsqueda de mercado del ticker introducido
// Ordena los datos por fecha

"use strict";

class BuscadorMercado {
	// Constructor de la clase
	constructor() {
		this.apikey = "04e81f6ca5cd24036c4e875f36e73d99";
		this.orden = "&sort=ASC"; // ordena los por fecha
	}
	
	// Carga y muestra los datos del mercado
	cargarDatos() {
		$.ajax({
			dataType: "json",
			url: this.url,
			method: 'GET',
			success: function(datos) {
				$("#advertencia").remove();
				
				var stringDatos = "";
				for (let i = 0; i < datos.data.length; i++) {
					let fecha = new Date(datos.data[i].date);
					stringDatos += "<section class='mercado'>";
					stringDatos += "<h3>" + datos.data[i].symbol + " - " + fecha.toLocaleDateString() + "</h3>";
					stringDatos += "<p>Abierto: " + datos.data[i].open + "</p>";
					stringDatos += "<p>Alto: " + datos.data[i].high + "</p>";
					stringDatos += "<p>Bajo: " + datos.data[i].low + "</p>";
					stringDatos += "<p>Cerrado: " + datos.data[i].close + "</p>";
					stringDatos += "<p>Volumen: " + datos.data[i].volume + "</p>";
					stringDatos += "</section>";
				}
				stringDatos += "<h4>Total resultados</h4><p>"+datos.pagination.total+"</p>";
				
				$("div").html(stringDatos);
			},
			error: function(datos) {
				var stringDatos = "";
				stringDatos += "<h3>¡Tenemos problemas! No se pudo obtener el JSON de <a href='https://marketstack.com/'>Marketstack</a></h3>";
				stringDatos += "<p>Error: " + datos.responseJSON.error.message + "</p>";

				$("div").html(stringDatos);
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
		var busqueda = $("#inputBusqueda").val();
		var fechaInicial = $("#fechaInicial").val();
		var fechaFinal = $("#fechaFinal").val();
		// http://api.marketstack.com/v1/eod?symbols=example&access_key=API-Token
		this.url = "http://api.marketstack.com/v1/eod?symbols=" + busqueda + "&date_from=" + fechaInicial + "&date_to=" + fechaFinal + "&access_key=" + this.apikey;
		console.log("El valor actual de la url es " + this.url);
		this.crearElemento("div","","#opcionesMercado");
		this.cargarDatos();
	}
}

var buscadorMercado = new BuscadorMercado();