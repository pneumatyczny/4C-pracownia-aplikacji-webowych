import { Link, Outlet } from "react-router-dom";
import "../styles/main.scss";

export default function Layout() {
  return (
    <div className="app">
      <header className="nav">
        <div className="logo">MyBlog</div>

        <nav className="nav-links">
          <Link to="/">Home</Link>
          <Link to="/post">Post</Link>
          <Link to="/categories">Categories</Link>
        </nav>
      </header>

      <main className="container">
        <Outlet />
      </main>

      <footer className="footer">
        <p>© 2026 MyBlog • built with React</p>
      </footer>
    </div>
  );
}
