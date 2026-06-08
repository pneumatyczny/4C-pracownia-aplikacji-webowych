import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function Post() {
  const { id } = useParams();

  const [post, setPost] = useState(null);
  const [user, setUser] = useState(null);
  const [comments, setComments] = useState([]);

  useEffect(() => {
    // POST
    fetch(`https://jsonplaceholder.typicode.com/posts/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setPost(data);

        // USER
        return fetch(
          `https://jsonplaceholder.typicode.com/users/${data.userId}`,
        );
      })
      .then((res) => res.json())
      .then((userData) => setUser(userData));

    // COMMENTS
    fetch(`https://jsonplaceholder.typicode.com/posts/${id}/comments`)
      .then((res) => res.json())
      .then((data) => setComments(data));
  }, [id]);

  if (!post) return <p>Ładowanie...</p>;

  return (
    <div>
      <h2>{post.title}</h2>
      <p>{post.body}</p>

      {user && (
        <div className="user-box">
          <h3>Autor</h3>
          <p>{user.name}</p>
          <p>{user.email}</p>
        </div>
      )}

      <h3>Komentarze</h3>

      {comments.map((c) => (
        <div key={c.id} className="comment">
          <b>{c.name}</b>
          <p>{c.body}</p>
        </div>
      ))}
    </div>
  );
}
