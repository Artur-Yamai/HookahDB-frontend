import { BrowserRouter, Routes, Route } from "react-router-dom";
import UserStore from "./store/user";
import { MainLayout } from "./components";
import { Authorization, HomePage, NotFound } from "./pages";
import "./App.scss";

export default function App() {
  // Если юзер авторизировался ранее и его токен еще жив
  // Тогда происходит автоматическая авторизация
  UserStore.autoAuth();

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
