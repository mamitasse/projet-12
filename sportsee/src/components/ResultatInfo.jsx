import React, { useEffect, useState } from 'react';
import calorieIcon from "../assets/icon-calorie.png";
import carbohydrateIcon from "../assets/icon-carbohydrate.png";
import lipidIcon from "../assets/icon-lipid.png";
import proteinIcon from "../assets/icon-protein.png";
import { getUserById } from '../api'; // Assurez-vous d'importer correctement votre fonction d'API

const ResultatInfo = ({ userId }) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getUserById(userId);
        setData(response.data.keyData); // Assurez-vous que la structure de vos données correspond à ceci
      } catch (error) {
        console.error("Erreur lors de la récupération des données:", error);
        setError("Les informations ne sont pas disponibles.");
      }
    };

    fetchData();
  }, [userId]);

  if (error) {
    return <div>{error}</div>;
  }

  if (!data) {
    return <div>Chargement...</div>;
  }

  return (
    <div className="resultat-info">
      <div className="resultat-item">
        <img src={calorieIcon} alt="Calories" className="resultat-icon" />
        <div>
          <p>{data.calorieCount} kCal</p>
          <p>Calories</p>
        </div>
      </div>
      <div className="resultat-item">
        <img src={proteinIcon} alt="Protéines" className="resultat-icon" />
        <div>
          <p>{data.proteinCount} g</p>
          <p>Protéines</p>
        </div>
      </div>
      <div className="resultat-item">
        <img src={carbohydrateIcon} alt="Glucides" className="resultat-icon" />
        <div>
          <p>{data.carbohydrateCount} g</p>
          <p>Glucides</p>
        </div>
      </div>
      <div className="resultat-item">
        <img src={lipidIcon} alt="Lipides" className="resultat-icon" />
        <div>
          <p>{data.lipidCount} g</p>
          <p>Lipides</p>
        </div>
      </div>
    </div>
  );
};

export default ResultatInfo;
