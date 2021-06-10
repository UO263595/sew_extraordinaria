/* tiempo.js */
// Muestra el tiempo actual y la previsión para la localización del usuario

"use strict";

class InfoTiempo {
	// Constructor de la clase
    constructor() {
        navigator.geolocation.getCurrentPosition(this.getPosicion.bind(this), this.verErrores.bind(this));
		this.apikey = "187343ea60ec406387d3986333ad19f1";
	}
	
	// Carga y muestra los datos actuales
	cargarDatosActuales() {
		$.ajax({
			dataType: "json",
			url: this.url,
			method: 'GET',
			success: function(datos) {
				let icono = "https://www.weatherbit.io/static/img/icons/"+datos.data[0].weather.icon+".png";
				console.log("El valor actual del icono es " + icono);
				
				var stringDatos = "";
				stringDatos += "<h3>Tiempo Actual</h3>";
				stringDatos += "<section class='tiempo'>";
				stringDatos += "<img src='"+icono+"'/>";
				stringDatos += "<p>Localización: "+datos.data[0].city_name+"</p>";
				stringDatos += "<p>Temperatura actual: "+datos.data[0].temp+" ºC</p>";
				stringDatos += "<p>Descripción: "+datos.data[0].weather.description+"</p>";
				stringDatos += "<p>Nubes: "+datos.data[0].clouds+" %</p>";
				stringDatos += "<p>Precipitaciones: "+datos.data[0].precip+" mm</p>";
				stringDatos += "<p>Velocidad del viento: "+datos.data[0].wind_spd+" m/s</p>";
				stringDatos += "<p>Dirección del viento: "+datos.data[0].wind_cdir_full+"</p>";
				stringDatos += "<p>Salida del sol: "+datos.data[0].sunrise+"</p>";
				stringDatos += "<p>Puesta de sol: "+datos.data[0].sunset+"</p>";
				stringDatos += "</section>";

				$("div").html(stringDatos);
			},
			error:function(datos) {
				var stringDatos = "";
				stringDatos += "<h3>¡Tenemos problemas! No se pudo obtener el JSON de <a href='https://www.weatherbit.io/'>Weatherbit</a></h3>";
				stringDatos += "<p>Error: " + datos.error + "</p>";

				$("div").html(stringDatos);
			}
		});
	}
	
	// Carga y muestra los datos previstos
	cargarDatosPrevistos() {
		$.ajax({
			dataType: "json",
			url: this.url,
			method: 'GET',
			success: function(datos) {
				var stringDatos = "";
				stringDatos += "<h3>Tiempo Previsto</h3>";
				stringDatos += "<p>Localización: "+datos.city_name+"</p>";
				for (let i = 0; i < datos.data.length; i++) {
					let icono = "https://www.weatherbit.io/static/img/icons/"+datos.data[i].weather.icon+".png";
					console.log("El valor actual del icono es " + icono);
					let fecha = new Date(datos.data[i].valid_date);
					stringDatos += "<section class='tiempo'>";
					stringDatos += "<p><b>Fecha: "+fecha.toLocaleDateString()+"</b></p>";
					stringDatos += "<img src='"+icono+"'/>";
					stringDatos += "<p>Temperatura mínima: "+datos.data[i].min_temp+" ºC</p>";
					stringDatos += "<p>Temperatura máxima: "+datos.data[i].max_temp+" ºC</p>";	
					stringDatos += "<p>Descripción: "+datos.data[i].weather.description+"</p>";
					stringDatos += "<p>Nubes: "+datos.data[i].clouds+" %</p>";
					stringDatos += "<p>Precipitaciones: "+datos.data[i].precip+" mm</p>";
					stringDatos += "<p>Velocidad del viento: "+datos.data[i].wind_spd+" m/s</p>";
					stringDatos += "<p>Dirección del viento: "+datos.data[i].wind_cdir_full+"</p>";
					stringDatos += "</section>";
				}
				
				$("div").html(stringDatos);
			},
			error:function(datos) {
				console.log(datos);
				var stringDatos = "";
				stringDatos += "<h3>¡Tenemos problemas! No se pudo obtener el JSON de <a href='https://www.weatherbit.io/'>Weatherbit</a></h3>";
				stringDatos += "<p>Error: " + datos.error + "</p>";

				$("div").html(stringDatos);
			}
		});
	}
	
	// Carga y muestra los datos históricos
	cargarDatosHistoricos() {
		$.ajax({
			dataType: "json",
			url: this.url,
			method: 'GET',
			success: function(datos) {
				var stringDatos = "";
				stringDatos += "<h3>Tiempo Historico</h3>";
				console.log(datos);
				stringDatos += "<p>Localización: "+datos.city_name+"</p>";
				for (let i = 0; i < datos.data.length; i++) {
					stringDatos += "<section class='tiempo'>";
					stringDatos += "<p><b>Fecha: "+datos.data[i].datetime+"</b></p>";
					stringDatos += "<p>Temperatura mínima: "+datos.data[i].min_temp+" ºC</p>";
					stringDatos += "<p>Temperatura máxima: "+datos.data[i].max_temp+" ºC</p>";
					stringDatos += "<p>Nubes: "+datos.data[i].clouds+" %</p>";
					stringDatos += "<p>Precipitaciones: "+datos.data[i].precip+" mm</p>";
					stringDatos += "<p>Velocidad del viento: "+datos.data[i].wind_spd+" m/s</p>";
					stringDatos += "</section>";
				}
				
				$("div").html(stringDatos);
			},
			error:function(datos) {
				console.log(datos);
				var stringDatos = "";
				stringDatos += "<h3>¡Tenemos problemas! No se pudo obtener el JSON de <a href='https://www.weatherbit.io/'>Weatherbit</a></h3>";
				stringDatos += "<p>Error: " + datos.error + "</p>";

				$("div").html(stringDatos);
			}
		});
	}
	
	// Consigue la posición actual del usuario
    getPosicion(posicion) {
        this.longitud = posicion.coords.longitude; 
        this.latitud = posicion.coords.latitude;  
		this.mensaje = "Se ha realizado correctamente la petición de geolocalización";	
    }
	
	// Comprueba si hay algún error
	verErrores(error) {
		switch(error.code) {
			case error.PERMISSION_DENIED:
				this.mensaje = "El usuario no permite la petición de geolocalización"
				break;
			case error.POSITION_UNAVAILABLE:
				this.mensaje = "Información de geolocalización no disponible"
				break;
			case error.TIMEOUT:
				this.mensaje = "La petición de geolocalización ha caducado"
				break;
			case error.UNKNOWN_ERROR:
				this.mensaje = "Se ha producido un error desconocido"
				break;
		}
	}	
	
	// Devuelve la longitud actual del usuario
    getLongitud() {
        return this.longitud;
    }
	
	// Devuelve la latitud actual del usuario
    getLatitud() {
        return this.latitud;
    }
   
	// Muestra toda la información disponible
    verTodo() {
        var ubicacion=document.getElementById('sectionTiempo');
        var datos='<h3>' + this.mensaje + '</h3>'; 
        datos+='<p>Longitud (grados): ' + this.checkParam(this.longitud) + '</p>'; 
        datos+='<p>Latitud (grados): ' + this.checkParam(this.latitud) + '</p>';
        ubicacion.innerHTML = datos;
    }
	
	// Comprueba si se ha logrado recuperar el parámetro con éxito
	checkParam(param) {
		if (param == null || param == "undefined") {
			return "NO DISPONIBLE";
		}
		return param;
	}
	
	// Crea un nuevo elemento modificando el árbol DOM
	// El elemento creado es de 'tipoElemento' con un 'texto'
	// El elemento se coloca después del elemnto 'insertarDespuesDe'	
	crearElemento(tipoElemento, texto, insertarDespuesDe) {
		var elemento = document.createElement(tipoElemento); 
		elemento.innerHTML = texto;
		$(insertarDespuesDe).after(elemento);
	}
	
	// Muestra los datos del tiempo actual
	tiempoActual() {
		$("div").remove();
		// https://api.weatherbit.io/v2.0/current
		this.url = "https://api.weatherbit.io/v2.0/current?lang=es&lat=" + this.getLatitud() + "&lon=" + this.getLongitud() + "&key=" + this.apikey;
		console.log("El valor actual de la url es " + this.url);
		this.crearElemento("div","","#tiempoHistorico");
		this.cargarDatosActuales();
	}
	
	// Muestra los datos del tiempo previsto
	tiempoPrevision() {
		$("div").remove();
		var dias = $("#inputDias").val();
		// https://api.weatherbit.io/v2.0/forecast
		this.url = "https://api.weatherbit.io/v2.0/forecast/daily?lang=es&lat=" + this.getLatitud() + "&lon=" + this.getLongitud() + "&days=" + dias + "&key=" + this.apikey;
		console.log("El valor actual de la url es " + this.url);
		this.crearElemento("div","","#tiempoHistorico");
		this.cargarDatosPrevistos();
	}
	
	// Muestra los datos del tiempo históricos
	tiempoHistorico() {
		$("div").remove();
		var fechaInicial = $("#fechaInicial").val();
		var fechaFinal = $("#fechaFinal").val();
		// https://api.weatherbit.io/v2.0/history/daily
		this.url = "https://api.weatherbit.io/v2.0/history/daily?lang=es&lat=" + this.getLatitud() + "&lon=" + this.getLongitud() + "&start_date=" + fechaInicial + "&end_date=" + fechaFinal + "&key=" + this.apikey;
		console.log("El valor actual de la url es " + this.url);
		this.crearElemento("div","","#tiempoHistorico");
		this.cargarDatosHistoricos();
	}
}

var infoTiempo = new InfoTiempo();