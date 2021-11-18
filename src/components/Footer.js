import './Footer.css';

function Footer() {
  function scrollUp() {
    window.scrollTo(0, 0);
  }

  return (
    <div className="footer" id="footer">
      <p className="copyright" id="copyright">Copyright &copy; {new Date().getFullYear()}, Filmash.</p>
      <div className="icon">
        <a href="https://www.linkedin.com/in/leonardo-lim" target="_blank" rel="noopener noreferrer"><i className="fab fa-linkedin"></i></a>
      </div>
      <div className="icon">
        <a href="https://www.github.com/leonardo-lim" target="_blank" rel="noopener noreferrer"><i className="fab fa-github"></i></a>
      </div>
      <div className="icon">
        <a href="https://www.instagram.com/leonardolim78" target="_blank" rel="noopener noreferrer"><i className="fab fa-instagram"></i></a>
      </div>
      <button className="up-btn" id="up-btn" title="Scroll Up" onClick={scrollUp}><i className="fa fa-arrow-up"></i></button>
    </div>
  );
}

export default Footer;