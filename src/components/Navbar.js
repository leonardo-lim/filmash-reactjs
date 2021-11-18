import { useState } from 'react';
import './Navbar.css';
import Homepage from './Homepage';
import Content from './Content';
import SearchResult from './SearchResult';
import FetchLoading from './FetchLoading';
import Wishlist from './Wishlist';

function Navbar() {
  const [movie, setMovie] = useState('');
  const [temp, setTemp] = useState('');
  const [data, setData] = useState([]);
  const [showSearchResult, setShowSearchResult] = useState(false);
  const [error, setError] = useState('');
  const [showError, setShowError] = useState(false);
  const [showFetchLoading, setShowFetchLoading] = useState(false);
  const [showWishlist, setShowWishlist] = useState(false);
  const apiKey = 'c12f2370';

  function backToHomepage() {
    setShowSearchResult(false);
    setShowWishlist(false);
  }

  function hideSearchResult() {
    setShowSearchResult(false);
    setShowWishlist(true);
  }

  function changeInputValue(movie) {
    setMovie(movie);
    setTemp(movie);
  }

  function pressEnter(e) {
    if (e.key === 'Enter') {
      if (movie.length) {
        getMovieData();
        e.target.blur();
      }
    }
  }

  function clickSearch(e) {
    if (movie.length) {
      getMovieData();
      e.target.blur();
    }
  }

  function getMovieData() {
    setShowFetchLoading(true);

    fetch(`https://omdbapi.com/?apikey=${apiKey}&s=${movie}`)
      .then(response => response.json())
      .then(data => {
        setShowFetchLoading(false);

        if (data.Response === 'True') {
          setData(data.Search);
          setShowError(false);
          setShowSearchResult(true);
          setShowWishlist(false);
          setTemp('');
        } else {
          throw new Error(data.Error);
        }
      })   
      .catch(error => {
        setError(error.message);
        setShowError(true);
        setShowSearchResult(true);
        setShowWishlist(false);
        setTemp('');
      });
  }

  return (
    <>
      <div className="navbar">
        <div className="sm-size">
          <label className="brand">F.</label>
        </div>
        <div className="lg-size">
          <label className="brand">Filmash</label>
        </div>
        <div className="menu" id="menu">
          { showWishlist || showSearchResult ? <button type="button" className="back-btn" id="back-btn" title="Back" onClick={backToHomepage}><i className="fa fa-arrow-left"></i></button> : '' }
          <button type="button" className="wishlist-btn" id="wishlist-btn" title="Wishlist" onClick={hideSearchResult}><i className="fa fa-heart"></i></button>
          <input type="text" className="search-box" id="search-box" placeholder="Search movies" value={temp} onChange={e => changeInputValue(e.target.value)} onKeyUp={e => pressEnter(e)} />
          <button type="button" className="search-btn" id="search-btn" title="Search" onClick={e => clickSearch(e)}><i className="fa fa-search"></i></button>
        </div>
      </div>
      { showFetchLoading ? <FetchLoading /> : '' }
      { showWishlist ? <Wishlist /> : '' }
      { showSearchResult ? <SearchResult data={data} movie={movie} error={error} isError={showError} /> : '' }
      { !showSearchResult && !showWishlist ? <Homepage /> : '' }
      { !showSearchResult && !showWishlist ? <Content /> : '' }
    </>
  );
}

export default Navbar;