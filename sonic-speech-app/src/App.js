import React, { useState, useEffect } from "react";
import "./styles/App.css";
import axios from "axios";
import TopHeaderBar from "./components/TopHeaderBar";
import SidePanel from "./components/SidePanel";
import Dashboard from "./components/Dashboard";
import TranscribeButton from "./components/TranscribeButton";
import RecentFiles from "./components/RecentFiles";
import TranscribePopup from "./components/TranscribePopup";

const baseUrl = "https://api.assemblyai.com/v2";
const apiKey = process.env.REACT_APP_ASSEMBLY_API_KEY;
const headers = {
  authorization: apiKey,
};

function App() {
  const [showTranscribePopup, setShowTranscribePopup] = useState(false);

  const handleTranscribeButtonClick = () => {
    setShowTranscribePopup(true);
  };

  const onClose = () => {
    setShowTranscribePopup(false);
  };

  return (
    <div className="App">
      <div className="sound-wave"></div>
      <TopHeaderBar />
      <div className="content">
        <SidePanel />
        <div className="main">
          <Dashboard onTranscribeButtonClick={handleTranscribeButtonClick} />

          <RecentFiles />
        </div>
      </div>
      {showTranscribePopup && <TranscribePopup onClose={onClose} />}
    </div>
  );
}

export default App;
