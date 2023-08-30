import "./HomePage.css";

export default function HomePage() {
  return (
    <div className="homepage" style={{ marginLeft: "20px" }}>
      <div className="hero">
        <h1>ConSpace 2023</h1>
        <p>Explore the latest trends and innovations in the world of IT.</p>
      </div>
      <div className="features">
        <div className="feature">
          <div className="feature-icon">
            <i className="fas fa-graduation-cap"></i>
          </div>
          <h2>Learn</h2>
          <p>Discover cutting-edge technologies through expert-led sessions.</p>
        </div>
        <div className="feature">
          <div className="feature-icon">
            <i className="fas fa-handshake"></i>
          </div>
          <h2>Connect</h2>
          <p>
            Network with industry professionals and expand your connections.
          </p>
        </div>
        <div className="feature">
          <div className="feature-icon">
            <i className="fas fa-lightbulb"></i>
          </div>
          <h2>Innovate</h2>
          <p>Showcase your innovations and learn from other creative minds.</p>
        </div>
      </div>
      <footer className="footer">
        <p>Copyright &copy; ConSpace 2023.</p>
      </footer>
    </div>
  );
}
