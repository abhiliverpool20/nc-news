import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Votes from "./Votes";
import CommentList from "./CommentList";
import NewComment from "./NewComment";

function SingleArticlePage() {
  const { article_id } = useParams();
  const [article, setArticle] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [refreshKey, setRefreshKey] = useState(0); // for refreshing comments after posting

  useEffect(() => {
    setIsLoading(true);
    setError(null);

    fetch(`https://nc-news-api-ktmb.onrender.com/api/articles/${article_id}`)
      .then((res) => {
        if (!res.ok) throw new Error(`Failed to fetch article ${article_id}`);
        return res.json();
      })
      .then((data) => {
        setArticle(data.article);
        setIsLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setIsLoading(false);
      });
  }, [article_id]);

  if (isLoading) return <p>Loading article...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!article) return <p>Article not found.</p>;

  return (
    <main style={{ maxWidth: 800, margin: "0 auto", padding: "1rem" }}>
      <h1>{article.title}</h1>

      <p>
        <strong>Author:</strong> {article.author} &nbsp;|&nbsp;
        <strong>Topic:</strong> {article.topic} &nbsp;|&nbsp;
        <strong>Published:</strong>{" "}
        {new Date(article.created_at).toLocaleDateString()}
      </p>

      {article.article_img_url && (
        <img
          src={article.article_img_url}
          alt={article.title}
          style={{ width: "100%", height: "auto", margin: "1rem 0" }}
        />
      )}

      <article style={{ lineHeight: 1.6, fontSize: "1.05rem" }}>
        {article.body}
      </article>

      <hr style={{ margin: "1.5rem 0" }} />

      <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
        <div>
          <strong>Comments:</strong> {article.comment_count}
        </div>
        <Votes articleId={article.article_id} initialVotes={article.votes} />
      </div>

      {/* New comment form */}
      <NewComment
        articleId={article.article_id}
        onSuccess={() => setRefreshKey((k) => k + 1)}
      />

      {/* Comments list */}
      <CommentList articleId={article_id} refreshKey={refreshKey} />
    </main>
  );
}

export default SingleArticlePage;
