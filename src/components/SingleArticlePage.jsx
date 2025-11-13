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
  const [refreshKey, setRefreshKey] = useState(0);
  const currentUser = "jessjelly";

  useEffect(() => {
    setIsLoading(true);
    setError(null);

    fetch(`https://nc-news-api-ktmb.onrender.com/api/articles/${article_id}`)
      .then((res) => {
        if (res.status === 404) {
          throw new Error("NOT_FOUND");
        }
        if (!res.ok) {
          throw new Error("FETCH_FAILED");
        }
        return res.json();
      })
      .then((data) => {
        setArticle(data.article);
        setIsLoading(false);
      })
      .catch((err) => {
        if (err.message === "NOT_FOUND") {
          setError("This article does not exist.");
        } else {
          setError("We couldn’t load this article. Please try again later.");
        }
        setIsLoading(false);
      });
  }, [article_id]);

  if (isLoading) return <p>Loading article...</p>;
  if (error) {
    return (
      <main style={{ maxWidth: 600, margin: "0 auto", padding: "1rem" }}>
        <h1>Article error</h1>
        <p>{error}</p>
      </main>
    );
  }
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

      <NewComment
        articleId={article.article_id}
        onSuccess={() => setRefreshKey((k) => k + 1)}
      />

      <CommentList
        articleId={article_id}
        refreshKey={refreshKey}
        currentUser={currentUser}
      />
    </main>
  );
}

export default SingleArticlePage;
