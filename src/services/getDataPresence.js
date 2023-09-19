export const getInfo = async () => {
  // Obtenemos la respuesta de la API
  const data = await fetch(
    "https://api.lanyard.rest/v1/users/334914085328257026"
  ).then((res) => res.json());

  return data;
};
