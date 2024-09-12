import { NavLink } from "react-router-dom";

export default function MenuNav() {
  return (
    <nav className="hidden md:flex    ">
      <ul className="flex justify-between gap-5">
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
          <NavLink to="#">Product</NavLink>
        </li>
        <li>
          <NavLink
            to="/price"
            className={({ isActive, isPending }) =>
              isPending ? "pending" : isActive ? "font-bold" : ""
            }
          >
            Price
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/jct"
            className={({ isActive, isPending }) =>
              isPending ? "pending" : isActive ? "font-bold" : ""
            }
          >
            JCT
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
          <NavLink to="#">Get started</NavLink>
        </li>
      </ul>
    </nav>
  );
}
