import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import ROUTES from "../routes";
import { cn } from "../utils/cn";

function NavBar({ handleClickNavLink }: { handleClickNavLink: any }) {
  const location = useLocation();
  return (
    <div className="flex a mt-5 flex-row  items-center">
      <div className="flex  mr-5 ">
        <Link
          className={cn(
            " cursor-pointer mr-1",
            location.pathname === "/"
              ? "border-b-2 border-b-black pb-1.5"
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
              ? "border-b-2 border-b-black pb-1.5"
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
