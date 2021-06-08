/* tiempo.js */
// Muestra el tiempo actual y la previsión para la localización del usuario

"use strict";

class InfoTiempo {
    constructor() {
        navigator.geolocation.getCurrentPosition(this.getPosicion.bind(this), this.verErrores.bind(this));
    }
	
	// Consigue la posición actual del usuario
    getPosicion(posicion) {
        this.longitud = posicion.coords.longitude; 
        this.latitud = posicion.coords.latitude;  
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
    verTodo(dondeVerlo) {
        var ubicacion=document.getElementById(sectionTiempo);
        var datos='<h2>' + this.mensaje + '</h2>'; 
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
}

var infoTiempo = new InfoTiempo();