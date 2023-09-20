import { useState, useEffect } from "preact/hooks";
import { getInfo } from "../services/getInfo";

export const SpotifyStatus = () => {
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
    return (
      <>
        <p class="text-[#ffffff] font-bold text-xs lg:text-2xl md:text-xl">
          Cargando..
        </p>
        <img
          class="absolute w-full h-full top-0 left-0 object-center object-cover z-[-1]"
          src="./spotify-offline.jpeg"
          alt="Discord"
        ></img>
      </>
    );
  }

  return (
    <div class="flex flex-col gap-4">
      <div>
        <p class="text-[#ffffff] font-bold text-xs lg:text-2xl md:text-xl">
          {activityData?.data?.spotify === null
            ? "Escuchado recientemente:"
            : "Escuchando ahora:"}
        </p>
        <div class="flex flex-col gap-2">
          <p class="text-[#ffffff] w-full xl:text-xl lg:text-lg text-xs font-semibold truncate">
            {activityData?.data?.spotify === null
              ? "DIOR"
              : activityData?.data?.spotify.album}
          </p>
          <p class="text-[#ffffff] w-full xl:text-xl lg:text-lg text-xs truncate">
            {activityData?.data?.spotify === null
              ? "REV"
              : activityData?.data?.spotify.artist}
          </p>
        </div>
      </div>
      <img
        class="absolute w-full h-full top-0 left-0 object-center object-cover z-[-1]"
        src={
          activityData?.data?.spotify === null
            ? "./spotify-offline.jpeg"
            : `${activityData?.data?.spotify.album_art_url}`
        }
        alt="Discord"
      ></img>
    </div>
  );
};