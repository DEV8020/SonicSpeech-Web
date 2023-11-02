import React, { useState } from "react";
import axios from "axios";
import "../styles/Popup.css";
import { AiOutlineCloudUpload } from "react-icons/ai";
import { useSpeechSynthesis } from "@readpanda/react-speech-kit";
// import ReactFileDownload from "react-file-download";
// import responsiveVoice from "responsivevoice";

const baseUrl = "https://api.assemblyai.com/v2";
const apiKey = process.env.REACT_APP_ASSEMBLY_API_KEY;
const headers = {
  authorization: apiKey,
};

const TranscribePopup = (props) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [filePath, setFilePath] = useState("");
  const [transcriptData, setTranscriptData] = useState(null);
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [speakerInfoChecked, setSpeakerInfoChecked] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState("english");
  const [audioUrl, setAudioUrl] = useState(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
    props.onFileUpload(file);
    setFilePath("");
    setButtonDisabled(false);
  };

  const handleFilePathChange = (event) => {
    const userFilePath = event.target.value;
    setFilePath(userFilePath);
    setSelectedFile(null);
    setButtonDisabled(false);
  };

  const toggleSpeakerInfo = () => {
    setSpeakerInfoChecked(!speakerInfoChecked);
  };

  const fetchFileFromGoogleDrive = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(filePath);
      const audioData = response.data;
      return audioData;
    } catch (error) {
      console.error("Error fetching file from Google Drive:", error);
      setIsLoading(false);
      throw error;
    }
  };

  const submitTranscriptionHandler = async () => {
    if (selectedFile || filePath) {
      try {
        setIsLoading(true);

        let uploadUrl;
        let audioData;

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
          audioData = await fetchFileFromGoogleDrive();
          const uploadResponse = await axios.post(
            `${baseUrl}/upload`,
            audioData,
            { headers }
          );
          uploadUrl = uploadResponse.data.upload_url;
        }

        const data = {
          audio_url: uploadUrl,
          speaker_labels: speakerInfoChecked,
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
            setAudioUrl(null);
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
        setAudioUrl(null);
      }
    }
  };
  const handleLanguageChange = (event) => {
    setSelectedLanguage(event.target.value);
  };
  const generateAudioFromText = () => {
    if (transcriptData && transcriptData.text) {
      const textToSpeech = transcriptData.text;
      if (textToSpeech.trim() === "") {
        alert("Please enter some text to convert to audio.");
        return;
      }

      const utterance = new SpeechSynthesisUtterance(textToSpeech);
      const voices = window.speechSynthesis.getVoices();
      utterance.voice = voices[0]; // You can choose a different voice if available.

      utterance.onend = () => {
        const audioBlob = new Blob([new Uint8Array(utterance.audioBuffer)]);
        setAudioUrl(audioBlob);
      };

      window.speechSynthesis.speak(utterance);
    }
  };
  const downloadAudio = () => {
    if (audioUrl) {
      const url = URL.createObjectURL(audioUrl);
      const a = document.createElement("a");
      a.href = url;
      a.download = "text-to-speech.mp3"; // You can choose a different format.
      a.click();
    }
  };

  return (
    <div className="popup">
      <div className="transcribe-popup">
        <div className="popup-content">
          <div className="popup-header">
            <h2>Transcribe Audio</h2>
            <button className="close-button" onClick={props.onClose}>
              X
            </button>
          </div>
          <div className="popup-body">
            <div className="language-selection">
              <label>Transcription Language</label>
              <select value={selectedLanguage} onChange={handleLanguageChange}>
                <option value="english">English</option>
                <option value="hindi">Hindi</option>
                <option value="marathi">Marathi</option>
                <option value="sanskrit">Sanskrit</option>
                {/* Add more language options here */}
              </select>
            </div>
            <div className={`popup-dropzone ${selectedFile ? "uploaded" : ""}`}>
              <label className="dropzone-label">
                <input
                  type="file"
                  accept=".mp3, .wav, .mp4, .webm"
                  onChange={handleFileChange}
                />
                <div className="dropzone-content">
                  {selectedFile ? (
                    <div className="selected-file">
                      <img
                        src={URL.createObjectURL(selectedFile)}
                        alt="Selected File Icon"
                      />
                      {selectedFile.name}
                    </div>
                  ) : (
                    <div className="clickable-text">
                      <AiOutlineCloudUpload />
                      Click to Upload or Drag & Drop
                    </div>
                  )}
                </div>
              </label>
            </div>
            <div className="import-from-link">
              <label>Import from link</label>
              <input
                type="text"
                placeholder="Import from a link"
                value={filePath}
                onChange={handleFilePathChange}
              />
            </div>
            <div className="speaker-info">
              <label>
                <input
                  type="checkbox"
                  checked={speakerInfoChecked}
                  onChange={toggleSpeakerInfo}
                />
                Include Speaker Information
              </label>
            </div>
            <button
              onClick={submitTranscriptionHandler}
              className="convert-button"
              disabled={buttonDisabled}
            >
              Transcribe File
            </button>
            {transcriptData &&
            !isLoading &&
            transcriptData.status === "completed" ? (
              <div>
                <textarea
                  className="transcription"
                  value={transcriptData.text}
                  readOnly
                />
                {audioUrl ? (
                  <div className="download-audio">
                    <button onClick={downloadAudio}>Download Audio</button>
                  </div>
                ) : (
                  <div className="generate-audio">
                    <button onClick={generateAudioFromText}>
                      Generate Audio
                    </button>
                  </div>
                )}
              </div>
            ) : isLoading ? (
              <div className="loading-spinner-container">
                <div className="loading-spinner"></div>
              </div>
            ) : (
              transcriptData && (
                <p className="error-message">
                  Transcription failed: {transcriptData.error}
                </p>
              )
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TranscribePopup;
