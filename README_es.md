# Ejemplos promises-typescript

Conjunto simple de ejemplos que nos mostrarán cómo trabajar con promises + typescript.

Las muestras se basan y utilizan:

* Typescript.
* Webpack
* Fetch.

# Listado de ejemplos.

## 00 Promise simple y $ajax

Este es el punto de entrada. ¿Qué sucede si queremos unir llamadas a $ajax y obtener los beneficios de usar promises?

En este ejemplo utlizaremos la API que proporciona Github realizando una llamada $AJAX remota, resolviendo o rechazando una promise dependiendo de la respuesta obtenida.

## 01 Usando "fetch" en un caso sencillo

En este punto vamos a usar algo más moderno, "fetch". Nos apoyaremos en un polyfill para cubrir aquellos navegadores que no soportan "fetch".

Encadenaremos promises y capturaremos posibles errores usando "catch", más información sobre promises en este [link](http://exploringjs.com/es6/ch_promises.html)  

## 02 Esperando que múltiples promises sean resueltas

En este apartado ejecutaremos paralelamente más de una promise de forma asíncrona. Utilizaremos la potencia de las promises para esperar a que todas ellas
finalicen para mostrar un mensaje (esto podría utilizarse, por ejemplo, para mostrar un spinner o realizar una operación especial).

# ¿Cómo ejecutar los ejemplos?

1. Descarga este repositorio.
2. Instala [NodeJS](http://www.nodejs.org)  
3. Abre la linea de comandos de tu elección y sitúate en el directorio principal donde hayas ubicado el repositorio.  
4. Situate en la subcarpeta donde se encuentre el ejemplo que quieras ejecutar.
6. `npm install` - Instala los paquetes necesarios (también instalará las definiciones de typescript).
7. `npm start` - Construye el proyecto y lanza un pequeño servidor web (webpack-devserver).
8. Si no se inicia automáticamente abre un navegador y copia en él la siguiente url [http://localhost:8080/](http://localhost:8080/).
