import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

const fetchPost = async (id) => {
  const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`);
  return res.json();
};

const fetchUser = async (id) => {
  const res = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`);
  return res.json();
};

const fetchComments = async (id) => {
  const res = await fetch(
    `https://jsonplaceholder.typicode.com/posts/${id}/comments`,
  );
  return res.json();
};

export default function Post() {
  const { id } = useParams();

  const { data: post, isLoading } = useQuery({
    queryKey: ["post", id],
    queryFn: () => fetchPost(id),
  });

  const { data: user } = useQuery({
    queryKey: ["user", post?.userId],
    queryFn: () => fetchUser(post.userId),
    enabled: !!post,
  });

  const { data: comments } = useQuery({
    queryKey: ["comments", id],
    queryFn: () => fetchComments(id),
  });

  if (isLoading) return <p>Ładowanie posta...</p>;

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

      {comments?.map((c) => (
        <div key={c.id} className="comment">
          <b>{c.name}</b>
          <p>{c.body}</p>
        </div>
      ))}
    </div>
  );
}
