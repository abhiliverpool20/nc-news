import { useState } from "react";

function Votes({ articleId, initialVotes }) {
  const [votes, setVotes] = useState(initialVotes || 0);
  const [isUpdating, setIsUpdating] = useState(false);
  const [error, setError] = useState(null);

  const handleVote = (delta) => {
    if (isUpdating) return;
    setError(null);
    setIsUpdating(true);
    setVotes((v) => v + delta); // optimistic update

    fetch(`https://nc-news-api-ktmb.onrender.com/api/articles/${articleId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ inc_votes: delta }),
    })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to update votes");
        return res.json();
      })
      .catch(() => {
        // revert optimistic update on error
        setVotes((v) => v - delta);
        setError("Could not update vote. Please try again.");
      })
      .finally(() => setIsUpdating(false));
  };

  return (
    <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
      <button
        onClick={() => handleVote(1)}
        disabled={isUpdating}
        aria-label="Upvote article"
      >
        👍
      </button>
      <span aria-live="polite" aria-atomic="true">
        {votes}
      </span>
      <button
        onClick={() => handleVote(-1)}
        disabled={isUpdating}
        aria-label="Downvote article"
      >
        👎
      </button>
      {error && (
        <span role="alert" style={{ marginLeft: "0.5rem", color: "crimson" }}>
          {error}
        </span>
      )}
    </div>
  );
}

export default Votes;
