// import { Routes, Route } from "react-router-dom";
// import { MainLayout } from "../../components";
import "./PagesWrapper.scss";

export function PagesWrapper() {
  const some: number[] = [];

  for (let index = 0; index < 15; index++) {
    some.push(index);
  }

  return (
    <div className="routes-wrapper">
      {/* <h1>RoutesWrapper</h1> */}
      {some.map((_, i) => {
        return <div className="some" key={i} />;
      })}
      {/* <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index={true} element={<div>Home page</div>} />
          <Route path="about" element={<div>About page</div>} />
          <Route path="contacts" element={<div>Contacts page</div>} />
        </Route>
      </Routes> */}
    </div>
  );
}
