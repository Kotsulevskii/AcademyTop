const fetch = require('node-fetch'); // npm install node-fetch@2

async function fetchUsers() {
  const res = await fetch('https://jsonplaceholder.typicode.com/users');
  const users = await res.json();
  users.forEach(user => console.log(user.name));
}

module.exports = fetchUsers