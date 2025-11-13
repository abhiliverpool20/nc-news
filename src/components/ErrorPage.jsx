import { Link } from "react-router-dom";

function ErrorPage() {
  return (
    <main style={{ maxWidth: 600, margin: "0 auto", padding: "1rem" }}>
      <h1>Page not found</h1>
      <p>
        The page you’re looking for doesn’t exist, has been moved, or the URL is
        incorrect.
      </p>
      <p>
        Please check the address, or go back to the{" "}
        <Link to="/">home page</Link>.
      </p>
    </main>
  );
}

export default ErrorPage;
