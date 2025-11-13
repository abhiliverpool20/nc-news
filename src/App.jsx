import { Routes, Route } from "react-router-dom";
import HomePage from "./components/HomePage";
import SingleArticlePage from "./components/SingleArticlePage";
import TopicList from "./components/TopicList";
import TopicArticles from "./components/TopicArticles";
import ErrorPage from "./components/ErrorPage";
import "./App.css";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/articles/:article_id" element={<SingleArticlePage />} />
        <Route path="/topics" element={<TopicList />} />
        <Route path="/topics/:topic" element={<TopicArticles />} />
        {/* catch-all for non-existent paths */}
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </div>
  );
}

export default App;
