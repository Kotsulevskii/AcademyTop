/*
function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function run() {
  await delay(1000);
  console.log("Прошла 1 секунда");

  await delay(2000);
  console.log("Прошло ещё 2 секунды");
}
run();
/*
const fs = require('fs').promises;

async function readFileContent() {
  const content = await fs.readFile('data.txt', 'utf8');
  console.log("Содержимое файла:", content);
}
readFileContent();
*//*
const fs = require('fs').promises;

async function readFileContent() {
  try {
    const content = await fs.readFile('data.txt', 'utf8');
    console.log("Содержимое файла:", content);
  } catch (error) {
    console.error("Ошибка при чтении файла:", error.message);
  }
}
readFileContent();
*//*
const fetch = require('node-fetch'); // npm install node-fetch@2

async function fetchUsers() {
  const res = await fetch('https://jsonplaceholder.typicode.com/users');
  const users = await res.json();
  users.forEach(user => console.log(user.name));
}

fetchUsers();

async function fetchPosts() {
  const ids = [1, 2, 3];
  const urls = ids.map(id => `https://jsonplaceholder.typicode.com/posts/${id}`);
  
  const responses = await Promise.all(urls.map(url => fetch(url)));
  const posts = await Promise.all(responses.map(res => res.json()));

  posts.forEach(post => console.log(post.title));
}

fetchPosts();
*/
/*
const fs = require('fs').promises;

function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function logMessage(message) {
  await delay(500);
  await fs.appendFile('log.txt', message + '\n');
  console.log('Записано:', message);
}

async function runLogger() {
  await logMessage("Первое сообщение");
  await logMessage("Второе сообщение");
  await logMessage("Третье сообщение");
}

runLogger();

const fetch = require('node-fetch');

async function fetchInBatches(urls, batchSize = 10) {
  for (let i = 0; i < urls.length; i += batchSize) {
    const batch = urls.slice(i, i + batchSize);
    const responses = await Promise.all(batch.map(url => fetch(url)));
    const results = await Promise.all(responses.map(r => r.json()));
    results.forEach(r => console.log('Получено:', r.id || r.title || r.name));
  }
}

const urls = Array.from({ length: 30 }, (_, i) => `https://jsonplaceholder.typicode.com/posts/${i + 1}`);

fetchInBatches(urls);
*/
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
(async () => {
  try {
    const res = await fetchWithTimeout('https://jsonplaceholder.typicode.com/posts/1', 1000);
    const data = await res.json();
    console.log(data);
  } catch (err) {
    console.error("Ошибка:", err.message);
  }
})();
//
async function getPostsByUser(userId) {
  const res = await fetch(`https://jsonplaceholder.typicode.com/users/${userId}/posts`);
  return await res.json();
}

async function getCommentsForPost(postId) {
  const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${postId}/comments`);
  return await res.json();
}

async function processUsersSequentially(userIds) {
  for (const id of userIds) {
    const posts = await getPostsByUser(id);
    console.log(`Пользователь ${id} — ${posts.length} постов`);
    
    if (posts.length > 0) {
      const comments = await getCommentsForPost(posts[0].id);
      console.log(`Первый пост имеет ${comments.length} комментариев`);
    }
  }
}
processUsersSequentially([1, 2, 3]);
