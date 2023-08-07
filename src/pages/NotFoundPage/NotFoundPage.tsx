import { Helmet } from "react-helmet";
import "./NotFoundPage.scss";

export const NotFoundPage = () => {
  return (
    <>
      <Helmet>
        <title>Not Found</title>
      </Helmet>
      <div className="not-found">
        <h1>404</h1>
        <p>Упс! Страница не найдена </p>
      </div>
    </>
  );
};
