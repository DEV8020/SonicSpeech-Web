import React from "react";
import "../styles/SidePanel.css";
import {
  AiOutlineHome,
  AiOutlineFolder,
  AiOutlineSetting,
} from "react-icons/ai";
import { BsBookmark, BsRocketTakeoffFill } from "react-icons/bs";
import { BiShareAlt, BiSolidTrash, BiSupport } from "react-icons/bi";

const SidePanel = () => {
  return (
    <div className="side-panel">
      <div className="options">
        <div className="option">
          <AiOutlineHome />
          Home
        </div>
        <div className="option">
          <AiOutlineFolder />
          All Files
        </div>
        <div className="option">
          <BsBookmark />
          Saved
        </div>
        <div className="option">
          <BiShareAlt />
          Integration
        </div>
        <div className="option">
          <BiSolidTrash />
          Trash
        </div>
        <div className="option">
          <AiOutlineSetting />
          Settings
        </div>
        <div className="option">
          <BiSupport />
          Help and Support
        </div>
      </div>
      <div className="upgrade-section">
        <BsRocketTakeoffFill />
        <div className="upgrade-message">Upgrade to Premium</div>
        <button className="upgrade-button">Upgrade</button>
      </div>
    </div>
  );
};

export default SidePanel;
