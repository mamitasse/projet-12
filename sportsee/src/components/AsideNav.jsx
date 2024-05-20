import React from 'react';
import styled from 'styled-components';
import { styleVar } from '../style/styleVariables'; // Assurez-vous que ce chemin est correct
import pictoBodybuilding from '../assets/picto-bodybuilding.png';
import pictoCycling from '../assets/picto-cycling.png';
import pictoMeditation from '../assets/picto-meditation.png';
import pictoSwimming from '../assets/picto-swimming.png';

const AsideNav = () => {
  return (
    <AsideNavContainer>
      <nav>
        <ActivitiesList>
          <li>
            <a href="/">
              <ActivityPicto src={pictoMeditation} alt="Méditation" />
            </a>
          </li>
          <li>
            <a href="/">
              <ActivityPicto src={pictoSwimming} alt="Natation" />
            </a>
          </li>
          <li>
            <a href="/">
              <ActivityPicto src={pictoCycling} alt="Cyclisme" />
            </a>
          </li>
          <li>
            <a href="/">
              <ActivityPicto src={pictoBodybuilding} alt="Musculation" />
            </a>
          </li>
        </ActivitiesList>
      </nav>

      <Disclaimer>Copyright SportSee 2021</Disclaimer>
    </AsideNavContainer>
  );
};

export default AsideNav;

const AsideNavContainer = styled.div`
  display: flex;
  flex-direction: column;
  color: white;
  background: ${styleVar.neutral900};
  @media (max-width: 1340px) {
    max-height: 692px;
    list-style-type: none;
  }
`;

const ActivitiesList = styled.ul`
  display: flex;
  flex-direction: column;
  justify-content: center;
  list-style-type: none;
  height: 100%;
`;

const ActivityPicto = styled.img`
  padding: 0.5rem;
`;

const Disclaimer = styled.p`
  display: flex;
  align-items: center;
  padding: 3rem 0;
  font-size: 0.8rem;
  writing-mode: vertical-lr;
  transform: rotate(180deg);
  @media (max-width: 1340px) {
    padding: 2rem;
    font-family: Roboto;
    font-size: 12px;
    font-weight: 500;
    line-height: 24px;
    text-align: left;
  }
`;
