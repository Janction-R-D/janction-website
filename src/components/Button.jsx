import { Link } from "react-router-dom";

export default function Button({ path }) {
  return (
    <Link
      to={path}
      className=" flex items-center justify-center gap-3 rounded-2xl button-gradient text-black w-32 p-2 font-medium "
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
