import React from "react";
import "../styles/Dashboard.css";
import { AiOutlineFolder } from "react-icons/ai";
import { RxText } from "react-icons/rx";
import { BsBookmark } from "react-icons/bs";
import TranscribeButton from "./TranscribeButton";
const Dashboard = (props) => {
  return (
    <div className="dashboard">
      <div className="dashboard-top">
        <div className="dashboard-top-left">
          <div className="dashboard-welcome-text">Welcome devdatt</div>
          <div className="dashboard-welcome-text-small">
            upload your audio and video to convert to text
          </div>
        </div>
        <div className="dashboard-button">
          <TranscribeButton onClick={props.onTranscribeButtonClick} />
        </div>
      </div>
      <div className="dashboard-bottom">
        <div className="dashboard-section">
          <div className="dashboard-icons">
            <AiOutlineFolder />
          </div>
          {/* File Icon */}
          <p>100</p>
          <p>Uploaded Files</p>
        </div>
        <div className="dashboard-section">
          <div className="dashboard-icons">
            <RxText />
          </div>{" "}
          {/* Floppy Disk Icon */}
          <p>50</p>
          <p>Saved</p>
        </div>
        <div className="dashboard-section">
          <div className="dashboard-icons">
            <BsBookmark />
          </div>
          {/* Headphones Icon */}
          <p>20</p>
          <p>Transcribed</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
