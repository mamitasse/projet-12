import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../Header/Header";
import AsideNav from "../AsideNav/AsideNav";

const Home = () => {
  const [userId, setUserId] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate(`/dashboard/${userId}`);
  };

  return (
    <div>
      <Header />
      <div className="Home">
        <AsideNav />
        <div className="mainHome">
          <h1>Bienvenue</h1>
          <form onSubmit={handleSubmit}>
            <label>
              Entrez l'ID utilisateur :
              <input
                type="text"
                value={userId}
                onChange={(e) => setUserId(e.target.value)}
              />
            </label>
            <button type="submit">Voir le tableau de bord</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Home;
