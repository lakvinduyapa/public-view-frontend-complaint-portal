import { useParams, Link } from "react-router-dom";

function Success() {
  const { crn } = useParams();

  return (
    <div className="success-container">
      <h2>Submission Successful!</h2>
      <p>Your Complaint Reference Number (CRN) is: <strong>{crn}</strong></p>
      <Link to="/">
        <button className="primary-button">Back to Home</button>
      </Link>
    </div>
  );
}

export default Success;