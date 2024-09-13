import { Link } from 'umi';
import '../index.css';
export function Card() {
  return (
    <article className="article-container">
      <p>ECS t5</p>
      <p className="article-price">
        $1.<b>9</b>
        <span>/day</span>
      </p>
      <p className="article-description">
        t5 example can install wordpress and other common applications, suitable
        for building small graphic websites (less than 1000 daily visits) and
        development testing.
      </p>
      <ul className="article-list">
        <li>
          <img src="./assets/check.png" alt="check icon" />
          e7-4870 2.8GHz
        </li>
        <li>
          <img src="./assets/check.png" alt="check icon" />
          e7-4870 2.8GHze7-4870 2.8GHz
        </li>
        <li>
          <img src="./assets/check.png" alt="check icon" />
          e7-4870 2.8GHze7-4
        </li>
        <li>
          <img src="./assets/check.png" alt="check icon" />
          e7-4870 2.8GHze7-4870 2.8
        </li>
        <li>
          <img src="./assets/check.png" alt="check icon" />
          e7-4870 2.8GHze7-4870
        </li>
      </ul>
      <div className="article-button-container">
        <Button path="#" />
      </div>
    </article>
  );
}

export function Button({ path }) {
  return (
    <Link
      to={path}
      className="button-gradient flex items-center justify-center gap-3 rounded-2xl button-gradient text-black w-32 p-2 font-medium "
    >
      Get Started
      <img
        src="./assets/link-vector.png"
        className="w-3 h-3"
        alt="vector icon"
      />
    </Link>
  );
}
export default function Cards() {
  return (
    <ul className="cards">
      <Card />
      <Card />
      <Card />
      <Card />
      <Card />
      <Card />
      <Card />
      <Card />
      <Card />
    </ul>
  );
}
