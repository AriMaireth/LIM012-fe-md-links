// const os = require('os');
const path = require('path');
const fs = require('fs');

// Funcion para determinar si la ruta es absoluta y convertir rutas relativas a absolutas
const itsAbsolute = (route) => {
  if (path.isAbsolute(route) === true) {
    return route;
  } return (path.resolve(route));
};

// Acá se comprueba si es una ruta de archivo
const itsAFile = (fileRoute) => fs.statSync(fileRoute).isFile();
// Devolver solo la extension.md de un archivo
const fileExtension = (extension) => path.extname(extension) === '.md';

// Recorrer directorio hasta encontrar archivos y sacar solo su extension .md
const searchInDirectory = (route) => {
  const convertToAbsolutePath = itsAbsolute(route);
  let mdFile = [];
  if (itsAFile(convertToAbsolutePath)) {
    if (fileExtension(convertToAbsolutePath)) {
      mdFile.push(convertToAbsolutePath);
    }
  } else {
    const readFiles = fs.readdirSync(convertToAbsolutePath);
    readFiles.forEach((extension) => {
      mdFile = mdFile.concat(searchInDirectory(path.join(convertToAbsolutePath, extension)));
    });
  }
  return mdFile;
};
/* Creo mi funcion en la que convierto mi ruta a absoluta y luego con un if/else verifico si son
 archivos o directorios, si son archivos, selecciono solo los archivos con extension MD y los pusheo
 al array mdFile y si es un directorio leo la carpeta y la recorro con un forEach,
 los archivos/elementos que encuentro en el directorio los agrego tambien al array mdFile
 concatenandolos con la ruta absoluta que creó la funcion. Uno los segmentos con un Join que crea
 una ruta usando el separador predeterminado. */
module.exports = {
  itsAbsolute, itsAFile, fileExtension, searchInDirectory,
};


// console.log(fs.readdirSync('C:/Users/galle/LIM012-fe-md-links/src/pruebaRuta'));
// console.log(searchInDirectory('./src'));
