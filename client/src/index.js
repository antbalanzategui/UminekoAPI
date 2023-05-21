import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./Header";
import Home from "./Home";
import Projects from "./Projects";
import NoPage from "./NoPage";
import Project from "./Project"
import Documentation from "./Documentation"


export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Header />}>
          <Route index element={<Home />} />
          <Route path="documentation" element={<Documentation />} />
          <Route path="projects" element={<Projects />} />
          <Route path="/projects/:id" element={<Project />} />
          <Route path="*" element={<NoPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);