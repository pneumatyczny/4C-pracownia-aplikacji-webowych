import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";

const fetchPost = async (id) => {
  const res = await fetch(`http://localhost:5000/posts/${id}`);
  return res.json();
};

const fetchUser = async (id) => {
  const res = await fetch(`http://localhost:5000/users/${id}`);
  return res.json();
};

const fetchComments = async (id) => {
  const res = await fetch(`http://localhost:5000/posts/${id}/comments`);
  return res.json();
};

export default function Post() {
  const [text, setText] = useState("");
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: async (newComment) => {
      const res = await fetch(`http://localhost:5000/posts/${id}/comments`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newComment),
      });
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["comments", id]);
    },
  });
  const addComment = () => {
    mutation.mutate({ body: text });
    setText("");
  };
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
      <div className="comment-form">
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Dodaj komentarz"
        />

        <button onClick={addComment}>Dodaj</button>
      </div>
    </div>
  );
}
