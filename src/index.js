// const os = require('os');
const path = require('path');
// const fs = require('fs');
// const itsAbsolute = (route) => path.isAbsolute(route);

const itsAbsolute = (route) => {
  if (path.isAbsolute(route) === true) {
    return route;
  } return (path.resolve(route));
};


console.log(itsAbsolute('C:/Users/galle/LIM012-fe-md-links/src/pruebaRuta/prueba.md'));
console.log(itsAbsolute('./src/pruebaRuta/prueba.js'));
