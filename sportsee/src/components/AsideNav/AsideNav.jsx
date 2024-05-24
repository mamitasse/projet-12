import React from 'react';
import './AsideNav.css';
import pictoBodybuilding from '../../assets/picto-bodybuilding.png';
import pictoCycling from '../../assets/picto-cycling.png';
import pictoMeditation from '../../assets/picto-meditation.png';
import pictoSwimming from '../../assets/picto-swimming.png';

const AsideNav = () => {
  return (
    <div className="aside-nav-container">
      <nav>
        <ul className="activities-list">
          <li>
            <a href="/">
              <img className="activity-picto" src={pictoMeditation} alt="Méditation" />
            </a>
          </li>
          <li>
            <a href="/">
              <img className="activity-picto" src={pictoSwimming} alt="Natation" />
            </a>
          </li>
          <li>
            <a href="/">
              <img className="activity-picto" src={pictoCycling} alt="Cyclisme" />
            </a>
          </li>
          <li>
            <a href="/">
              <img className="activity-picto" src={pictoBodybuilding} alt="Musculation" />
            </a>
          </li>
        </ul>
      </nav>

      <p className="disclaimer">Copyright SportSee 2021</p>
    </div>
  );
};

export default AsideNav;
