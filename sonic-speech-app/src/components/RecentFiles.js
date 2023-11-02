import React from "react";
import "../styles/RecentFiles.css";

const RecentFiles = (props) => {
  return (
    <div className="recent-files-container">
      <h2>Recent Files</h2>

      <table className="recent-files-table">
        <thead>
          <tr>
            <th></th> {/* Checkbox column */}
            <th>File Name</th>
            <th>File Size</th>
            <th>Upload Date</th>
          </tr>
        </thead>
        <tbody>
          {props.uploadedFiles.map((file, index) => (
            <tr key={index}>
              <td>
                <input
                  type="checkbox"
                  onChange={() => props.onDeleteFile(file.name)}
                />
              </td>
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
