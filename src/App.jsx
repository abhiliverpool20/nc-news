import { Routes, Route } from "react-router-dom";
import HomePage from "./components/HomePage";
import SingleArticlePage from "./components/SingleArticlePage";
import "./App.css";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/articles/:article_id" element={<SingleArticlePage />} />
      </Routes>
    </div>
  );
}

export default App;
