import React from 'react';
import './Header.css';
import SportSeeLogo from '../../assets/logo.svg';

export default function Header() {
  return (
    <header className="header-container" data-testid="header">
      <a className="logo-link" href="/">
        <img src={SportSeeLogo} alt="SportSee" />
      </a>
      <nav>
        <ul className="links-list">
          <li>
            <a className="header-link" href="/">Accueil</a>
          </li>
          <li>
            <a className="header-link" href="/">Profil</a>
          </li>
          <li>
            <a className="header-link" href="/">Réglages</a>
          </li>
          <li>
            <a className="header-link" href="/">Communauté</a>
          </li>
        </ul>
      </nav>
    </header>
  );
}
