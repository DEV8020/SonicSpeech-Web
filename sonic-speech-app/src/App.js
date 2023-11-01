import React, { useState } from "react";
import "./styles/App.css";
import axios from "axios";

const baseUrl = "https://api.assemblyai.com/v2";
const apiKey = process.env.REACT_APP_ASSEMBLY_API_KEY;
const headers = {
  authorization: apiKey,
};

function App() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [audioUrl, setAudioUrl] = useState("");
  const [transcriptData, setTranscriptData] = useState(null);
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [fileSelected, setFileSelected] = useState(false);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
    setAudioUrl(""); // Reset the audio URL when a file is selected
    setButtonDisabled(false);
    setFileSelected(true);
  };

  const handleAudioUrlChange = (event) => {
    const userAudioUrl = event.target.value;
    setAudioUrl(userAudioUrl);
    setSelectedFile(null); // Reset the selected file when an audio URL is entered
    setButtonDisabled(false);
    setFileSelected(false); // Reset the fileSelected state
  };

  const resetFile = () => {
    setSelectedFile(null);
    setFileSelected(false);
  };

  const submitTranscriptionHandler = async () => {
    if (selectedFile || audioUrl) {
      try {
        setIsLoading(true);

        let uploadUrl;

        if (selectedFile) {
          const formData = new FormData();
          formData.append("file", selectedFile);
          const uploadResponse = await axios.post(
            `${baseUrl}/upload`,
            formData,
            {
              headers: {
                ...headers,
                "Content-Type": "multipart/form-data",
              },
            }
          );
          uploadUrl = uploadResponse.data.upload_url;
        } else if (audioUrl) {
          uploadUrl = audioUrl; // Use the user-provided audio URL
        }

        const data = {
          audio_url: uploadUrl,
        };

        const url = `${baseUrl}/transcript`;
        const response = await axios.post(url, data, { headers });
        const transcriptId = response.data.id;
        const pollingEndpoint = `${baseUrl}/transcript/${transcriptId}`;

        while (true) {
          const pollingResponse = await axios.get(pollingEndpoint, {
            headers,
          });
          const transcriptionResult = pollingResponse.data;

          if (transcriptionResult.status === "completed") {
            setTranscriptData(transcriptionResult);
            setIsLoading(false);
            break;
          } else if (transcriptionResult.status === "error") {
            throw new Error(
              `Transcription failed: ${transcriptionResult.error}`
            );
          } else {
            await new Promise((resolve) => setTimeout(resolve, 3000));
          }
        }
      } catch (error) {
        console.error(error);
        setIsLoading(false);
      }
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
            placeholder="Enter audio URL (e.g., Google Drive link)"
            value={audioUrl}
            onChange={handleAudioUrlChange}
          />
        </div>
        <button
          onClick={submitTranscriptionHandler}
          className="convert-button"
          disabled={buttonDisabled}
        >
          Convert Speech to Text
        </button>
        {isLoading ? (
          <div className="loading-spinner-container">
            <div className="loading-spinner"></div>
          </div>
        ) : transcriptData ? (
          transcriptData.status === "completed" ? (
            <textarea
              className="transcription"
              value={transcriptData.text}
              readOnly
            />
          ) : (
            <p className="error-message">
              Transcription failed: {transcriptData.error}
            </p>
          )
        ) : null}
      </header>
    </div>
  );
}

export default App;
