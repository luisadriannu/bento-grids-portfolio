export const getInfo = async () => {
  // Discord Presence
  try {
    const response = await fetch(
      "https://api.lanyard.rest/v1/users/334914085328257026"
    );

    if (!response.ok) {
      throw new Error("Error al obtener datos del servidor");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error en getInfo():", error);
    throw error;
  }
};
