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
  const [filePath, setFilePath] = useState("");
  const [transcriptData, setTranscriptData] = useState(null);
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
    setFilePath(""); // Reset the text input when a file is selected
    setButtonDisabled(false);
  };

  const handleFilePathChange = (event) => {
    const userFilePath = event.target.value;
    setFilePath(userFilePath);
    setSelectedFile(null); // Reset the selected file when a file path is entered
    setButtonDisabled(false);
  };

  const submitTranscriptionHandler = async () => {
    if (selectedFile || filePath) {
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
        } else if (filePath) {
          uploadUrl = filePath; // Use the user-provided file path
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
            placeholder="Enter file path (local or online)"
            value={filePath}
            onChange={handleFilePathChange}
          />
        </div>
        <button
          onClick={submitTranscriptionHandler}
          className="convert-button"
          disabled={buttonDisabled}
        >
          Convert Speech to Text
        </button>
        {transcriptData && transcriptData.status === "completed" ? (
          <div className="transcription">{transcriptData.text}</div>
        ) : (
          isLoading && <p>Loading...</p>
        )}
      </header>
    </div>
  );
}

export default App;
