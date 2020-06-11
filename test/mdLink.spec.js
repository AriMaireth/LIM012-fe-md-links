const { mdLinks } = require('../src/mdLink.js');

describe('mdLinks', () => {
  it('mdLinks es una funcion', () => {
    expect(typeof mdLinks).toBe('function');
  });
  it('Deberia retornar una array de objetos con cinco propiedades', () => {
    const resultado = [{
      href: 'https://lms.laboratoria.la/courses',
      text: 'Laboratoria LMS',
      file: './test/pruebaRuta/prueba.md',
      status: 200,
      statusText: 'OK',
    }];

    mdLinks('./test/pruebaRuta/prueba.md', { options: true }).then((res) => {
      expect(res).toBe(resultado);
    });
  });
  it('Deberia retornar una array de objetos con tres propiedades', () => {
    const resultado = [{
      href: 'https://lms.laboratoria.la/courses',
      text: 'Laboratoria LMS',
      file: './test/pruebaRuta/prueba.md',
    }];
    mdLinks('./test/pruebaRuta/prueba.md', { validate: false }).then((res) => {
      expect(res).toBe(resultado);
    });
  });
});
