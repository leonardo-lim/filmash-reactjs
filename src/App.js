import { useEffect, useState } from 'react';
import './App.css';
import Background from './components/Background';
import PageLoading from './components/PageLoading';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  });

  return (
    <>
      {
        loading ? <PageLoading /> : (
          <div className="app">
            <Background />
            <Navbar />
            <Footer />
          </div>
        )
      }
    </>
  );
}

export default App;
