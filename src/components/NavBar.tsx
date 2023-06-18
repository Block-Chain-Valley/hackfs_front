import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import ROUTES from "../routes";
import { AiFillHome } from "react-icons/ai";
import { BiUpload } from "react-icons/bi";
import { LuLayoutDashboard } from "react-icons/lu";
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
            <div
              className={cn(
                " font-bold",
                location.pathname === "/" ? "font-bold" : "font-bold text-black"
              )}
            >
              <div className="flex items-center justify-center">
                <AiFillHome className="mr-2" />
                Home
              </div>
            </div>
          </div>
        </Link>

        <Link
          className={cn(
            " cursor-pointer mr-1",
            location.pathname === "/upload"
              ? "border-b-2 border-b-white pb-1.5"
              : "pb-2"
          )}
          to={ROUTES.UPLOAD}
        >
          <div className="flex items-center px-3">
            <div
              className={cn(
                "font-lg       font-bold",
                location.pathname === "/upload" ? "" : "text-black"
              )}
            >
              <div className="flex items-center justify-center">
                <BiUpload className="mr-2" />
                Upload
              </div>
            </div>
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
          {/* <div className="flex items-center px-3">
            <div
              className={cn(
                "font-lg font-bold",
                location.pathname === "/about" ? "" : "text-black"
              )}
            >
              <div className="flex items-center justify-center">
                <LuLayoutDashboard className="mr-2" />
                DashBoard
              </div>
            </div>
          </div> */}
        </Link>
      </div>
    </div>
  );
}

export default NavBar;
