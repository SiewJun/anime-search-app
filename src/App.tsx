import { BrowserRouter, Routes, Route } from "react-router-dom";
import { SearchPage } from "./pages/SearchPage";
import { AnimeDetailPage } from "./pages/AnimeDetailPage";
import { ScrollToTop } from "./components/ScrollToTop";

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<SearchPage />} />
        <Route path="/anime/:id" element={<AnimeDetailPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
