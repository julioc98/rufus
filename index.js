const request = require('request');
// const cheerio = require('cheerio');

// const michelin = [
//   {
//     url: 'http://www.michelin.com.ar/AR/es/tires/BMW/X1/2017/sDRIVE%2020i.html',
//     words: ['No podemos encontrar ningún neumático que coincida con tu vehículo.', 'oi'],
//   },
// ];

const michelin = [
  {
    url: 'http://www.michelin.com.ar/AR/es/tires/215/65/15/96/H.html',
    words: ['Encontramos tus neumáticos', 'coincide con tu búsqueda'],
  },
  {
    url: 'http://www.michelin.com.ar/AR/es/tires/BMW/X1/2017/sDRIVE%2020i.html',
    words: ['No podemos encontrar ningún neumático que coincida con tu vehículo.', 'coincide con tu búsqueda'],
  },
];

// const google = [
//   {
//     url: 'http://google.com',
//     words: ['google', 'oi'],
//   },
// ];

function searchWord(body, words) {
  const res = words.map((word) => {
    const result = body.search(word);
    // console.log(body);
    if (result !== -1) {
      console.log('OK ', word, result);
      return true;
    }
    console.log('Not OK', word, result);
    return false;
  });
  return res;
}

function searchWordInPage(struct) {
  const result = struct.map((item) => {
    // console.log(item.url);
    request(item.url, (error, response, body) => {
      if (!error) {
        return searchWord(body, item.words);
      }
      return error;
    });
  });
  return result;
  // return result;
  // console.log(struct['http://www.michelin.com.ar/AR/es/tires/215/65/15/96/H.html']);
}

function main() {
  const resut = searchWordInPage(michelin);
  // console.log(resut);
}

main();
