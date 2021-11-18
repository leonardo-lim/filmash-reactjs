import { useState, useEffect } from 'react';
import './Content.css';
import Modal from './Modal';

function Content() {
  const [data, setData] = useState([]);
  const [dataIndex, setDataIndex] = useState();
  const [showModal, setShowModal] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  let movieData;

  function getTopRated() {
    fetch(process.env.PUBLIC_URL + '/data.json')
      .then(response => response.json())
      .then(data => setData(data));  
  }

  function showDetails(i) {
    setShowModal(true);
    setDataIndex(i);
  }

  function hideDetails() {
    setShowModal(false);  
  }

  function addToWishlist(data) {
    if (localStorage.getItem('movies') === null) {
      movieData = [];
    } else {
      movieData = JSON.parse(localStorage.getItem('movies'));
    }

    movieData.push(data);
    localStorage.setItem('movies', JSON.stringify(movieData));
    setShowMessage(true);
  }
  
  useEffect(() => {
    getTopRated();
  }, []);

  const movies = data.slice(0, 8);
  const tvShows = data.slice(8, 16);

  return (
    <div className="content" id="content">
      <div className="top-movie">
        <div className="left">
          <div className="movie" id="movie">
            {
              movies.map((movie, i) => {
                return (
                  <div key={movie.Id} className="card">
                    <div className="card-body">
                      <span className="rated">{movie.Rated}</span>
                      <div className="poster">
                        <img src={movie.Poster} alt={movie.Title} />
                      </div>
                      <h3 className="title">{movie.Title}</h3>
                      <hr />
                      <div className="info">
                        <span className="year"><i className="fa fa-calendar"></i> {movie.Year}</span>
                        <span className="rating"><i className="fa fa-star"></i> {movie.imdbRating}</span>
                      </div>
                      <div className="btn-container">
                        <button type="button" className="detail-btn" onClick={() => showDetails(i)}><i className="fa fa-info-circle"></i> See Details</button>
                        <button type="button" className="add-wishlist-btn" onClick={() => addToWishlist(movie)}><i className="fa fa-plus"></i> Add to Wishlist</button>
                      </div>
                    </div>
                  </div>
                );
              })
            }
          </div>
        </div>
        <div className="right">
          <span>Top</span>
          <span>Rated</span>
          <span>Movies</span>
          <label>Based on <a href="https://www.imdb.com/" target="_blank" rel="noopener noreferrer">IMDb</a></label>
          <img src={process.env.PUBLIC_URL + 'img/hand.png'} alt="Hand" width="300" />
        </div>
      </div>
      <div className="top-tv-show">
        <div className="left">
          <span>Top</span>
          <span>Rated</span>
          <span>Tv Shows</span>
          <label>Based on <a href="https://www.imdb.com/" target="_blank" rel="noopener noreferrer">IMDb</a></label>
          <img src={process.env.PUBLIC_URL + 'img/hand-2.png'} alt="Hand" width="300" />
        </div>
        <div className="right">
          <div className="tv-show" id="tv-show">
            {
              tvShows.map((tvShow, i) => {
                return (
                  <div key={tvShow.Id} className="card">
                    <div className="card-body">
                      <span className="rated">{tvShow.Rated}</span>
                      <div className="poster">
                        <img src={tvShow.Poster} alt={tvShow.Title} />
                      </div>
                      <h3 className="title">{tvShow.Title}</h3>
                      <hr />
                      <div className="info">
                        <span className="year"><i className="fa fa-calendar"></i> {tvShow.Year}</span>
                        <span className="rating"><i className="fa fa-star"></i> {tvShow.imdbRating}</span>
                      </div>
                      <div className="btn-container">
                        <button type="button" className="detail-btn" onClick={() => showDetails(i + 8)}><i className="fa fa-info-circle"></i> See Details</button>
                        <button type="button" className="add-wishlist-btn" onClick={() => addToWishlist(tvShow)}><i className="fa fa-plus"></i> Add to Wishlist</button>
                      </div>
                    </div>
                  </div>
                );
              })
            }
          </div>
        </div>
      </div>
      { showMessage ? <span className="message">Movie added to wishlist <button type="button" title="Close" onClick={() => setShowMessage(false)}><i className="fa fa-times"></i></button></span> : '' }
      { showModal ? <Modal data={data[dataIndex]} /> : '' }
      { showModal ? <button type="button" className="close-btn" id="close-btn" title="Close" onClick={hideDetails}><i className="fa fa-times"></i></button> : '' }
    </div>
  );
}

export default Content;