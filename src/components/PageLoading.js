import './PageLoading.css';

function PageLoading() {
  return (
    <div className="page-loading" id="page-loading">
      <img src={process.env.PUBLIC_URL + '/img/logo.png'} className="logo" alt="Logo" width="40" />
      <span className="line" />
    </div>
  );
}

export default PageLoading;