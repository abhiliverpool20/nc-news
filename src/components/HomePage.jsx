import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import SortControls from "./SortControls";

function HomePage() {
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchParams] = useSearchParams();

  const sort_by = searchParams.get("sort_by") || "created_at";
  const order = searchParams.get("order") || "desc";

  useEffect(() => {
    setIsLoading(true);
    setError(null);

    const url = new URL("https://nc-news-api-ktmb.onrender.com/api/articles");
    url.searchParams.set("sort_by", sort_by);
    url.searchParams.set("order", order);

    fetch(url.toString())
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch articles");
        return res.json();
      })
      .then((data) => {
        setArticles(data.articles);
        setIsLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setIsLoading(false);
      });
  }, [sort_by, order]);

  if (isLoading) return <p>Loading articles...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <main>
      <h1>All Articles</h1>

      <SortControls />

      <ul>
        {articles.map((article) => (
          <li key={article.article_id} style={{ marginBottom: "1.5rem" }}>
            <h2 style={{ marginBottom: "0.25rem" }}>
              <Link to={`/articles/${article.article_id}`}>
                {article.title}
              </Link>
            </h2>
            <p>
              <strong>Author:</strong> {article.author} |{" "}
              <strong>Topic:</strong> {article.topic}
            </p>
            <p>
              Votes: {article.votes} | Comments: {article.comment_count}
            </p>
            <p>
              Published: {new Date(article.created_at).toLocaleDateString()}
            </p>
            {article.article_img_url && (
              <img
                src={article.article_img_url}
                alt={article.title}
                width="300"
              />
            )}
            <hr />
          </li>
        ))}
      </ul>
    </main>
  );
}

export default HomePage;
