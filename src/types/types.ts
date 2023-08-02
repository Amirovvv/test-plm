interface Weather {
  id: number;
  main: string;
  description: string;
  icon: string;
}

interface Sys {
  country: string;
}

interface Main {
  temp: number;
  pressure: number;
  humidity: number;
}

interface Wind {
  speed: number;
}

export interface WeatherItemType {
  id: number;
  name: string;
  sys: Sys;
  main: Main;
  weather: Weather[];
  wind: Wind;
}