const path = require('path');
const fs = require('fs');
const marked = require('marked');
// const process = require('process');

// Funcion para determinar si la ruta es absoluta y convertir rutas relativas a absolutas
const itsAbsolute = (route) => {
  if (path.isAbsolute(route) === true) {
    return route;
  } return (path.resolve(route));
};

// Acá se comprueba si es una ruta de archivo
const itsAFile = (fileRoute) => fs.statSync(fileRoute).isFile();
// console.log(itsAFile('./test/pruebaRuta/prueba.md'));

// Devolver solo la extension.md de un archivo
const fileExtension = (extension) => (path.extname(extension) === '.md');
// console.log(fileExtension('./test/pruebaRuta/prueba.md'));

/* Creo mi funcion en la que convierto mi ruta a absoluta y luego con un if/else verifico si son
 archivos o directorios, si son archivos, selecciono solo los archivos con extension MD y los pusheo
 al array mdFile y si es un directorio leo la carpeta y la recorro con un forEach,
 los archivos/elementos que encuentro en el directorio los agrego tambien al array mdFile
 concatenandolos con la ruta absoluta que creó la funcion. Uno los segmentos con un Join que crea
 una ruta usando el separador predeterminado. */
const searchInDirectory = (route) => {
  console.log(route);
  const convertToAbsolutePath = itsAbsolute(route);
  let mdFile = [];
  if (itsAFile(convertToAbsolutePath)) {
    if (fileExtension(convertToAbsolutePath)) {
      mdFile.push(convertToAbsolutePath);
    }
  } else {
    const readDirectory = fs.readdirSync(convertToAbsolutePath);
    readDirectory.forEach((extension) => {
      mdFile = mdFile.concat(searchInDirectory(path.join(convertToAbsolutePath, extension)));
    });
  }
  return mdFile;
};

/* Creamos un array de objetos con las propiedades href, text y file encontradas en archivos .MD */
const readFile = (file) => fs.readFileSync(file, 'utf-8');

const extractHtmlLinks = (route) => {
  const fileMd = searchInDirectory(route);
  const renderer = new marked.Renderer();
  const links = [];
  fileMd.forEach((file) => {
    renderer.link = (href, title, text) => links.push({
      href,
      text,
      file,
    });
    marked(readFile(file), { renderer });
  });
  return (links);
};

module.exports = {
  itsAbsolute, itsAFile, fileExtension, searchInDirectory, extractHtmlLinks,
};
