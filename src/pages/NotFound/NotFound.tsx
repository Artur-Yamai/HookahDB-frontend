import "./NotFound.scss";

export function NotFound() {
  function goToHome() {
    console.log("goToHome");
  }

  return (
    <div className="not-found">
      <h1>404</h1>
      <p>oops! Страница не найдена </p>
    </div>
  );
}
