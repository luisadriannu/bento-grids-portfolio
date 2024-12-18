import { useState, useEffect } from "preact/hooks";
import { getWeather } from "../services/getWeather";
import "./Styles.css";

function ShowTime() {
  const [currentHours, setCurrentHours] = useState(getCurrentHours());
  const [hourConditional, setHourConditional] = useState(getHoursConditional());
  const [weather, setWeather] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [language, setLanguage] = useState("en");

  //  LANGUAGE
  useEffect(() => {
    const userLanguage = document.documentElement.getAttribute("lang");
    setLanguage(userLanguage);
  }, []);

  // CLIMA
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getWeather();
        setWeather(data);
        setIsLoading(false);
      } catch (err) {
        console.error("Error al obtener datos:", err);
        setIsLoading(false);
      }
    };

    fetchData();

    const interval = setInterval(fetchData, 3600000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  // HORAS
  useEffect(() => {
    const interval = setInterval(() => {
      const timeZone = "America/Mexico_City";
      const now = new Date();

      const localTime = new Date(now.toLocaleString("en-US", { timeZone }));

      const hours = localTime.getHours();
      const minutes = localTime.getMinutes();

      setCurrentHours(() => {
        const displayHours = hours % 12 || 12;
        const displayMinutes = minutes.toString().padStart(2, "0");
        const displayAmPm = hours >= 12 ? "PM" : "AM";
        return `${displayHours}:${displayMinutes} ${displayAmPm}`;
      });

      setHourConditional(hours);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  function getCurrentHours() {
    const timeZone = "America/Mexico_City";
    let timeNow = new Date().toLocaleString("es-MX", { timeZone: timeZone });
    let hours = timeNow.split(" ")[1].split(":")[0];
    let minutes = timeNow.split(" ")[1].split(":")[1];
    let ampm = "AM";

    if (hours >= 12) {
      ampm = "PM";
      if (hours > 12) {
        hours -= 12;
      }
    }

    if (hours === 0) {
      hours = 12;
    }

    minutes = minutes.toString().padStart(2, "0");

    return `${hours}:${minutes} ${ampm}`;
  }

  function getHoursConditional() {
    const timeZone = "America/Mexico_City";
    const timeNow = new Date().toLocaleString("es-MX", { timeZone: timeZone });
    const [time, ampm] = timeNow.split(" ")[1].split(" ");
    let [hours, minutes] = time.split(":").map(Number);

    if (ampm === "PM" && hours !== 12) {
      hours += 12;
    }

    if (ampm === "AM" && hours === 12) {
      hours = 0;
    }

    return hours;
  }

  if (isLoading) {
    return (
      <div class="bg-[#089cffa4] w-full flex overflow-hidden bg-clip-padding text-white py-2 px-4 lg:p-8`">
        <div class="flex flex-col justify-center md:h-full w-2/3 absolute lg:static z-10">
          <p class="text-white capitalize text-xs md:text-xl lg:text-2xl font-semibold lg:mb-0">
            {language === "en" ? "Loading.." : "Cargando.."}
          </p>
        </div>
        <div class="absolute right-0 top-0 flex z-0 items-center w-full h-full overflow-hidden justify-end">
          <div class="TimeCard_hot TimeCard_container w-20 h-20 md:w-56 md:h-56 right-5">
            <span class="TimeCard_sun w-10 h-10 md:w-24 md:h-24"></span>
            <span class="TimeCard_sunx"></span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      class={`${
        hourConditional >= 8 && hourConditional <= 18
          ? "bg-[#089cffa4]"
          : "bg-[#001324]"
      } w-full flex overflow-hidden bg-clip-padding text-white px-4 lg:p-8`}
    >
      <div class="flex flex-col justify-center mt-3 md:mt-0 absolute md:h-full w-2/3 lg:static z-10 ">
        <div>
          <p class="text-lg md:text-5xl lg:text-7xl font-bold">
            {weather?.temp}°
          </p>
          <p class="capitalize text-xs md:text-xl lg:text-2xl font-semibold lg:mb-0">
            {language === "en" ? weather?.weather : weather?.weatherEs}
          </p>
          <p class="text-xs md:text-lg">{currentHours}</p>
          <p class="text-xs md:text-lg">
            {language === "en" ? "In Mexico" : "En México"}
          </p>
        </div>
      </div>

      {hourConditional >= 8 && hourConditional <= 18 ? (
        <div class="absolute right-0 top-0 flex z-0 items-center w-full h-full overflow-hidden justify-end pr-2 md:pr-0">
          <div class="TimeCard_hot TimeCard_container w-20 h-20 md:w-56 md:h-56 right-5">
            <span class="TimeCard_sun w-10 h-10 md:w-24 md:h-24"></span>
            <span class="TimeCard_sunx"></span>
          </div>
        </div>
      ) : (
        <div class="absolute right-0 top-0 flex justify-end z-0 items-center w-full h-full overflow-hidden">
          <div class="TimeCard_night TimeCard_container w-20 h-20 md:w-56 md:h-56 right-5">
            <span class="TimeCard_moon w-10 h-10 md:w-24 md:h-24"></span>
            <span class="TimeCard_spot1"></span>
            <span class="TimeCard_spot2"></span>
            <ul>
              <li></li>
              <li></li>
              <li></li>
              <li></li>
              <li></li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}

export default ShowTime;
