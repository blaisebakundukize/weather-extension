//openweathermap.org/
const OPEN_WEATHER_API_KEY = 'b0e51c368212209933cf295015457dfa';

export interface IOpenWeatherData {
  name: string;
  main: {
    feels_like: number;
    humidity: number;
    pressure: number;
    temp: number;
    temp_max: number;
    temp_min: number;
  };
  weather: {
    description: string;
    icon: string;
    id: number;
    main: string;
  }[];
  wind: {
    deg: number;
    speed: number;
  };
}

export const fetchOpenWeatherData = async (
  city: string
): Promise<IOpenWeatherData> => {
  const res = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${OPEN_WEATHER_API_KEY}`
  );

  if (!res.ok) {
    throw new Error('City not found');
  }

  const data: IOpenWeatherData = await res.json();
  return data;
};
