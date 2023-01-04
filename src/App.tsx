import { BrowserRouter, Routes, Route } from "react-router-dom";
import { MainLayout } from "./components";
import { Autorization } from "./pages";
import "./App.scss";

export default function App() {
  return (
    <BrowserRouter>
      <div className="app">
        <Routes>
          <Route path="/" element={<MainLayout />}></Route>

          <Route path="/auth" element={<Autorization />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}
