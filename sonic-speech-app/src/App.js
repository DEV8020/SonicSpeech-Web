import React, { useState } from "react";
import "./App.css";

function App() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [transcription, setTranscription] = useState("");
  const [buttonDisabled, setButtonDisabled] = useState(true);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
    setButtonDisabled(false);
  };

  const handleGoogleDriveLink = () => {
    // Add logic to handle Google Drive link input
    // For example, you can make an API call to fetch the file
  };

  const convertToText = () => {
    if (selectedFile) {
      setTranscription(`File Name: ${selectedFile.name}`);
    }
  };

  return (
    <div className="App">
      <div className="sound-wave"></div>
      <header className="App-header">
        <h1 className="sonic-speech">SonicSpeech</h1>
        <div className={`dropzone ${selectedFile ? "selected" : ""}`}>
          <label className="dropzone-label">
            <input
              type="file"
              accept=".mp3, .wav, .mp4, .webm"
              onChange={handleFileChange}
            />
            {selectedFile ? (
              <div className="selected-file">
                <img
                  src={URL.createObjectURL(selectedFile)}
                  alt="Selected File Icon"
                />
                {selectedFile.name}
              </div>
            ) : (
              "Drag & Drop or Click to Upload"
            )}
          </label>
        </div>
        <div className="or-text">or</div>
        <div className="google-drive-input">
          <input
            type="text"
            placeholder="Enter Google Drive link"
            onChange={handleGoogleDriveLink}
          />
        </div>
        <button
          onClick={convertToText}
          className="convert-button"
          disabled={buttonDisabled}
        >
          Convert Speech to Text
        </button>
        <div className="transcription">{transcription}</div>
      </header>
    </div>
  );
}

export default App;
