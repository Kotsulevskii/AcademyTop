const fetch = require('node-fetch');

async function fetchInBatches(urls, batchSize = 10) {
  for (let i = 0; i < urls.length; i += batchSize) {
    const batch = urls.slice(i, i + batchSize);
    const responses = await Promise.all(batch.map(url => fetch(url)));
    const results = await Promise.all(responses.map(r => r.json()));
    results.forEach(r => console.log('Получено:', r.id || r.title || r.name));
  }
}

module.exports = fetchInBatches