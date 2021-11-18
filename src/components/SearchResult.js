import { useState } from 'react';
import './SearchResult.css';
import Modal from './Modal';
import FetchLoading from './FetchLoading';

function SearchResult({data, movie, error, isError}) {
  const [detailsData, setDetailsData] = useState();
  const [showModal, setShowModal] = useState(false);
  const [showFetchLoading, setShowFetchLoading] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const apiKey = 'c12f2370';
  let movieData, temp;

  function getMovieDetails(imdbId, isAdd) {
    setShowFetchLoading(true);

    fetch(`https://omdbapi.com/?apikey=${apiKey}&i=${imdbId}`)
      .then(response => response.json())
      .then(data => {
        setShowFetchLoading(false);

        if (data.Response === 'True') {
          temp = data;
          setDetailsData(data);

          if (isAdd) {
            movieData.push(temp);
            localStorage.setItem('movies', JSON.stringify(movieData));
            setShowMessage(true);
          } else {
            setShowModal(true);
          }
        }
      });
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

    getMovieDetails(data.imdbID, true); 
  }

  return (
    <div className="search-result" id="search-result">
      <div className="desc" id="desc">
        <div className="left">
          <img src={process.env.PUBLIC_URL + '/img/search-result.png'} alt="Search Result" />
        </div>
        {
          isError ? (
            <div className="right">
              <h1>{error}</h1>
            </div>
          ) : (
            <div className="right">
              <h1>Showing {data.length}</h1>
              <h1>result{ data.length > 1 ? 's' : '' } for</h1>
              <h1>{movie}</h1>
            </div>
          )
        }
      </div>
      {
        !isError ? (
          <div className="movie" id="movie">
            {
              data.map((d, i) => {
                return (
                  <div key={i} className="card">
                    <div className="card-body">
                      <div className="poster">
                        <img src={d.Poster} alt={d.Title} />
                      </div>
                      <h3 className="title">{d.Title}</h3>
                      <hr />
                      <span className="year"><i className="fa fa-calendar"></i> {d.Year}</span>
                      <div className="btn-container">
                        <button type="button" className="detail-btn" onClick={() => getMovieDetails(d.imdbID, false)}><i className="fa fa-info-circle"></i> See Details</button>
                        <button type="button" className="add-wishlist-btn" onClick={() => addToWishlist(d)}><i className="fa fa-plus"></i> Add to Wishlist</button>
                      </div>
                    </div>
                  </div>
                );
              })
            }
          </div>
        ) : ''
      }
      { showFetchLoading ? <FetchLoading /> : '' }
      { showMessage ? <span className="message">Movie added to wishlist <button type="button" title="Close" onClick={() => setShowMessage(false)}><i className="fa fa-times"></i></button></span> : '' }
      { showModal ? <Modal data={detailsData} /> : '' }
      { showModal ? <button type="button" className="close-btn" id="close-btn" title="Close" onClick={hideDetails}><i className="fa fa-times"></i></button> : '' }
    </div>
  );
}

export default SearchResult;