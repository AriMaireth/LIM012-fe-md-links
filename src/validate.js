const fetch = require('node-fetch');
const { extractHtmlLinks } = require('./index');

const isValidate = (route) => {
  const extractLinks = extractHtmlLinks(route);
  const validate = extractLinks.map((property) => {
    const fetchPropertys = fetch(property.href).then((res) => {
      const allProperty = {
        href: property.href,
        text: property.text,
        file: property.file,
        status: res.status,
        statusText: res.statusText,
      };
      return allProperty;
    })
      .catch((err) => console.error(`ERROR: ${err}`));
    return fetchPropertys;
  });
  return Promise.all(validate);
};

module.exports = {
  isValidate,
};
