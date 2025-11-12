import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function TopicList() {
  const [topics, setTopics] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setIsLoading(true);
    setError(null);

    fetch("https://nc-news-api-ktmb.onrender.com/api/topics")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch topics");
        return res.json();
      })
      .then((data) => {
        setTopics(data.topics || []);
        setIsLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setIsLoading(false);
      });
  }, []);

  if (isLoading) return <p>Loading topics...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <main style={{ maxWidth: 800, margin: "0 auto", padding: "1rem" }}>
      <h1>Topics</h1>
      <ul style={{ listStyle: "none", padding: 0 }}>
        {topics.map((t) => (
          <li key={t.slug} style={{ marginBottom: "0.75rem" }}>
            <h2 style={{ margin: 0 }}>
              <Link to={`/topics/${t.slug}`}>{t.slug}</Link>
            </h2>
            {t.description && <p style={{ margin: 0 }}>{t.description}</p>}
          </li>
        ))}
      </ul>
    </main>
  );
}

export default TopicList;
