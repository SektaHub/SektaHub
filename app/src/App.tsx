import { Routes, Route, BrowserRouter } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Layout from "./layout/Layout";
import NewsPage from "./pages/NewsPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="/news" element={<NewsPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
