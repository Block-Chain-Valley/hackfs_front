import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import ROUTES from "../routes";
import { cn } from "../utils/cn";

function NavBar({ handleClickNavLink }: { handleClickNavLink: any }) {
  const location = useLocation();
  return (
    <div className="flex flex-row  items-center border-b-2  border-blue-400 ">
      <div className="flex ml-5 ">
        <Link
          className={cn(
            " cursor-pointer mr-1",
            location.pathname === "/"
              ? "border-b-2 border-b-white pb-1"
              : "pb-2"
          )}
          to={ROUTES.HOME}
        >
          <div className="flex items-center px-3">
            <p
              className={cn(
                "font-lg",
                location.pathname === "/" ? "font-semibold" : "text-neutral-400"
              )}
            >
              home
            </p>
          </div>
        </Link>
        <Link
          className={cn(
            " cursor-pointer mr-1",
            location.pathname === "/about"
              ? "border-b-2 border-b-white pb-1.5"
              : "pb-2"
          )}
          to={ROUTES.ABOUT}
        >
          <div className="flex items-center px-3">
            <p
              className={cn(
                "font-lg",
                location.pathname === "/about"
                  ? "font-semibold"
                  : "text-neutral-400"
              )}
            >
              About
            </p>
          </div>
        </Link>
      </div>
    </div>
  );
}

export default NavBar;
