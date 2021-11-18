import './Homepage.css';

function Homepage() {
  function scrollDown() {
    let height = window.innerHeight;
    window.scrollTo(0, height);
  }

  return (
    <div className="homepage" id="homepage">
      <div className="left">
        <img src={process.env.PUBLIC_URL + '/img/person.png'} alt="Person" width="600" />
      </div>

      <div className="right">
        <p className="desc">Your reliable <strong>complete</strong> and <strong>accurate</strong> movie info</p>
        <button type="button" className="see-btn" id="see-btn" onClick={scrollDown}><i className="fa fa-arrow-down"></i> See Movies</button>
      </div>
    </div>
  );
}

export default Homepage;