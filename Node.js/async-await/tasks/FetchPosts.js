
async function fetchPosts() {
  const ids = [1, 2, 3];
  const urls = ids.map(id => `https://jsonplaceholder.typicode.com/posts/${id}`);
  
  const responses = await Promise.all(urls.map(url => fetch(url)));
  const posts = await Promise.all(responses.map(res => res.json()));

  posts.forEach(post => console.log(post.title));
}

module.exports = fetchPosts