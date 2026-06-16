import { Link } from "react-router-dom";
import logo from "../assets/logo.png"; 
import "../assets/style.css";

function Home() {
  return (
    <main className="home-body">
      <div className="animated-bg">
        <span></span>
        <span></span>
        <span></span>
        <span></span>
      </div>

      <section className="home-wrapper">
        <div className="home-card">
          <div className="home-logo-box">
            <img src={logo} alt="Logo" />
          </div>

          <h1>SRILANKA TELECOM PLC</h1>
          <h2>(SLTMOBITEL)</h2>

          <div className="divider"></div>

          <h3>Internal Affairs Unit (IAU)</h3>

          <h4 className="portal-title">
            Complaint &amp; Concern Reporting Portal
          </h4>

          <p className="home-description">
            A secure and confidential platform to report complaints, concerns,
            misconduct, corruption, fraud, or malpractice.
          </p>

         <div className="home-buttons">
  <Link to="/form" className="start-btn">Start Reporting</Link>
  <Link to="/track" className="track-home-btn">Track Complaint</Link>
</div>

          <p className="confidential-text">
            Confidential • Secure • Responsible Reporting
          </p>
        </div>
      </section>
    </main>
  );
}

export default Home;