import Button from "./Button";

export default function Card() {
  return (
    <article className="flex flex-col gap-5  shadow-custom-1 p-4 rounded-2xl border-opacity-15 border border-[#ccc] bg-custom-gradient">
      <p>ECS t5</p>
      <p className="text-2xl font-bold text-gradient">
        $1.<b>9</b>
        <span>/day</span>
      </p>
      <p className="text-zinc-100 opacity-80">
        t5 example can install wordpress and other common applications, suitable
        for building small graphic websites (less than 1000 daily visits) and
        development testing.
      </p>
      <ul className="text-zinc-400 text-sm opacity-80">
        <li className="flex items-center  gap-2">
          <img src="./assets/check.png" className="w-3 h-3" alt="check icon" />
          e7-4870 2.8GHz
        </li>
        <li className="flex items-center  gap-2">
          <img src="./assets/check.png" className="w-3 h-3" alt="check icon" />
          e7-4870 2.8GHze7-4870 2.8GHz
        </li>
        <li className="flex items-center  gap-2">
          <img src="./assets/check.png" className="w-3 h-3" alt="check icon" />
          e7-4870 2.8GHze7-4
        </li>
        <li className="flex items-center  gap-2">
          <img src="./assets/check.png" className="w-3 h-3" alt="check icon" />
          e7-4870 2.8GHze7-4870 2.8
        </li>
        <li className="flex items-center  gap-2">
          <img src="./assets/check.png" className="w-3 h-3" alt="check icon" />
          e7-4870 2.8GHze7-4870
        </li>
      </ul>
      <div className="flex items-center py-2">
        <Button path={"#"} />
      </div>
    </article>
  );
}
