import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";

const fetchPosts = async () => {
  const res = await fetch("http://localhost:5000/posts");
  return res.json();
};

export default function Posts() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["posts"],
    queryFn: fetchPosts,
  });

  if (isLoading) return <p>Ładowanie...</p>;
  if (isError) return <p>Błąd ładowania</p>;

  return (
    <div>
      <h2>Lista postów</h2>

      {data.slice(0, 10).map((post) => (
        <div key={post.id} className="post-card">
          <h3>{post.title}</h3>
          <p>{post.body.slice(0, 100)}...</p>
          <Link to={`/post/${post.id}`}>Zobacz</Link>
        </div>
      ))}
    </div>
  );
}
