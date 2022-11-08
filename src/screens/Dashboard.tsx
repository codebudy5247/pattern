import React from "react";
import { Link } from "react-router-dom";
import SubmittedArtsPart from "../components/section/SubmittedArtsPart";

function Dashboard() {
  return (
    <div>
      <div className="n-container">
        <div className="flex justify-between py-10">
          <p className="font-semibold text-2xl primaryText">My Dasboard</p>
          <Link to={"/create-pattern"}>
            <button className="blue-linear-bg text-white font-medium rounded-md px-6 h-11 flex items-center gap-2">
              New Piece <span className="text-xl mb-1">+</span>
            </button>
          </Link>
        </div>
        <SubmittedArtsPart />
      </div>
    </div>
  );
}

export default Dashboard;
