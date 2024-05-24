import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  getUserById,
  getUserActivityById,
  getUserAverageSession,
  getUserPerformance,
} from "../../api";
import Header from "../Header/Header";
import AsideNav from "../AsideNav/AsideNav";
import UserInfo from "../UserInfo/UserInfo";
import ActivityInfo from "../ActivityInfo/ActivityInfo";
import AverageSessionsInfo from "../AverageSessionInfo/AverageSessionsInfo";
import PerformanceInfo from "../PerformanceInfo/PerformanceInfo";
import ScoreInfo from "../ScoreInfo/ScoreInfo";
import ResultatInfo from "../ResultatInfo/ResultatInfo";

const Dashboard = () => {
  const { userId } = useParams();
  const [data, setData] = useState({
    user: null,
    activity: null,
    averageSessions: null,
    performance: null,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log("Fetching user data...");
        const userResponse = await getUserById(Number(userId));
        console.log("User data:", userResponse.data);

        console.log("Fetching activity data...");
        const activityResponse = await getUserActivityById(Number(userId));
        console.log("Activity data:", activityResponse.data);

        console.log("Fetching average session data...");
        const averageSessionsResponse = await getUserAverageSession(Number(userId));
        console.log("Average session data:", averageSessionsResponse.data);

        console.log("Fetching performance data...");
        const performanceResponse = await getUserPerformance(Number(userId));
        console.log("Performance data:", performanceResponse.data);

        setData({
          user: userResponse.data,
          activity: activityResponse.data,
          averageSessions: averageSessionsResponse.data,
          performance: performanceResponse.data,
        });
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError("Les informations utilisateur ne sont pas disponibles.");
        setLoading(false);
      }
    };

    fetchData();
  }, [userId]);

  if (loading) {
    return <div>Chargement...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <Header />
      <div className="Dashboard">
        <AsideNav />
        <div>
          <UserInfo user={data.user} />
          <div className="mainDashboard">
            <div className="info">
              <div>
                <ActivityInfo activity={data.activity.sessions} />
                <div className="graphCarre">
                  <AverageSessionsInfo
                    averageSessions={data.averageSessions.sessions}
                  />
                  <PerformanceInfo performance={data.performance.data} />
                  <ScoreInfo score={data.user.score} />
                </div>
              </div>
              <ResultatInfo keyData={data.user.keyData} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
