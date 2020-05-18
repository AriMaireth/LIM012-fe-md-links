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
    const readExtension = fs.readdirSync(convertToAbsolutePath);
    readExtension.forEach((extension) => {
      mdFile = mdFile.concat(searchInDirectory(path.join(convertToAbsolutePath, extension)));
    });
  }
  return mdFile;
};
module.exports = {
  itsAbsolute, itsAFile, fileExtension, searchInDirectory,
};


// console.log(searchInDirectory('C:/Users/galle/LIM012-fe-md-links/src/pruebaRuta'));
// console.log(searchInDirectory('./src'));

// const itsAFile = (fileRoute) => {
//   if (fs.statSync(fileRoute).isfile === true) {
//     return route;
// }else {}
// }
