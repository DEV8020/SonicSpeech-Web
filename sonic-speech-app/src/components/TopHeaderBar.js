import React from "react";
import "../styles/TopHeaderBar.css";
import { AiOutlineSearch, AiOutlineBell } from "react-icons/ai";
import { CgProfile } from "react-icons/cg";
const TopHeaderBar = () => {
  return (
    <div className="top-header">
      <div className="left-section">
        <h1 className="sonic-speech">SonicSpeech</h1>
      </div>
      <div className="right-section">
        <div className="search-bar">
          <input type="text" placeholder="Search..." />
          <AiOutlineSearch />
        </div>
        <div className="bell-icon">
          <AiOutlineBell />
        </div>
        <div className="profile-icon">
          <CgProfile />
        </div>
      </div>
    </div>
  );
};

export default TopHeaderBar;
