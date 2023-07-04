import "./HomePage.scss";

export const HomePage = () => {
  const arr: number[] = [];

  for (let i: number = 0; i < 16; i++) {
    arr.push(i);
  }

  return <div className="homepage">HomePage</div>;
};
