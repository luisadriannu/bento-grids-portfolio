import { useState, useEffect } from "preact/hooks";
import { getInfo } from "../services/getInfo";

export const DiscordStatus = () => {
  const [activityData, setActivityData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getInfo();
        setActivityData(data);
        setIsLoading(false);
      } catch (err) {
        console.error("Error al obtener datos:", err);
        setIsLoading(false);
      }
    };

    fetchData();

    const interval = setInterval(fetchData, 600000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  if (isLoading) {
    return <p>Cargando..</p>;
  }

  return <p>{activityData?.data?.discord_status}</p>;
};
