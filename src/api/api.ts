import axios, { AxiosInstance } from 'axios'

const apiKeyWeather: string = import.meta.env.VITE_API_KEY_WEATHER as string
const baseURL: string = `https://api.openweathermap.org/data/2.5/weather`

export const apiWeather: AxiosInstance = axios.create({
  baseURL,
  params: { appid: apiKeyWeather, units: 'metric' }
})