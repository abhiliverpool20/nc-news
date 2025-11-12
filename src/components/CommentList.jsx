import { useEffect, useState } from "react";

function CommentList({ articleId, refreshKey = 0, currentUser = "jessjelly" }) {
  const [comments, setComments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [deletingId, setDeletingId] = useState(null);

  useEffect(() => {
    setIsLoading(true);
    setError(null);

    fetch(
      `https://nc-news-api-ktmb.onrender.com/api/articles/${articleId}/comments`
    )
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch comments");
        return res.json();
      })
      .then((data) => {
        setComments(data.comments || []);
        setIsLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setIsLoading(false);
      });
  }, [articleId, refreshKey]);

  const handleDelete = (comment_id) => {
    if (deletingId) return; // prevent duplicate deletes
    setDeletingId(comment_id);

    fetch(`https://nc-news-api-ktmb.onrender.com/api/comments/${comment_id}`, {
      method: "DELETE",
    })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to delete comment");
        // remove from list
        setComments((prev) => prev.filter((c) => c.comment_id !== comment_id));
      })
      .catch(() => {
        alert("Could not delete comment. Please try again.");
      })
      .finally(() => setDeletingId(null));
  };

  if (isLoading) return <p>Loading comments...</p>;
  if (error) return <p>Error: {error}</p>;
  if (comments.length === 0) return <p>No comments yet.</p>;

  return (
    <section aria-label="Comments" style={{ marginTop: "1.5rem" }}>
      <h2>Comments</h2>
      <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
        {comments.map((c) => (
          <li
            key={c.comment_id}
            style={{
              border: "1px solid #ddd",
              borderRadius: 8,
              padding: "0.75rem 1rem",
              marginBottom: "0.75rem",
              display: "flex",
              gap: "0.75rem",
              justifyContent: "space-between",
              alignItems: "start",
            }}
          >
            <div style={{ flex: 1 }}>
              <p style={{ margin: 0 }}>
                <strong>{c.author}</strong> &middot;{" "}
                {new Date(c.created_at).toLocaleString()}
              </p>
              <p style={{ margin: "0.5rem 0" }}>{c.body}</p>
              <p style={{ margin: 0 }}>
                <small>Votes: {c.votes}</small>
              </p>
            </div>

            {c.author === currentUser && (
              <div>
                <button
                  onClick={() => handleDelete(c.comment_id)}
                  disabled={deletingId === c.comment_id}
                  aria-label="Delete your comment"
                >
                  {deletingId === c.comment_id ? "Deleting…" : "Delete"}
                </button>
              </div>
            )}
          </li>
        ))}
      </ul>
    </section>
  );
}

export default CommentList;
