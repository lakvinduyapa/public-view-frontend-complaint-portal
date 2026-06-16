import { Link } from "react-router-dom";

function Confirmation() {
  return (
    <div className="confirmation-container">
      <h2>Thank You!</h2>
      <p>Your complaint has been submitted successfully.</p>
      <Link to="/">
        <button className="primary-button">Back to Home</button>
      </Link>
    </div>
  );
}

export default Confirmation;