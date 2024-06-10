import { useState, useEffect } from "preact/hooks";
import { getInfo } from "../services/getInfo";

export const DiscordStatus = () => {
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

    const interval = setInterval(fetchData, 60000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  if (isLoading) {
    return (
      <article class=" flex flex-col justify-center items-center rounded-2xl relative col-span-1 md:col-span-1 p-4 text-center aspect-square bg-[#f96568] text-white dark:bg-[#3730A3] transition duration-300 delay-75 ease-in-out">
        <div class="flex gap-1 md:gap-2 justify-center items-center text-md md:text-2xl xl:text-3xl font-bold">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="w-4 h-4 md:scale-175"
            viewBox="0 0 24 24"
            stroke-width="2"
            stroke="currentColor"
            fill="none"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
            <path
              d="M14.983 3l.123 .006c2.014 .214 3.527 .672 4.966 1.673a1 1 0 0 1 .371 .488c1.876 5.315 2.373 9.987 1.451 12.28c-1.003 2.005 -2.606 3.553 -4.394 3.553c-.732 0 -1.693 -.968 -2.328 -2.045a21.512 21.512 0 0 0 2.103 -.493a1 1 0 1 0 -.55 -1.924c-3.32 .95 -6.13 .95 -9.45 0a1 1 0 0 0 -.55 1.924c.717 .204 1.416 .37 2.103 .494c-.635 1.075 -1.596 2.044 -2.328 2.044c-1.788 0 -3.391 -1.548 -4.428 -3.629c-.888 -2.217 -.39 -6.89 1.485 -12.204a1 1 0 0 1 .371 -.488c1.439 -1.001 2.952 -1.459 4.966 -1.673a1 1 0 0 1 .935 .435l.063 .107l.651 1.285l.137 -.016a12.97 12.97 0 0 1 2.643 0l.134 .016l.65 -1.284a1 1 0 0 1 .754 -.54l.122 -.009zm-5.983 7a2 2 0 0 0 -1.977 1.697l-.018 .154l-.005 .149l.005 .15a2 2 0 1 0 1.995 -2.15zm6 0a2 2 0 0 0 -1.977 1.697l-.018 .154l-.005 .149l.005 .15a2 2 0 1 0 1.995 -2.15z"
              stroke-width="0"
              fill="currentColor"
            ></path>
          </svg>
          <div>
            <p class="text-sm lg:text-2xl">
              {language === "en" ? "Loading.." : "Cargando.."}
            </p>
          </div>
        </div>
      </article>
    );
  }

  const statusLanguages = {
    online: {
      en: "Online",
      es: "En línea",
    },
    idle: {
      en: "Idle",
      es: "Ausente",
    },
    dnd: {
      en: "Busy",
      es: "Ocupado",
    },
    offline: {
      en: "Offline",
      es: "Desconectado",
    },
  };

  const status = activityData?.data?.discord_status;

  const statusEquivalent = statusLanguages[status]?.[language];

  return (
    <article
      class={`${
        status === "online"
          ? "bg-[#5765F2] dark:bg-[#3730A3]"
          : status === "idle"
          ? "bg-[#fdba33d8] dark:bg-[#E2A22D]"
          : "bg-[#f96568] dark:bg-[#D13F40]"
      } flex flex-col justify-center items-center rounded-2xl relative col-span-1 md:col-span-1 p-4 text-center aspect-square text-white overflow-hidden transition duration-300 delay-75 ease-in-out`}
    >
      {status === "online" ? (
        <img
          src="../assets/icon-account-discord-online.jpg"
          class="w-auto rounded-full h-6 sm:h-8 lg:h-10 absolute top-2 right-2"
          alt="Profile picture discord"
        />
      ) : (
        <img
          src="../assets/icon-account-discord-offline.png"
          class="animate-bounce w-auto h-8 sm:h-12 md:h-14 lg:h-16 absolute bottom-0 right-2"
          alt="Profile picture discord offline"
        />
      )}
      {status === "online" ? (
        <span class="flex absolute top-2 right-2">
          <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-500 opacity-75"></span>
          <span class="relative inline-flex w-2 h-2 md:w-3 md:h-3 bg-green-500 rounded-full"></span>
        </span>
      ) : status === "idle" ? (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="absolute top-2 right-2 w-4 h-4 md:w-6 md:h-6"
          viewBox="0 0 24 24"
          stroke-width="2"
          stroke="currentColor"
          fill="none"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
          <path
            d="M12 1.992a10 10 0 1 0 9.236 13.838c.341 -.82 -.476 -1.644 -1.298 -1.31a6.5 6.5 0 0 1 -6.864 -10.787l.077 -.08c.551 -.63 .113 -1.653 -.758 -1.653h-.266l-.068 -.006l-.06 -.002z"
            stroke-width="0"
            fill="currentColor"
          ></path>
        </svg>
      ) : status === "dnd" ? (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="absolute top-2 right-2 w-4 h-4 md:w-6 md:h-6"
          viewBox="0 0 24 24"
          stroke-width="2"
          stroke="currentColor"
          fill="none"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
          <path
            d="M14.235 19c.865 0 1.322 1.024 .745 1.668a3.992 3.992 0 0 1 -2.98 1.332a3.992 3.992 0 0 1 -2.98 -1.332c-.552 -.616 -.158 -1.579 .634 -1.661l.11 -.006h4.471z"
            stroke-width="0"
            fill="currentColor"
          ></path>
          <path
            d="M12 2c1.358 0 2.506 .903 2.875 2.141l.046 .171l.008 .043a8.013 8.013 0 0 1 4.024 6.069l.028 .287l.019 .289v2.931l.021 .136a3 3 0 0 0 1.143 1.847l.167 .117l.162 .099c.86 .487 .56 1.766 -.377 1.864l-.116 .006h-16c-1.028 0 -1.387 -1.364 -.493 -1.87a3 3 0 0 0 1.472 -2.063l.021 -.143l.001 -2.97a8 8 0 0 1 3.821 -6.454l.248 -.146l.01 -.043a3.003 3.003 0 0 1 2.562 -2.29l.182 -.017l.176 -.004zm-1.489 6.14a1 1 0 0 0 -1.218 1.567l1.292 1.293l-1.292 1.293l-.083 .094a1 1 0 0 0 1.497 1.32l1.293 -1.292l1.293 1.292l.094 .083a1 1 0 0 0 1.32 -1.497l-1.292 -1.293l1.292 -1.293l.083 -.094a1 1 0 0 0 -1.497 -1.32l-1.293 1.292l-1.293 -1.292l-.094 -.083z"
            stroke-width="0"
            fill="currentColor"
          ></path>
        </svg>
      ) : null}

      <div class="flex gap-[1px] md:gap-2 justify-center items-center text-md md:text-2xl xl:text-3xl font-bold">
        {statusEquivalent === "Desconectado" ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class=" w-4 h-4 md:scale-175 absolute top-2 left-2 md:top-3 md:left-3"
            viewBox="0 0 24 24"
            stroke-width="2"
            stroke="currentColor"
            fill="none"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
            <path
              d="M14.983 3l.123 .006c2.014 .214 3.527 .672 4.966 1.673a1 1 0 0 1 .371 .488c1.876 5.315 2.373 9.987 1.451 12.28c-1.003 2.005 -2.606 3.553 -4.394 3.553c-.732 0 -1.693 -.968 -2.328 -2.045a21.512 21.512 0 0 0 2.103 -.493a1 1 0 1 0 -.55 -1.924c-3.32 .95 -6.13 .95 -9.45 0a1 1 0 0 0 -.55 1.924c.717 .204 1.416 .37 2.103 .494c-.635 1.075 -1.596 2.044 -2.328 2.044c-1.788 0 -3.391 -1.548 -4.428 -3.629c-.888 -2.217 -.39 -6.89 1.485 -12.204a1 1 0 0 1 .371 -.488c1.439 -1.001 2.952 -1.459 4.966 -1.673a1 1 0 0 1 .935 .435l.063 .107l.651 1.285l.137 -.016a12.97 12.97 0 0 1 2.643 0l.134 .016l.65 -1.284a1 1 0 0 1 .754 -.54l.122 -.009zm-5.983 7a2 2 0 0 0 -1.977 1.697l-.018 .154l-.005 .149l.005 .15a2 2 0 1 0 1.995 -2.15zm6 0a2 2 0 0 0 -1.977 1.697l-.018 .154l-.005 .149l.005 .15a2 2 0 1 0 1.995 -2.15z"
              stroke-width="0"
              fill="currentColor"
            ></path>
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="w-4 h-4 md:scale-175"
            viewBox="0 0 24 24"
            stroke-width="2"
            stroke="currentColor"
            fill="none"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
            <path
              d="M14.983 3l.123 .006c2.014 .214 3.527 .672 4.966 1.673a1 1 0 0 1 .371 .488c1.876 5.315 2.373 9.987 1.451 12.28c-1.003 2.005 -2.606 3.553 -4.394 3.553c-.732 0 -1.693 -.968 -2.328 -2.045a21.512 21.512 0 0 0 2.103 -.493a1 1 0 1 0 -.55 -1.924c-3.32 .95 -6.13 .95 -9.45 0a1 1 0 0 0 -.55 1.924c.717 .204 1.416 .37 2.103 .494c-.635 1.075 -1.596 2.044 -2.328 2.044c-1.788 0 -3.391 -1.548 -4.428 -3.629c-.888 -2.217 -.39 -6.89 1.485 -12.204a1 1 0 0 1 .371 -.488c1.439 -1.001 2.952 -1.459 4.966 -1.673a1 1 0 0 1 .935 .435l.063 .107l.651 1.285l.137 -.016a12.97 12.97 0 0 1 2.643 0l.134 .016l.65 -1.284a1 1 0 0 1 .754 -.54l.122 -.009zm-5.983 7a2 2 0 0 0 -1.977 1.697l-.018 .154l-.005 .149l.005 .15a2 2 0 1 0 1.995 -2.15zm6 0a2 2 0 0 0 -1.977 1.697l-.018 .154l-.005 .149l.005 .15a2 2 0 1 0 1.995 -2.15z"
              stroke-width="0"
              fill="currentColor"
            ></path>
          </svg>
        )}

        <div>
          <p class="text-sm md:text-xl lg:text-2xl">{statusEquivalent}</p>
        </div>
      </div>
    </article>
  );
};
