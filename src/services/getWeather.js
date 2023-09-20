export const getWeather = async () => {
  try {
    // Weather
    const url = `https://api.openweathermap.org/data/2.5/weather?q=Mexico&lang=es&units=metric&appid=f7c50d632699a56a7090cdba6fd6ca55`;

    const res = await fetch(url);
    if (!res.ok) {
      throw { status: res.status, statusText: res.statusText };
    }

    const json = await res.json();

    if (json && json.main && json.main.temp) {
      let temp = json.main.temp.toString().slice(0, 2),
        weather = json.weather[0].main,
        weatherEs = json.weather[0].description;

      return { temp, weather, weatherEs };
    } else {
      throw new Error(
        "No se encontró la propiedad 'temp' en la respuesta JSON."
      );
    }
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};
