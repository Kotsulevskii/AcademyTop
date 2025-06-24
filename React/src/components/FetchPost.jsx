import { useState, useEffect } from "react";

function Posts() {
    const [posts, setPosts] = useState([]);
  
    useEffect(() => {
      fetch('https://jsonplaceholder.typicode.com/posts?_limit=5')
        .then(res => res.json())
        .then(data => setPosts(data));
    }, []);
  
    return (
      <div>
        <h2>Последние посты</h2>
        {posts.map(post => (
          <div key={post.id}>
            <h3>{post.title}</h3>
            <p>{post.body}</p>
          </div>
        ))}
      </div>
    );
  }

export default Posts;