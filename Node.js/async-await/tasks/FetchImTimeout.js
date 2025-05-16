const fetch = require('node-fetch');
function fetchWithTimeout(url, timeoutMs) {
  return new Promise((resolve, reject) => {
    const timeout = setTimeout(() => reject(new Error('Timeout')), timeoutMs);
    fetch(url)
      .then(res => {
        clearTimeout(timeout);
        resolve(res);
      })
      .catch(err => {
        clearTimeout(timeout);
        reject(err);
      });
  });
}

async function runFetch() {
  try {
    const res = await fetchWithTimeout('https://jsonplaceholder.typicode.com/posts/1', 1000);
    const data = await res.json();
    console.log(data);
  } catch (err) {
    console.error("Ошибка:", err.message);
  }
}

module.exports = runFetch