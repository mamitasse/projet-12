import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  getUserById,
  getUserActivityById,
  getUserAverageSession,
  getUserPerformance,
} from "../api";
import Header from "./Header";
import AsideNav from "./AsideNav";
import UserInfo from "./UserInfo";
import ActivityInfo from "./ActivityInfo";
import AverageSessionsInfo from "./AverageSessionsInfo";
import PerformanceInfo from "./PerformanceInfo";
import ScoreInfo from "./ScoreInfo";
import ResultatInfo from "./ResultatInfo";

const Dashboard = () => {
  const { userId } = useParams();
  const [data, setData] = useState({
    user: null,
    activity: null,
    averageSessions: null,
    performance: null,
  });
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log("Fetching user data...");
        const userResponse = await getUserById(userId);
        console.log("User data:", userResponse);

        console.log("Fetching activity data...");
        const activityResponse = await getUserActivityById(userId);
        console.log("Activity data:", activityResponse);

        console.log("Fetching average session data...");
        const averageSessionsResponse = await getUserAverageSession(userId);
        console.log("Average session data:", averageSessionsResponse);

        console.log("Fetching performance data...");
        const performanceResponse = await getUserPerformance(userId);
        console.log("Performance data:", performanceResponse);

        setData({
          user: userResponse.data,
          activity: activityResponse.data,
          averageSessions: averageSessionsResponse.data,
          performance: performanceResponse.data,
        });
      } catch (error) {
        console.error("Error fetching data:", error);
        setError("Les informations utilisateur ne sont pas disponibles.");
      }
    };

    fetchData();
  }, [userId]);

  if (error) {
    return <div>{error}</div>;
  }

  if (
    !data.user ||
    !data.activity ||
    !data.averageSessions ||
    !data.performance
  ) {
    return <div>Chargement...</div>;
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
                  <ScoreInfo userId={userId} />
                </div>
              </div>

              <ResultatInfo userId={userId} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
