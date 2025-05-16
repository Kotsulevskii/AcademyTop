let run = require('./tasks/Delay')
let readFile = require('./tasks/ReadFile')
let fetchUsers = require('./tasks/FetchUsers')
let fetchPosts = require('./tasks/FetchPosts')
let runLogger = require('./tasks/Logger')
let fetchInBatches = require('./tasks/FetchInBatches')
let fetchInTimeout = require('./tasks/FetchImTimeout')
let processUsersSequentially = require('./tasks/CombiFetch')

run();
readFile()
fetchUsers();
fetchPosts();
runLogger();
fetchInTimeout()

const urls = Array.from({ length: 30 }, (_, i) => `https://jsonplaceholder.typicode.com/posts/${i + 1}`);
fetchInBatches(urls);

processUsersSequentially([1, 2, 3])
