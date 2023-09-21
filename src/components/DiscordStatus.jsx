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

    const interval = setInterval(fetchData, 600000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  if (isLoading) {
    return (
      <article class=" flex flex-col justify-center items-center rounded-2xl relative col-span-1 md:col-span-1 p-4 text-center aspect-square bg-[#f96568] text-white border-2 dark:border-[#30363D] dark:bg-[#3730A3] transition duration-300 delay-75 ease-in-out">
        <div class="flex gap-1 md:gap-2 justify-center items-center text-md md:text-2xl xl:text-3xl font-bold">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="lg:scale-175"
            width="24"
            height="24"
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

  const status = activityData?.data?.discord_status;

  let statuSlice = "O" + status.slice(1, 8);

  return (
    <article
      class={`${
        statuSlice === "Online"
          ? "bg-[#5765F2] dark:bg-[#3730A3]"
          : "bg-[#f96568] dark:bg-[#D13F40]"
      } flex flex-col justify-center items-center rounded-2xl relative col-span-1 md:col-span-1 p-4 text-center aspect-square text-white border-2 dark:border-[#30363D] transition duration-300 delay-75 ease-in-out`}
    >
      <img
        src="../assets/icon-account-discord.jpg"
        class="w-auto rounded-full h-6 md:h-8 lg:h-10 absolute top-2 right-2"
        alt="Icon Discord"
      />
      <div class="flex gap-1 md:gap-2 justify-center items-center text-md md:text-2xl xl:text-3xl font-bold">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="lg:scale-175"
          width="24"
          height="24"
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
          <p class="text-sm md:text-2xl lg:text-3xl">{statuSlice}</p>
        </div>
      </div>
    </article>
  );
};
