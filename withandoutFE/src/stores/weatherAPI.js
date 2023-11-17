export const useWeather = () => {
  const API_KEY = '6f4f4597bfcc0c858953ac9b3a3573e0';

  const success = (position) => {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;

    getWeather(latitude, longitude);
  };

  const getWeather = (lat, lon) => {
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric&lang=kr`
    ).then((response) => {
      return response.json();
    });
  };
};
