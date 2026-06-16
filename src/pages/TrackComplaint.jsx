import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "../assets/style.css";

function TrackComplaint() {
  const [crnInput, setCrnInput] = useState("");
  const [complaintDetails, setComplaintDetails] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const API_BASE_URL = "http://localhost:5000";

  const handleTrack = async (e) => {
    e.preventDefault();

    setError("");
    setComplaintDetails(null);

    const trimmedCrn = crnInput.trim().toUpperCase();

    if (!trimmedCrn) {
      setError("Please enter a Complaint Reference Number (CRN).");
      return;
    }

   const crnPattern = /^(IAU|CRN)-\d{4}-\d{6}$/i;

    if (!crnPattern.test(trimmedCrn)) {
      setError("Invalid CRN format. Example: IAU-2026-000001");
      return;
    }

    try {
      setLoading(true);

      const response = await axios.get(
        `${API_BASE_URL}/api/submissions/track/${trimmedCrn}`
      );

      if (response.data.success) {
        setComplaintDetails(response.data.complaint);
      }
    } catch (error) {
      if (error.response && error.response.status === 404) {
        setError("No complaint found with the provided CRN.");
      } else {
        setError("Unable to track complaint. Please try again later.");
      }
    } finally {
      setLoading(false);
    }
  };

  const displayValue = (value) => {
    return value && value.toString().trim() !== "" ? value : "N/A";
  };

  const renderEvidenceFiles = (files) => {
  if (!files || files === "N/A") {
    return "N/A";
  }

  return files.split(",").map((file, index) => {
    const cleanFile = file.trim();

    return (
      <div key={index}>
        <a
          href={`${API_BASE_URL}/uploads/${cleanFile}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          View Evidence {index + 1}
        </a>
      </div>
    );
  });
};

  return (
    <main className="track-page">
      {!complaintDetails ? (
        <section className="track-search-section">
          <h1>Track Your Complaint</h1>

          <form onSubmit={handleTrack} className="track-form">
            <label>Enter your Complaint Reference Number (CRN):</label>

            <div className="track-form-row">
              <input
                type="text"
                placeholder="Enter your Complaint Reference Number"
                value={crnInput}
                onChange={(e) => setCrnInput(e.target.value)}
              />

              <button type="submit" disabled={loading}>
                {loading ? "Tracking..." : "Track"}
              </button>
            </div>

            {error && <p className="track-error">{error}</p>}
          </form>

          <div className="track-back-wrap">
            <Link to="/" className="track-back-link">
              Back to Home
            </Link>
          </div>
        </section>
      ) : (
        <section className="track-details-section">
          <div className="track-details-card">
            <h2>
              Complaint Details for CRN:{" "}
              <span>{displayValue(complaintDetails.crn)}</span>
            </h2>

            <div className="track-table-wrap">
              <table className="track-details-table">
                <tbody>
                  <tr>
                    <th>Complaint Category:</th>
                    <td>{displayValue(complaintDetails.complaintCategory)}</td>
                  </tr>

                  <tr>
                    <th>Submission Type:</th>
                    <td>{displayValue(complaintDetails.submissionType)}</td>
                  </tr>

                 <tr>
  <th>Status:</th>
  <td>{displayValue(complaintDetails.status)}</td>
</tr>

<tr>
  <th>Evidence Files:</th>
  <td>{renderEvidenceFiles(complaintDetails.evidenceFiles)}</td>
</tr>

<tr>
  <th>Notes:</th>
  <td>{displayValue(complaintDetails.notes)}</td>
</tr>
                  
                </tbody>
              </table>
            </div>

            <button
              type="button"
              className="track-back-home-btn"
              onClick={() => {
                setComplaintDetails(null);
                setCrnInput("");
                setError("");
              }}
            >
              Back to Track
            </button>

            <Link to="/" className="track-home-btn">
              Back to Home
            </Link>
          </div>
        </section>
      )}
    </main>
  );
}

export default TrackComplaint;