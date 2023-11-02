import React, { useState } from "react";
import "../styles/RecentFiles.css";

const RecentFiles = () => {
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [fileName, setFileName] = useState("");
  const [fileSize, setFileSize] = useState(0);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setFileName(file.name);
    setFileSize(file.size);

    // Create a new file object with details and add it to the uploadedFiles array.
    const newFile = {
      name: file.name,
      size: file.size,
      date: new Date().toLocaleDateString(),
    };

    setUploadedFiles([...uploadedFiles, newFile]);
  };

  return (
    <div className="recent-files-container">
      <h2>Recent Files</h2>

      <input type="file" onChange={handleFileChange} />
      <p>File Name: {fileName}</p>
      <p>File Size: {fileSize} bytes</p>

      <table className="recent-files-table">
        <thead>
          <tr>
            <th>File Name</th>
            <th>File Size</th>
            <th>Upload Date</th>
          </tr>
        </thead>
        <tbody>
          {uploadedFiles.map((file, index) => (
            <tr key={index}>
              <td>{file.name}</td>
              <td>{file.size} bytes</td>
              <td>{file.date}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RecentFiles;
