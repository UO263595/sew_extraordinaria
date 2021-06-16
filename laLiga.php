<!DOCTYPE HTML>
<html lang="es">

<head>
	<title>Periódico digital</title>
    <meta charset="UTF-8"/>
	<!-- <base href="https://uo263595.github.io/sew_extraordinaria/"> -->
	<meta name="author" content="María Fernández Rojo">
	<meta name="description" content="Periódico digital con información sobre noticias, el mercado actual y el tiempo"/>
	
	<link rel="shortcut icon" type="image/x-icon" href="multimedia/icono.ico"/>
	<link rel="stylesheet" type="text/css" href="css/estilo.css"/> <!--hoja de estilo por defecto-->
	<link rel="stylesheet" type="text/css" href="css/posicionamiento.css"/> <!--hoja de estilo adicional-->
</head>

<body>
	<nav>
		<ul>
            <li><a href=index.html>Página principal</a></li>
            <li><a href=noticias.html>Noticias</a></li>
			<li><a href=buscador.html>Buscador de noticias</a></li>
			<li><a href=mercado.html>Mercado</a></li>
			<li><a href=tiempo.html>El tiempo</a></li>
        </ul>
	</nav>
	<header>
        <h1>Periódico Digital</h1>
    </header>
	
	<main>
		<h2>Información deportiva LaLiga</h2>
		
		<h3>Busca un jugador</h3>
		<form action='#' method='GET' name='formulario'>
		<label for="inputBuscarJugador">Jugador: </label><input type="text" id="inputBuscarJugador" name="inputBuscarJugador" placeholder="Inserta id, nombre o apellidos del jugador"/>
		<button id='bBuscarJugador' name='bBuscarJugador' type='submit'>Buscar jugador</button>
		</form>
		
		<h3>Busca un equipo</h3>
		<form action='#' method='GET' name='formulario'>
		<label for="inputBuscarEquipo">Equipo: </label><input type="text" id="inputBuscarEquipo" name="inputBuscarEquipo" placeholder="Inserta el nombre de un equipo"/>
		<button id='bBuscarEquipo' name='bBuscarEquipo' type='submit'>Buscar equipo</button>
		</form>
		
		<h3>Busca un partido</h3>
		<form action='#' method='GET' name='formulario'>
		<label for="inputBuscarPartido">Partido: </label><input type="text" id="inputBuscarPartido" name="inputBuscarPartido" placeholder="Inserta el código de un partido"/>
		<button id='bBuscarPartido' name='bBuscarPartido' type='submit'>Buscar partido</button>
		</form>
		
		<h3>Busca una rivalidad</h3>
		<form action='#' method='GET' name='formulario'>
		<label for="inputEquipo1">Primer equipo: </label><input type="text" id="inputEquipo1" name="inputEquipo1" placeholder="Inserta el nombre del primer equipo"/>
		<label for="inputEquipo2">Segundo equipo: </label><input type="text" id="inputEquipo2" name="inputEquipo2" placeholder="Inserta el nombre del segundo equipo"/>
		<button id='bBuscarRivalidad' name='bBuscarRivalidad' type='submit'>Buscar rivalidad</button>
		</form>
		
		<h3>Busca los equipos de una ciudad</h3>
		<form action='#' method='GET' name='formulario'>
		<label for="inputBuscarCiudad">Ciudad: </label><input type="text" id="inputBuscarCiudad" name="inputBuscarCiudad" placeholder="Inserta el nombre de una ciudad"/>
		<button id='bBuscarCiudad' name='bBuscarCiudad' type='submit'>Buscar ciudad</button>
		</form>
	</main>
	
	<?php
		class BaseDatos {
			private $servername;
			private $username;
			private $password;
			private $db;
			private $dbName;
			
			// Constructor de la clase
			// Asigna los valores a las variables globales y realiza una prueba de conexión con la Base de Datos
			public function __construct() {
				$this->servername = "localhost";
				$this->username = "DBUSER2020";
				$this->password = "DBPSWD2020";
				$this->db = new mysqli($this->servername,$this->username,$this->password);
				$this->dbName = "LaLiga";
				
				//comprobamos conexión
				if($this->db->connect_error) {
					exit ("<p>ERROR de conexión:" . $this->db->connect_error . "</p>");  
				} //else {echo "<p>Conexión establecida con " . $this->db->host_info . "</p>";}
				// Se crea la base de datos de trabajo "LaLiga" utilizando ordenación en español
				$cadenaSQL = "CREATE DATABASE IF NOT EXISTS LaLiga COLLATE utf8_spanish_ci";
				if($this->db->query($cadenaSQL) === TRUE) {
					//echo "<p>Base de datos 'LaLiga' creada con éxito</p>";
				} else { 
					echo "<p>ERROR en la creación de la Base de Datos 'LaLiga'. Error: " . $this->db->error . "</p>";
					exit();
				}   
				//cerrar la conexión
				$this->db->close();
				
				$this->crearTablas();
			}
			
			public function crearTablas() {
				$this->db = new mysqli($this->servername,$this->username,$this->password,$this->dbName);
				$tablaEquipo = "CREATE TABLE IF NOT EXISTS Equipo (
						nombre VARCHAR(32) NOT NULL, 
                        sede VARCHAR(32) NOT NULL,
                        posicion INT,
						
                        PRIMARY KEY (nombre),
						CHECK (posicion>0))";
                      
				if($this->db->query($tablaEquipo) === TRUE) {
					//echo "<p>Tabla 'Equipo' creada con éxito </p>";
					$this->cargarEquipos();
				} else { 
					echo "<p>ERROR en la creación de la tabla 'Equipo'. Error : ". $this->db->error . "</p>";
					exit();
				}
				
				$tablaJugador = "CREATE TABLE IF NOT EXISTS Jugador (
						id VARCHAR(32) NOT NULL, 
                        nombre VARCHAR(32) NOT NULL, 
						nacionalidad VARCHAR(32) NOT NULL, 
						equipo VARCHAR(32) NOT NULL, 
						puesto VARCHAR(32) NOT NULL,
						
                        PRIMARY KEY (id),
						FOREIGN KEY (equipo) REFERENCES Equipo(nombre))";
                      
				if($this->db->query($tablaJugador) === TRUE) {
					//echo "<p>Tabla 'Jugador' creada con éxito </p>";
					$this->cargarJugadores();
				} else { 
					echo "<p>ERROR en la creación de la tabla 'Jugador'. Error : ". $this->db->error . "</p>";
					exit();
				}
				
				$tablaPartido = "CREATE TABLE IF NOT EXISTS Partido (
						codigo VARCHAR(32) NOT NULL, 
                        equipo_local VARCHAR(32) NOT NULL, 
                        equipo_visitante VARCHAR(32) NOT NULL, 
						fecha DATE NOT NULL,
						goles_local INT,
						goles_visitante INT,
						
                        PRIMARY KEY (codigo),
						FOREIGN KEY (equipo_local) REFERENCES Equipo(nombre),
						FOREIGN KEY (equipo_visitante) REFERENCES Equipo(nombre),
						CHECK (goles_local>=0),
						CHECK (goles_visitante>=0))";
                      
				if($this->db->query($tablaPartido) === TRUE) {
					//echo "<p>Tabla 'Partido' creada con éxito </p>";
					$this->cargarPartidos();
				} else { 
					echo "<p>ERROR en la creación de la tabla 'Partido'. Error : ". $this->db->error . "</p>";
					exit();
				}
				
				$this->db->close();
			}
			
			public function buscarJugador() {
				$this->db = new mysqli($this->servername,$this->username,$this->password,$this->dbName);
				if($this->db->connect_error) {
					exit ("<p>ERROR de conexión:" . $this->db->connect_error . "</p>");  
				} //else {echo "<p>Conexión establecida</p>";}
				
				try {
					$consultaPre = $this->db->prepare("SELECT * FROM Jugador WHERE id = ? or nombre = ?");   
					$consultaPre->bind_param('ss', $_GET["inputBuscarJugador"], $_GET["inputBuscarJugador"]);   	
					$consultaPre->execute();
				
					$resultado = $consultaPre->get_result();
					if ($resultado->fetch_assoc()!=NULL) {
						echo "<p>Datos del jugador:</p>";
						$resultado->data_seek(0);
						while($fila = $resultado->fetch_assoc()) {
							echo "<p>--------------------------------------</p>";
							echo "<p>ID = " . $fila['id'] . "</p>";
							echo "<p>Nombre = " . $fila['nombre'] . "</p>";
							echo "<p>Nacionalidad = " . $fila['nacionalidad'] . "</p>";
							echo "<p>Equipo = ". $fila['equipo'] . "</p>";
							echo "<p>Puesto = ". $fila['puesto'] . "</p>";
							echo "<p>--------------------------------------</p>";
						}
					} else {echo "<p>Búsqueda sin resultados.</p>";}
					$consultaPre->close();
				} catch (Error $e) {
					echo "<p>ERROR: " . $e->getMessage() . "</p>";
				}
				$this->db->close();				
			}
			
			public function buscarEquipo() {
				$this->db = new mysqli($this->servername,$this->username,$this->password,$this->dbName);
				if($this->db->connect_error) {
					exit ("<p>ERROR de conexión:" . $this->db->connect_error . "</p>");  
				} //else {echo "<p>Conexión establecida</p>";}
				
				try {
					$consultaPre = $this->db->prepare("SELECT * FROM Equipo WHERE nombre = ?");   
					$consultaPre->bind_param('s', $_GET["inputBuscarEquipo"]);   	
					$consultaPre->execute();
				
					$resultado = $consultaPre->get_result();
					if ($resultado->fetch_assoc()!=NULL) {
						echo "<p>Datos del equipo:</p>";
						$resultado->data_seek(0);
						while($fila = $resultado->fetch_assoc()) {
							$goles = 0;
							$consultaGoles = $this->db->prepare("SELECT * FROM Partido WHERE equipo_local = ?");   
							$consultaGoles->bind_param('s', $fila['nombre']);   	
							$consultaGoles->execute();
							$resultadoGoles = $consultaGoles->get_result();
							if ($resultadoGoles->fetch_assoc()!=NULL) {
								while($filaGoles = $resultadoGoles->fetch_assoc()) {
									$goles += $filaGoles['goles_local'];
								}
							}
							$consultaGoles->close();
							
							$consultaGoles = $this->db->prepare("SELECT * FROM Partido WHERE equipo_visitante = ?");   
							$consultaGoles->bind_param('s', $fila['nombre']);   	
							$consultaGoles->execute();
							$resultadoGoles = $consultaGoles->get_result();
							if ($resultadoGoles->fetch_assoc()!=NULL) {
								while($filaGoles = $resultadoGoles->fetch_assoc()) {
									$goles += $filaGoles['goles_visitante'];
								}
							}
							$consultaGoles->close();
							
							echo "<p>--------------------------------------</p>";
							echo "<p>Nombre = " . $fila['nombre'] . "</p>";
							echo "<p>Localización sede = " . $fila['sede'] . "</p>";
							if ($fila['posicion']!=NULL) echo "<p>Posición = ". $fila['posicion'] . "</p>";
							echo "<p>Goles totales = " . $goles . "</p>";
							echo "<p>--------------------------------------</p>";
						}
					} else {echo "<p>Búsqueda sin resultados.</p>";}
					$consultaPre->close();
				} catch (Error $e) {
					echo "<p>ERROR: " . $e->getMessage() . "</p>";
				}
				$this->db->close();				
			}
			
			public function buscarPartido() {
				$this->db = new mysqli($this->servername,$this->username,$this->password,$this->dbName);
				if($this->db->connect_error) {
					exit ("<p>ERROR de conexión:" . $this->db->connect_error . "</p>");  
				} //else {echo "<p>Conexión establecida</p>";}
				
				try {
					$consultaPre = $this->db->prepare("SELECT * FROM Partido WHERE codigo = ?");   
					$consultaPre->bind_param('s', $_GET["inputBuscarPartido"]);   	
					$consultaPre->execute();
				
					$resultado = $consultaPre->get_result();
					if ($resultado->fetch_assoc()!=NULL) {
						echo "<p>Datos del partido:</p>";
						$resultado->data_seek(0);
						while($fila = $resultado->fetch_assoc()) {
							echo "<p>--------------------------------------</p>";
							echo "<p>Código = " . $fila['codigo'] . "</p>";
							echo "<p>Equipo local = " . $fila['equipo_local'] . "</p>";
							echo "<p>Equipo visitante = " . $fila['equipo_visitante'] . "</p>";
							echo "<p>Fecha = ". $fila['fecha'] . "</p>";
							if ($fila['goles_local']!=NULL && $fila['goles_visitante']!=NULL) echo "<p>Resultado = " . $fila['goles_local'] . " - " . $fila['goles_visitante'] . "</p>";
							echo "<p>--------------------------------------</p>";
						}
					} else {echo "<p>Búsqueda sin resultados.</p>";}
					$consultaPre->close();
				} catch (Error $e) {
					echo "<p>ERROR: " . $e->getMessage() . "</p>";
				}
				$this->db->close();				
			}

			public function buscarCiudad() {
				$this->db = new mysqli($this->servername,$this->username,$this->password,$this->dbName);
				if($this->db->connect_error) {
					exit ("<p>ERROR de conexión:" . $this->db->connect_error . "</p>");  
				} //else {echo "<p>Conexión establecida</p>";}
				
				try {
					$consultaPre = $this->db->prepare("SELECT * FROM Equipo WHERE sede = ?");   
					$consultaPre->bind_param('s', $_GET["inputBuscarCiudad"]);   	
					$consultaPre->execute();
				
					$resultado = $consultaPre->get_result();
					if ($resultado->fetch_assoc()!=NULL) {
						echo "<p>Datos del equipo:</p>";
						$resultado->data_seek(0);
						while($fila = $resultado->fetch_assoc()) {
							echo "<p>--------------------------------------</p>";
							echo "<p>Nombre = " . $fila['nombre'] . "</p>";
							echo "<p>Localización sede = " . $fila['sede'] . "</p>";
							if ($fila['posicion']!=NULL) echo "<p>Posición = ". $fila['posicion'] . "</p>";
							echo "<p>--------------------------------------</p>";
						}
					} else {echo "<p>No hay ninguna sede en esta localización.</p>";}
					$consultaPre->close();
				} catch (Error $e) {
					echo "<p>ERROR: " . $e->getMessage() . "</p>";
				}
				$this->db->close();	
			}
			
			public function buscarRivalidad() {
				$this->db = new mysqli($this->servername,$this->username,$this->password,$this->dbName);
				if($this->db->connect_error) {
					exit ("<p>ERROR de conexión:" . $this->db->connect_error . "</p>");  
				} //else {echo "<p>Conexión establecida</p>";}
				
				try {
					$equipo1 = "Sin datos";
					$equipo2 = "Sin datos";
					
					$consultaPre = $this->db->prepare("SELECT * FROM Equipo WHERE nombre = ?");   
					$consultaPre->bind_param('s', $_GET["inputEquipo1"]);   	
					$consultaPre->execute();
				
					$resultado = $consultaPre->get_result();
					if ($resultado->fetch_assoc()!=NULL) {
						echo "<p>Datos del equipo 1:</p>";
						$resultado->data_seek(0);
						$fila = $resultado->fetch_assoc();
						$equipo1 = $fila['nombre'];
						echo "<p>--------------------------------------</p>";
						echo "<p>Nombre = " . $fila['nombre'] . "</p>";
						echo "<p>Localización sede = " . $fila['sede'] . "</p>";
						if ($fila['posicion']!=NULL) echo "<p>Posición = ". $fila['posicion'] . "</p>";
						echo "<p>--------------------------------------</p>";
					} else {echo "<p>Búsqueda sin resultados.</p>";}
					$consultaPre->close();

					$consultaPre = $this->db->prepare("SELECT * FROM Equipo WHERE nombre = ?");   
					$consultaPre->bind_param('s', $_GET["inputEquipo2"]);   	
					$consultaPre->execute();
				
					$resultado = $consultaPre->get_result();
					if ($resultado->fetch_assoc()!=NULL) {
						echo "<p>Datos del equipo 2:</p>";
						$resultado->data_seek(0);
						$fila = $resultado->fetch_assoc();
						$equipo2 = $fila['nombre'];
						echo "<p>--------------------------------------</p>";
						echo "<p>Nombre = " . $fila['nombre'] . "</p>";
						echo "<p>Localización sede = " . $fila['sede'] . "</p>";
						if ($fila['posicion']!=NULL) echo "<p>Posición = ". $fila['posicion'] . "</p>";
						echo "<p>--------------------------------------</p>";
					} else {echo "<p>Búsqueda sin resultados.</p>";}
					$consultaPre->close();
					
					if ($equipo1=="Sin datos" or $equipo2=="Sin datos") echo "<p>Asegurate de introducir los nombres de los equipos correctamente.</p>";
					else {
						$victoriasEquipo1 = 0;
						$victoriasEquipo2 = 0;
						$empates = 0;
						$consultaPre = $this->db->prepare("SELECT * FROM Partido WHERE equipo_local = ? and equipo_visitante = ?");   
						$consultaPre->bind_param('ss', $equipo1, $equipo2);   	
						$consultaPre->execute();
					
						$resultado = $consultaPre->get_result();
						if ($resultado->fetch_assoc()!=NULL) {
							$resultado->data_seek(0);
							while($fila = $resultado->fetch_assoc()) {
								if ($fila['goles_local']>$fila['goles_visitante']) $victoriasEquipo1++;
								else if ($fila['goles_local']<$fila['goles_visitante']) $victoriasEquipo2++;
								else $empates++;
							}
						} else {echo "<p>No existen datos.</p>";}
						$consultaPre->close();
						
						$consultaPre = $this->db->prepare("SELECT * FROM Partido WHERE equipo_local = ? and equipo_visitante = ?");   
						$consultaPre->bind_param('ss', $equipo2, $equipo1);   	
						$consultaPre->execute();
					
						$resultado = $consultaPre->get_result();
						if ($resultado->fetch_assoc()!=NULL) {
							$resultado->data_seek(0);
							while($fila = $resultado->fetch_assoc()) {
								if ($fila['goles_local']>$fila['goles_visitante']) $victoriasEquipo2++;
								else if ($fila['goles_local']<$fila['goles_visitante']) $victoriasEquipo1++;
								else $empates++;
							}
						} else {echo "<p>No existen datos.</p>";}
						$consultaPre->close();
						echo "<p>Total victorias del ". $equipo1 .": ". $victoriasEquipo1 ."</p>";
						echo "<p>Total victorias del ". $equipo2 .": ". $victoriasEquipo2 ."</p>";
						echo "<p>Total empates: ". $empates ."</p>";
					}
				} catch (Error $e) {
					echo "<p>ERROR: " . $e->getMessage() . "</p>";
				}
				$this->db->close();	
			}
			
			public function cargarEquipos() {
				$this->db = new mysqli($this->servername,$this->username,$this->password,$this->dbName);
				if($this->db->connect_error) {
					exit ("<p>ERROR de conexión:" . $this->db->connect_error . "</p>");  
				} //else {echo "<p>Conexión establecida</p>";}

				try {
					$archivo = fopen("equipo.csv","r"); 
					$first = true;
					while(($datos=fgetcsv($archivo, 1000, ";")) !== FALSE) {
						if ($first) { $first = false; continue; }
						$consultaPre = $this->db->prepare("INSERT INTO Equipo (nombre,sede,posicion) VALUES (?,?,?)");
						$consultaPre->bind_param('ssi', 
						$datos[0],
						$datos[1],
						$datos[2]);
					
						$consultaPre->execute();
						$consultaPre->close();
					}
					fclose($archivo);
					//echo "<p>Los datos se han importado con éxito.</p>";
				
				} catch (Error $e) {
					echo "<p>ERROR: " . $e->getMessage() . "</p>";
				}
			}
			
			public function cargarJugadores() {
				$this->db = new mysqli($this->servername,$this->username,$this->password,$this->dbName);
				if($this->db->connect_error) {
					exit ("<p>ERROR de conexión:" . $this->db->connect_error . "</p>");  
				} //else {echo "<p>Conexión establecida</p>";}

				try {
					$archivo = fopen("jugador.csv","r"); 
					$first = true;
					while(($datos=fgetcsv($archivo, 1000, ";")) !== FALSE) {
						if ($first) { $first = false; continue; }
						$consultaPre = $this->db->prepare("INSERT INTO Jugador (id,nombre,nacionalidad,equipo,puesto) VALUES (?,?,?,?,?)");
						$consultaPre->bind_param('issss', 
						$datos[0],
						$datos[1],
						$datos[2],
						$datos[3],
						$datos[4]);
					
						$consultaPre->execute();
						$consultaPre->close();
					}
					fclose($archivo);
					//echo "<p>Los datos se han importado con éxito.</p>";
				
				} catch (Error $e) {
					echo "<p>ERROR: " . $e->getMessage() . "</p>";
				}
			}
			
			public function cargarPartidos() {
				$this->db = new mysqli($this->servername,$this->username,$this->password,$this->dbName);
				if($this->db->connect_error) {
					exit ("<p>ERROR de conexión:" . $this->db->connect_error . "</p>");  
				} //else {echo "<p>Conexión establecida</p>";}

				try {
					$archivo = fopen("partido.csv","r"); 
					$first = true;
					while(($datos=fgetcsv($archivo, 1000, ";")) !== FALSE) {
						if ($first) { $first = false; continue; }
						$consultaPre = $this->db->prepare("INSERT INTO Partido (codigo,equipo_local,equipo_visitante,fecha,goles_local,goles_visitante) VALUES (?,?,?,?,?,?)");
						$date = date_create($datos[3]);
						$dateStr = date_format($date,"Y-m-d");
						$consultaPre->bind_param('ssssss', 
						$datos[0],
						$datos[1],
						$datos[2],
						$dateStr,
						$datos[4],
						$datos[5]);
					
						$consultaPre->execute();
						$consultaPre->close();
					}
					fclose($archivo);
					//echo "<p>Los datos se han importado con éxito.</p>";
				
				} catch (Error $e) {
					echo "<p>ERROR: " . $e->getMessage() . "</p>";
				}
			}
		}
		
		$baseDatos = new BaseDatos();
		if (count($_GET)>0) {
			if(isset($_GET['bBuscarJugador'])) $baseDatos->buscarJugador();
			if(isset($_GET['bBuscarEquipo'])) $baseDatos->buscarEquipo();
			if(isset($_GET['bBuscarPartido'])) $baseDatos->buscarPartido();
			if(isset($_GET['bBuscarRivalidad'])) $baseDatos->buscarRivalidad();
			if(isset($_GET['bBuscarCiudad'])) $baseDatos->buscarCiudad();
		}
	?>
	
	<footer>
		<h4>Más información</h4>
		<p>
			Cinema:
			<a href="cartelera.html">Ver cartelera</a>
		</p>
		<p>
			Acerca de:
			<a href="informacion.html">Miembros del equipo</a>
		</p>
		<p>Autora: María Fernández Rojo - UO263595</p>
    </footer>
	</body>
</html>