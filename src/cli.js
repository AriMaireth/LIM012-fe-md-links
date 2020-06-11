const process = require('process');
const { mdLinks } = require('./mdLink');

const printOnTerminal = (route, argument) => mdLinks(route, { validate: true })
  .then((res) => {
    const totalLinks = [];
    res.forEach((element) => totalLinks.push(element.href));
    const totalUniqueLinks = new Set(totalLinks);
    if (argument) {
      const printFoundLinks = `
      Final Stats:
      TOTAL: ${totalLinks.length}
      UNIQUE: ${totalUniqueLinks.size}
        `;
      return printFoundLinks;
    }
    const brokenLinks = res.filter((link) => link.status !== 200);
    const printBrokenLinks = `
    Final Stats:
    TOTAL: ${totalLinks.length}
    UNIQUE: ${totalUniqueLinks.size}
    BROKEN: ${brokenLinks.size ? brokenLinks.size : 0}
      `;
    return printBrokenLinks;
  });


const help = `
          mdLink <path to file> [option]
     ----------------OPTIONS-----------------
     mdLink <path to file> --validate
     mdLink <path to file> --stats
     mdLink <path to file> --validate --stats
     ----------------------------------------
     `;

const argvs = process.argv;
const route = argvs[2] ? argvs[2] : '';
const option1 = argvs[3] ? argvs[3] : '';
const option2 = argvs[4] ? argvs[4] : '';

if (option2.length > 0) {
  if ((option1 === '--stats' && option2 === '--validate') || (option2 === '--stats' && option1 === '--validate')) {
    printOnTerminal(route, false).then((resp) => console.log(resp))
      .catch((error) => console.log(`Error${error} generado n/ ${help}`));
  }
} else if (route.length <= 0) {
  console.log(`ERROR GENERADO verifique su ruta ${help}`);
} else if (route.length > 0) {
  const option1toString = option1.toString();
  if (option1toString === '--validate') {
    mdLinks(route, { validate: true }).then((resp) => console.log(resp))
      .catch((error) => console.log(`Error${error} generado n/ ${help}`));
  }
  if (option1toString === '--stats') {
    printOnTerminal(route, true).then((resp) => console.log(resp))
      .catch((error) => console.log(`Error${error} generado n/ ${help}`));
  }
}
