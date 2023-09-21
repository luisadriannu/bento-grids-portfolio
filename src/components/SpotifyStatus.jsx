import { useState, useEffect } from "preact/hooks";
import { getInfo } from "../services/getInfo";

export const SpotifyStatus = () => {
  const [activityData, setActivityData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [language, setLanguage] = useState("en");

  useEffect(() => {
    const userLanguage = document.documentElement.getAttribute("lang");
    setLanguage(userLanguage);
  }, []);

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

    const interval = setInterval(fetchData, 300000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  if (isLoading) {
    return (
      <>
        <p class="text-[#ffffff] font-bold text-xs lg:text-2xl md:text-xl">
          {language === "en" ? "Loading.." : "Cargando.."}
        </p>
        <img
          loading="lazy"
          class="absolute w-full h-full top-0 left-0 object-center object-cover z-[-1]"
          src="../assets/spotify-offline.jpeg"
          alt="Spotify Album"
        ></img>
      </>
    );
  }

  return (
    <div class="flex flex-col gap-4">
      <div>
        <p class="text-[#ffffff] font-bold text-xs lg:text-2xl md:text-xl">
          {activityData?.data?.spotify === null
            ? language === "en"
              ? "Recently listened"
              : "Escuchado recientemente"
            : language === "en"
            ? "Listening now"
            : "Escuchando ahora"}
        </p>
        <div class="flex flex-col gap-1">
          <p class="text-[#ffffff] w-full xl:text-xl lg:text-lg text-xs font-semibold truncate">
            {activityData?.data?.spotify === null
              ? "DIOR"
              : activityData?.data?.spotify.song}
          </p>
          <p class="text-[#ffffff] w-full xl:text-xl lg:text-lg text-xs truncate">
            {activityData?.data?.spotify === null
              ? "REV"
              : activityData?.data?.spotify.artist}
          </p>
        </div>
      </div>
      <img
        loading="lazy"
        class="absolute w-full h-full top-0 left-0 object-center object-cover z-[-1]"
        src={
          activityData?.data?.spotify === null
            ? "../assets/spotify-offline.jpeg"
            : `${activityData?.data?.spotify.album_art_url}`
        }
        alt="Spotify Album"
      ></img>
    </div>
  );
};
