import { BrowserRouter, Routes, Route } from "react-router-dom";
import { MainLayout } from "./components";
import { Authorization, HomePage, NotFound } from "./pages";
import "./App.scss";

export default function App() {
  return (
    <BrowserRouter>
      <div className="app">
        <Routes>
          <Route path="/auth" element={<Authorization />} />
          <Route path="/" element={<MainLayout />}>
            <Route index={true} element={<HomePage />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}
