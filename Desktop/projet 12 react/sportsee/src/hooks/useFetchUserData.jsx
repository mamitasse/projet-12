import { useEffect, useState } from "react";
import {
  getUserById,
  getUserActivityById,
  getUserAverageSession,
  getUserPerformance,
} from "../api";

const useFetchUserData = (userId) => {
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

        if (!userResponse.data || !userResponse.data.userInfos) {
          throw new Error("Invalid user data");
        }

        console.log("Fetching activity data...");
        const activityResponse = await getUserActivityById(Number(userId));
        console.log("Activity data:", activityResponse.data);

        console.log("Fetching average session data...");
        const averageSessionsResponse = await getUserAverageSession(
          Number(userId)
        );
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

  return { data, loading, error };
};

export default useFetchUserData;
