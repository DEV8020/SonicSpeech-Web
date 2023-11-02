import React from "react";
import "../styles/SidePanel.css";
import {
  AiOutlineHome,
  AiOutlineFolder,
  AiOutlineSetting,
} from "react-icons/ai";
import { BsBookmark, BsRocketTakeoffFill } from "react-icons/bs";
import { BiShareAlt, BiSolidTrash, BiSupport } from "react-icons/bi";
// import { Label } from "@mui/icons-material";

const SidePanel = () => {
  return (
    <div className="side-panel">
      <div className="options">
        <div className="option">
          <AiOutlineHome />
          <label>Home</label>
        </div>
        <div className="option">
          <AiOutlineFolder />
          <label>All Files</label>
        </div>
        <div className="option">
          <BsBookmark />
          <label>Saved</label>
        </div>
        <div className="option">
          <BiShareAlt />
          <label>Integration</label>
        </div>
        <div className="option">
          <BiSolidTrash />
          <label>Trash</label>
        </div>
        <div className="option">
          <AiOutlineSetting />
          <label>Settings</label>
        </div>
        <div className="option">
          <BiSupport />
          <label>Help and Support</label>
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
