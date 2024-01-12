function client(endpoint, customConfig = {}) {
  const config = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": "",
      "X-RapidAPI-Host": "freebooks-api2.p.rapidapi.com",
    },
    ...customConfig,
  };

  return (
    window
      // eslint-disable-next-line no-undef
      .fetch(`${import.meta.env.VITE_REACT_APP_API_URL}`, config)
      .then((response) => response.json())
  );
}

export { client };
