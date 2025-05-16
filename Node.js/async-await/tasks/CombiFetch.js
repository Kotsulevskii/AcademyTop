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

module.exports = processUsersSequentially