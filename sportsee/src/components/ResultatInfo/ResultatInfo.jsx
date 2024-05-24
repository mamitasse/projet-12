import React from 'react';
import calorieIcon from "../../assets/icon-calorie.png";
import carbohydrateIcon from "../../assets/icon-carbohydrate.png";
import lipidIcon from "../../assets/icon-lipid.png";
import proteinIcon from "../../assets/icon-protein.png";

const ResultatInfo = ({ keyData }) => {
  if (!keyData) {
    return <div>Chargement...</div>;
  }

  return (
    <div className="resultat-info">
      <div className="resultat-item">
        <img src={calorieIcon} alt="Calories" className="resultat-icon" />
        <div>
          <p>{keyData.calorieCount} kCal</p>
          <p>Calories</p>
        </div>
      </div>
      <div className="resultat-item">
        <img src={proteinIcon} alt="Protéines" className="resultat-icon" />
        <div>
          <p>{keyData.proteinCount} g</p>
          <p>Protéines</p>
        </div>
      </div>
      <div className="resultat-item">
        <img src={carbohydrateIcon} alt="Glucides" className="resultat-icon" />
        <div>
          <p>{keyData.carbohydrateCount} g</p>
          <p>Glucides</p>
        </div>
      </div>
      <div className="resultat-item">
        <img src={lipidIcon} alt="Lipides" className="resultat-icon" />
        <div>
          <p>{keyData.lipidCount} g</p>
          <p>Lipides</p>
        </div>
      </div>
    </div>
  );
};

export default ResultatInfo;
