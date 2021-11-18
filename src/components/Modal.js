import './Modal.css';

function Modal({data}) {
  function minToHour(runtime) {
    let minute = 0, hour = 0;

    for (let i = 0; i < runtime.length; i++) {
      if (runtime[i] >= '0' && runtime[i] <= '9') {
        minute *= 10;
        minute += parseInt(runtime[i]);
      } else {
        break;
      }
    }

    while (minute >= 60) {
      minute -= 60;
      hour++;
    }

    return [hour, minute];
  }

  let time = minToHour(data.Runtime);

  return (
    <div className="modal" id="modal">
      <div className="left">
        <div className="poster">
          <img src={data.Poster} alt={data.Title} />
        </div>
      </div>
      <div className="right">
        <h1>{data.Title}</h1>
        <p>{data.Plot}</p>
        <hr />
        <h3><i className="fa fa-user-tie" title="Director"></i> {data.Director}</h3>
        <h3><i className="fa fa-user" title="Actors"></i> {data.Actors}</h3>
        <h3><i className="fa fa-pen-alt" title="Writer"></i> {data.Writer}</h3>
        <h3><i className="fa fa-medal" title="Awards"></i> {data.Awards}</h3>
        <h3><i className="fa fa-money-bill" title="BoxOffice"></i> {data.BoxOffice}</h3>
        <h3><i className="fa fa-globe" title="Country"></i> {data.Country}</h3>
        <h3><i className="fa fa-language" title="Language"></i> {data.Language}</h3>
        <h3><i className="fa fa-film" title="Genre"></i> {data.Genre}</h3>
        <h3><i className="fa fa-circle" title="Rated"></i> {data.Rated}</h3>
        <h3><i className="fa fa-calendar" title="Released"></i> {data.Released}</h3>
        <h3><i className="fa fa-clock" title="Runtime"></i> {time[0]}h {time[1]}m</h3>
        <h3><i className="fa fa-star" title="Rating"></i> {data.imdbRating}</h3>
      </div>
    </div>
  );
}

export default Modal;