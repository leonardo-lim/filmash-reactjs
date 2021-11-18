import { useEffect, useState } from 'react';
import './Wishlist.css';
import Modal from './Modal';

function Wishlist() {
  const [data, setData] = useState();
  const [dataIndex, setDataIndex] = useState();
  const [showModal, setShowModal] = useState(false);
  const [showMessage, setShowMessage] = useState(false);

  function showDetails(i) {
    setShowModal(true);
    setDataIndex(i);
  }

  function hideDetails() {
    setShowModal(false);
  }

  function removeFromWishlist(i) {
    if (localStorage.getItem('movies') !== null) {
      setData(data.filter((d, idx) => idx !== i));
      data.splice(i, 1);
      localStorage.setItem('movies', JSON.stringify(data));
      setShowMessage(true);
    }
  }

  useEffect(() => {
    if (localStorage.getItem('movies') === null) {
      setData([]);
    } else {
      setData(JSON.parse(localStorage.getItem('movies')));
    }
  }, []);

  return (
    <div className="wishlist" id="wishlist">
      <div className="desc" id="desc">
        <div className="left">
          <img src={process.env.PUBLIC_URL + '/img/search-result.png'} alt="Wishlist" />
        </div>
        {
          data?.length === 0 ?  (
            <div className="right">
              <h1>Your wishlist</h1>
              <h1>is empty</h1>
            </div>
          ) : (
            <div className="right">
              <h1>Showing { data?.length > 0 ? data.length : '' }</h1>
              <h1>movie{ data?.length > 0 ? data.length > 1 ? 's' : '' : '' } from</h1>
              <h1>your wishlist</h1>
            </div>
          )
        }
      </div>
      <div className="movie" id="movie">
        {
          data?.length > 0 ? (
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
                      <button type="button" className="detail-btn" onClick={() => showDetails(i)}><i className="fa fa-info-circle"></i> See Details</button>
                      <button type="button" className="add-wishlist-btn" onClick={() => removeFromWishlist(i)}><i className="fa fa-trash"></i> Remove from Wishlist</button>
                    </div>
                  </div>
                </div>
              );
            })
          ) : ''
        }
      </div>
      { showMessage ? <span className="message">Movie removed from wishlist <button type="button" title="Close" onClick={() => setShowMessage(false)}><i className="fa fa-times"></i></button></span> : '' }
      { showModal ? <Modal data={data[dataIndex]} /> : '' }
      { showModal ? <button type="button" className="close-btn" id="close-btn" title="Close" onClick={hideDetails}><i className="fa fa-times"></i></button> : '' }
    </div>
  );
}

export default Wishlist;