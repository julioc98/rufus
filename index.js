const request = require('request-promise-native');
// const cheerio = require('cheerio');


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


async function searchWord(url, body, words) {
  const res = words.map((word) => {
    const result = body.search(word);
    // console.log(body);
    if (result !== -1) {
      // console.log('OK ', word, result);
      return { url, ok: true, word };
    }
    // console.log('Not OK', word, result);
    return { url, ok: false, word };
  });
  return res;
}


function main() {
  const pro = michelin.map((item) => {
    const req = request(item.url);
    const res = req.then((body) => {
      const ret = searchWord(item.url, body, item.words);
      return ret;
    });
    return res;
  });

  Promise.all(pro).then(console.log);
  // Promise.all(pro).then(test).then(console.log);
}

main();
