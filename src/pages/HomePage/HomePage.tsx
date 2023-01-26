import "./HomePage.scss";

export function HomePage() {
  const arr: number[] = [];

  for (let i: number = 0; i < 16; i++) {
    arr.push(i);
  }

  return (
    <div className="homepage">
      {arr.map((_, i) => (
        <div key={i} className="homepage__item"></div>
      ))}
    </div>
  );
}
