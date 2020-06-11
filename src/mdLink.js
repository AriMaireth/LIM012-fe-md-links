const { isValidate } = require('./validate');
const { extractHtmlLinks } = require('./index');

const mdLinks = (route, options) => {
  const links = new Promise((resolve) => {
    if (options.validate === true) {
      resolve(isValidate(route));
    }
    if (options.validate === false) {
      resolve(extractHtmlLinks(route));
    }
  });
  return links;
};

// mdLinks('./test/pruebaRuta/prueba.md', { validate: true }).then((res) => {
//   console.log(res);
// })
//   .catch((err) => {
//     console.log(err);
//   });

module.exports = { mdLinks };
