import { useState } from "react";

function NewComment({ articleId, username = "jessjelly", onSuccess }) {
  const [body, setBody] = useState("");
  const [isPosting, setIsPosting] = useState(false);
  const [error, setError] = useState(null);

  const canSubmit = body.trim().length > 0 && !isPosting;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!canSubmit) return;

    setIsPosting(true);
    setError(null);

    fetch(
      `https://nc-news-api-ktmb.onrender.com/api/articles/${articleId}/comments`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, body }),
      }
    )
      .then((res) => {
        if (!res.ok) throw new Error("Failed to post comment");
        return res.json();
      })
      .then(() => {
        setBody("");
        if (onSuccess) onSuccess();
      })
      .catch(() => {
        setError("Could not post comment. Please try again.");
      })
      .finally(() => setIsPosting(false));
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{ margin: "1rem 0" }}
      aria-label="Add a comment"
    >
      <label
        htmlFor="new-comment"
        style={{ display: "block", marginBottom: 4 }}
      >
        Add a comment as <strong>{username}</strong>
      </label>
      <textarea
        id="new-comment"
        value={body}
        onChange={(e) => setBody(e.target.value)}
        rows={4}
        style={{ width: "100%", padding: "0.5rem" }}
        placeholder="Write your comment…"
      />
      <div
        style={{
          marginTop: 8,
          display: "flex",
          alignItems: "center",
          gap: "0.5rem",
        }}
      >
        <button type="submit" disabled={!canSubmit}>
          {isPosting ? "Posting…" : "Post comment"}
        </button>
        {error && (
          <span role="alert" style={{ color: "crimson" }}>
            {error}
          </span>
        )}
      </div>
    </form>
  );
}

export default NewComment;
