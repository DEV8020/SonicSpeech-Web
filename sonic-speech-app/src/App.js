import React, { useState } from "react";
import "./styles/App.css";

import TopHeaderBar from "./components/TopHeaderBar";
import SidePanel from "./components/SidePanel";
import Dashboard from "./components/Dashboard";

import RecentFiles from "./components/RecentFiles";
import TranscribePopup from "./components/TranscribePopup";

function App() {
  const [showTranscribePopup, setShowTranscribePopup] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState([]);

  const handleFileUpload = (file) => {
    const newFile = {
      name: file.name,
      size: file.size,
      date: new Date().toLocaleDateString(),
    };

    setUploadedFiles([...uploadedFiles, newFile]);
  };
  const handleDeleteFile = (fileName) => {
    const updatedFiles = uploadedFiles.filter((file) => file.name !== fileName);
    setUploadedFiles(updatedFiles);
  };
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

          <RecentFiles
            uploadedFiles={uploadedFiles}
            onDeleteFile={handleDeleteFile}
          />
        </div>
      </div>
      {showTranscribePopup && (
        <TranscribePopup onClose={onClose} onFileUpload={handleFileUpload} />
      )}
    </div>
  );
}

export default App;
