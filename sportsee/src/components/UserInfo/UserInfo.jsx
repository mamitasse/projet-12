import React from 'react';
import './UserInfo.css';

const UserInfo = ({ user }) => {
    console.log("User Info:", user);
    if (!user || !user.userInfos) {
        return <p>Les informations utilisateur ne sont pas disponibles.</p>;
    }

    return (
        <div className='headerDashboard'>
            <h1>Bonjour <span>{user.userInfos.firstName}</span> </h1>
            <p>Félicitation ! Vous avez explosé vos objectifs hier 👏</p>
          
        </div>
    );
};

export default UserInfo;
