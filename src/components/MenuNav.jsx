import { NavLink } from "react-router-dom";

export default function MenuNav() {
  return (
    <nav className="hidden md:flex    ">
      <ul className="flex justify-between gap-4">
        <li>
          <NavLink
            to="/"
            className={({ isActive, isPending }) =>
              isPending ? "pending" : isActive ? "font-bold" : ""
            }
          >
            Home
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/products"
            className={({ isActive, isPending }) =>
              isPending ? "pending" : isActive ? "font-bold" : ""
            }
          >
            Product
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/explore"
            className={({ isActive, isPending }) =>
              isPending ? "pending" : isActive ? "font-bold" : ""
            }
          >
            Explore
          </NavLink>
        </li>
        <li>
          <NavLink
            to="get-started"
            className={({ isActive, isPending }) =>
              isPending ? "pending" : isActive ? "font-bold" : ""
            }
          >
            Get started
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}
