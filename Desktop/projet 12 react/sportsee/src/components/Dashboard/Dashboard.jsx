import { useParams } from "react-router-dom";
import Header from "../Header/Header";
import AsideNav from "../AsideNav/AsideNav";
import UserInfo from "../UserInfo/UserInfo";
import ActivityInfo from "../ActivityInfo/ActivityInfo";
import AverageSessionsInfo from "../AverageSessionInfo/AverageSessionsInfo";
import PerformanceInfo from "../PerformanceInfo/PerformanceInfo";
import ScoreInfo from "../ScoreInfo/ScoreInfo";
import ResultatInfo from "../ResultatInfo/ResultatInfo";
import "./Dashboard.css";
import useFetchUserData from "../../hooks/useFetchUserData";

const Dashboard = () => {
  const { userId } = useParams();
  const { data, loading, error } = useFetchUserData(userId);

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