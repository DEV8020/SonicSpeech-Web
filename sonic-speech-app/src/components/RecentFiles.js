import React from "react";
import "../styles/RecentFiles.css";
const RecentFiles = () => {
  return (
    <div className="recent-files">
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Type</th>
            <th>Duration</th>
            <th>Date Changed</th>
            <th>Last Updated</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>{/* Map through recent files and render rows */}</tbody>
      </table>
    </div>
  );
};

export default RecentFiles;
