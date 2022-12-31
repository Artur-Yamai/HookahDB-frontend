import { BrowserRouter } from "react-router-dom";
import { NavBar, PagesWrapper } from "./components";
import "./App.scss";

function App() {
  return (
    <BrowserRouter>
      <div className="app">
        <NavBar />
        <PagesWrapper />
      </div>
    </BrowserRouter>
  );
}

export default App;
