import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Posts() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/posts")
      .then((res) => res.json())
      .then((data) => setPosts(data));
  }, []);

  return (
    <div>
      <h2>Lista postów</h2>

      {posts.slice(0, 10).map((post) => (
        <div key={post.id} className="post-card">
          <h3>{post.title}</h3>
          <p>{post.body.substring(0, 100)}...</p>

          <Link to={`/post/${post.id}`}>Zobacz więcej</Link>
        </div>
      ))}
    </div>
  );
}
