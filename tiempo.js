/* tiempo.js */
// Muestra el tiempo actual y la previsión para la localización del usuario

"use strict";

class InfoTiempo {
    constructor() {
        navigator.geolocation.getCurrentPosition(this.getPosicion.bind(this), this.verErrores.bind(this));
		this.apikey = "187343ea60ec406387d3986333ad19f1";
		this.idioma = "&lang=es";
	}
	
	cargarDatos(mensajeTiempo) {
		$.ajax({
			dataType: "json",
			url: this.url,
			method: 'GET',
			success: function(datos) {
				var stringDatos = "";
				stringDatos += "<h3>"+mensajeTiempo+"</h3>";
				stringDatos += "<p>Dirección del viento: "+datos.data[0].wind_cdir+"</p>";

				document.getElementById('tiempoActual').innerHTML = stringDatos;
			},
			error:function() {
				$("h3").html("¡Tenemos problemas! No puedo obtener JSON de <a href='https://mediastack.com/'>Mediastack</a>"); 

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
	
	// Muestra los datos del tiempo actual
	tiempoActual() {
		// https://api.weatherbit.io/v2.0/current
		this.url = "https://api.weatherbit.io/v2.0/current?lat=" + this.getLatitud() + "&lon=" + this.getLongitud() + "&key=" + this.apikey;
		console.log("El valor actual de la url es " + this.url);
		this.cargarDatos("Tiempo actual");
	}
}

var infoTiempo = new InfoTiempo();