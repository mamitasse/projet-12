//pages/home.js
import React from 'react';
import nadiaImage from '../assets/nadiapagedaccueil.png';
import sabrinaImage from '../assets/sabrinapagedaccueil.jpg';

import { Link } from 'react-router-dom';
import './Home.css'; 

function Home() {
  return (
    <div className="home-container">
      

      <main className="main-content">
        <h1>IdiriCoaching: coaching personnalisé</h1>
        <p>avec Nadia (Marne la Vallée) et Sabrina (Paris et périphérie nord 92, 95)</p>

        <div className="coaches">
          <div className="coach-card">
            <Link to="/nadia" className="coach-link">
              <img src={nadiaImage} alt="Nadia" className="coach-image" />
              <div className="coach-info">
                <h2>NADIA</h2>
                <button className="presentation-button">Présentation →</button>
              </div>
            </Link>
          </div>

          <div className="coach-card">
            <Link to="/sabrina" className="coach-link">
              <img src={sabrinaImage} alt="Sabrina" className="coach-image" />
              <div className="coach-info">
                <h2>SABRINA</h2>
                <button className="presentation-button">Présentation →</button>
              </div>
            </Link>
          </div>
        </div>

      <div className='connexion-inscription'>
      <div className="signin-section">
         <button className="signup-button connexion" onClick={() => window.location.href = '/login'}>
       connexion
        </button>
        </div>
        <div className="signin-section">
         <button className="signup-button connexion" onClick={() => window.location.href = '/signup'}>
       inscription
        </button>
        </div>
      </div>
        
        <div className="signin-section">
         <button className="signup-button contact" onClick={() => window.location.href = '/Contact'}>
        Contact
        </button>
        </div>


       
      </main>
    </div>
  );
}

export default Home;
