import { NavLink } from "react-router-dom";
import MenuNav from "./MenuNav";

export default function Header({ children }) {
  return (
    <>
      <section className="flex md:w-[90%] mx-auto md:justify-between md:items-center md:backdrop-filter md:backdrop-blur-lg md:bg-white md:bg-opacity-10 px-2 py-3 md:px-8 rounded-3xl shadow-lg max-w-[1128px] ">
        <picture>
          <img src="./assets/logo.png" alt="Logo" className="md:h-6" />
        </picture>
        <MenuNav />
        <NavLink
          to="#"
          className="border p-1 text-xs px-3 rounded-3xl hidden md:flex"
        >
          Dashboard
        </NavLink>
      </section>
      {children}
    </>
  );
}
