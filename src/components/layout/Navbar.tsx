import React from "react";
import { Link } from "react-router-dom";
import SearchInput from "../section/SearchInput";
import ToggleColorTheme from "../section/ToggleColorTheme";
import AccountSelector from "./AccountSelector";

function Navbar() {
  return (
    <div className="py-4 bg-white dark:bg-dark_color1 shadow">
      <div className="n-container">
        <div className="flex justify-between items-center">
          <Link to={"/"}>
            <img src="/img/logo.png" alt="" className="h-10" />
          </Link>
          <div className="justify-end items-center gap-6 sm:flex hidden">

            <Link to={'/'}><p className="primaryText font-medium">Home</p></Link>
            <Link to={'/dashboard'}><p className="primaryText font-medium">Dashboard</p></Link>

            <SearchInput />
            <ToggleColorTheme />

            <AccountSelector />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
