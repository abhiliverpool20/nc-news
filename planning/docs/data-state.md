# Data & State Plan

## Global (App)

- **loggedInUser**: `{ username: "jessjelly" }` (hardcoded)
- **Routing**: React Router controls which view renders.

### Provided to children via props:

- `loggedInUser` → Header, NewComment, Votes (if needed).

---

## HomePage (`/`)

### Data fetching

- **Articles list**: fetch `GET /api/articles` with query params from URL: `topic`, `sort_by`, `order`, `page`.
- **Topics**: fetch `GET /api/topics` for TopicFilter options.

### Local state

- None beyond derived state from the URL’s search params.

### URL search params (source of truth)

- `topic`, `sort_by`, `order`, `page`.

### Props to children

- `ArticlesList` ← `articles` array
- `TopicFilter` ← `topics`, current `topic`
- `SortControls` ← current `sort_by`, `order`
- `Pagination` ← current `page`, `total_count`

---

## ArticlesList

### Receives

- `articles` array

### Renders

- `ArticleCard` (one per article)

---

## SingleArticlePage (`/articles/:article_id`)

### Data fetching

- **Article**: `GET /api/articles/:article_id`
- **Comments**: `GET /api/articles/:article_id/comments`

### Local state

- `article` (object)
- `comments` (array)
- `isLoading` / `error` flags for both requests

### Props to children

- `Article` ← `article`
- `Votes` ← `article_id`, current `votes`
- `CommentList` ← `comments`
- `NewComment` ← `article_id`, `loggedInUser`, callback `onAddComment`

---

## Votes

### Behavior

- Optimistically PATCH votes: `PATCH /api/articles/:article_id` with `{ inc_votes: ±1 }`.
- On failure, revert optimistic update and show error.

### Receives

- `article_id`, `initialVotes` or handler to update parent’s `article.votes`.

---

## NewComment

### Behavior

- POST new comment: `POST /api/articles/:article_id/comments` with `{ username, body }`.
- On success, prepend new comment to `comments` in parent via `onAddComment`.

### Receives

- `article_id`, `loggedInUser`, `onAddComment`

---

## CommentList / CommentCard

### Optional delete (if implemented)

- `DELETE /api/comments/:comment_id`, then remove from local `comments`.

---

## ErrorPage

- Rendered on unmatched routes or unrecoverable errors.
