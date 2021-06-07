/* mercado.js */
// Realiza una búsqueda de mercado del ticker introducido
// Ordena los datos por fecha

"use strict";

class BuscadorMercado {
	constructor() {
		// Establecer los límites de fechas
		let time = Date.now();
		let today = new Date(time).toLocaleDateString();
		console.log(today);
		$("#inputBusqueda").attr("value","OTRO TEXTO");
		
		$("#fechaInicial").attr("max", "2021-07-10");
		$("#fechaFinal").attr("max", today);
		
		this.apikey = "04e81f6ca5cd24036c4e875f36e73d99";
		this.orden = "&sort=ASC"; // ordena los por fecha
	}
	
	cargarDatos() {
		$.ajax({
			dataType: "json",
			url: this.url,
			method: 'GET',
			success: function(datos) {
				var stringDatos = "";
				for (let i = 0; i < datos.data.length; i++) {
					stringDatos += "<h3>" + datos.data[i].symbol + " - " + datos.data[i].date + "</h3>";
					stringDatos += "<p>Open: " + datos.data[i].open + "</p>";
					stringDatos += "<p>High: " + datos.data[i].high + "</p>";
					stringDatos += "<p>Low: " + datos.data[i].low + "</p>";
					stringDatos += "<p>Close: " + datos.data[i].close + "</p>";
					stringDatos += "<p>Volume: " + datos.data[i].volume + "</p>";
				}
				
				$("div").html(stringDatos);
				$("h4").html("Total resultados: " + datos.pagination.total);
			},
			error:function() {
				$("h3").html("¡Tenemos problemas! No puedo obtener JSON de <a href='https://marketstack.com/'>Marketstack</a>"); 

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
		var fechaInicial = $("#fechaInicial").val();
		var fechaFinal = $("#fechaFinal").val();
		// http://api.marketstack.com/v1/eod?symbols=example&access_key=API-Token
		this.url = "http://api.marketstack.com/v1/eod?symbols=" + busqueda + "&date_from=" + fechaInicial + "&date_to=" + fechaFinal + "&access_key=" + this.apikey;
		console.log("El valor actual de la url es " + this.url);
		this.crearElemento("h4","","#bBuscar");
		this.crearElemento("div","","#bBuscar");
		this.cargarDatos();
	}
}

var buscadorMercado = new BuscadorMercado();