import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./Header";
import Home from "./Home";
import Showcase from "./Showcase";
import NoPage from "./NoPage";
import SoundTrackDisplay from "./SoundTrackDisplay"
import Documentation from "./Documentation"
import Contact from "./Contact"


export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Header />}>
          <Route index element={<Home />} />
          <Route path="documentation" element={<Documentation />} />
          <Route path="showcase" element={<Showcase/>} />
          <Route path="/soundtrack/:id" element={<SoundTrackDisplay />} />
          <Route path="/contact" element={<Contact/>}/>
          <Route path="*" element={<NoPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);