// const path = require('path');
const {
  itsAbsolute, itsAFile, fileExtension, searchInDirectory, extractHtmlLinks,
} = require('../src/index.js');

describe('itsAbsolute', () => {
  it('itsAbsolute es una funcion', () => {
    expect(typeof itsAbsolute).toBe('function');
  });
  it('retorna todas las rutas convertidas a absolutas', () => {
    const ruta = './src/pruebaRuta/prueba.js';
    const rutaAbsoluta = 'C:\\Users\\galle\\LIM012-fe-md-links\\src\\pruebaRuta\\prueba.js';
    expect(itsAbsolute(ruta)).toMatch(rutaAbsoluta);
  });
});

describe('itsAFile', () => {
  it('itsAFile es una funcion', () => {
    expect(typeof itsAFile).toBe('function');
  });
  it('Retorna true para los archivos', () => {
    const ruta = './test/pruebaRuta/prueba.js';
    expect(itsAFile(ruta)).toBe(true);
  });
  it('Deberia retornar false si no es archivo', () => {
    const ruta = 'C:/Users/galle/LIM012-fe-md-links/test/pruebaRuta';
    expect(itsAFile(ruta)).toBe(false);
  });
});

describe('fileExtension', () => {
  it('fileExtension es una funcion', () => {
    expect(typeof fileExtension).toBe('function');
  });
  it('Retorna true si la extension del archivo es MD', () => {
    const ruta = './test/pruebaRuta/prueba.md';
    expect(fileExtension(ruta)).toBe(true);
  });
  it('Retorna false si la extension del archivo no es MD', () => {
    const ruta = './test/pruebaRuta/prueba.js';
    expect(fileExtension(ruta)).toBe(false);
  });
});

describe('searchInDirectory', () => {
  it('searchInDirectory es una funcion', () => {
    expect(typeof searchInDirectory).toBe('function');
  });
  it('Deberia recorrer el directorio y retornar un array con solo los archivos MD', () => {
    const ruta = './test/pruebaRuta';
    const resultado = ['C:\\Users\\galle\\LIM012-fe-md-links\\test\\pruebaRuta\\prueba.md'];
    expect(searchInDirectory(ruta)).toStrictEqual(resultado);
  });
});

describe('extractHtmlLinks', () => {
  it('extractHtmlLinks es una funcion', () => {
    expect(typeof extractHtmlLinks).toBe('function');
  });
  it('Creamos un array de objetos con las propiedades href, text y file encontradas en los archivos .MD', () => {
    const ruta = [{
      href: 'https://lms.laboratoria.la/courses',
      text: 'Laboratoria LMS',
      file: 'C:\\Users\\galle\\LIM012-fe-md-links\\test\\pruebaRuta\\prueba.md',
    }];
    const resultado = [{
      href: 'https://lms.laboratoria.la/courses',
      text: 'Laboratoria LMS',
      file: 'C:\\Users\\galle\\LIM012-fe-md-links\\test\\pruebaRuta\\prueba.md',
    }];

    expect(extractHtmlLinks(ruta)).toBe(resultado);
  });
});
