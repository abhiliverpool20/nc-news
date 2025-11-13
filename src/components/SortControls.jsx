import { useSearchParams } from "react-router-dom";

function SortControls() {
  const [searchParams, setSearchParams] = useSearchParams();

  const sort_by = searchParams.get("sort_by") || "created_at";
  const order = searchParams.get("order") || "desc";

  const updateParam = (key, value) => {
    const next = new URLSearchParams(searchParams);
    next.set(key, value);
    // reset page if you add pagination later
    next.delete("page");
    setSearchParams(next, { replace: true });
  };

  return (
    <div
      style={{
        display: "flex",
        gap: "0.75rem",
        alignItems: "center",
        margin: "0.75rem 0",
      }}
    >
      <label>
        Sort by{" "}
        <select
          value={sort_by}
          onChange={(e) => updateParam("sort_by", e.target.value)}
        >
          <option value="created_at">Date</option>
          <option value="comment_count">Comments</option>
          <option value="votes">Votes</option>
        </select>
      </label>

      <label>
        Order{" "}
        <select
          value={order}
          onChange={(e) => updateParam("order", e.target.value)}
        >
          <option value="desc">Descending</option>
          <option value="asc">Ascending</option>
        </select>
      </label>
    </div>
  );
}

export default SortControls;
