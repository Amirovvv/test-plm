import { defineStore } from "pinia";
import { apiWeather } from "@/api/api"
import { WeatherItemType } from "@/types/types"

export const useWeatherStore = defineStore("weather", {
  state: () => ({
    weather: [] as WeatherItemType[],
    errorText: '',
    isLoading: false
  }),
  actions: {
    async fetchWeather(params: Record<string, string | number>): Promise<any> {
      try {
        this.isLoading = true;
        const response = await apiWeather.get("/", { params });
        this.isLoading = false;
        return response.data;
      } catch (err: any) {
        this.isLoading = false;
        this.errorText = err.response.data.message
        throw err
      }
    },
    async getWeatherByCity(city: string): Promise<void> {
      try {
        this.errorText = ''
        const response = await this.fetchWeather({ q: city })
        this.handleInput(city, response)
        this.saveWeatherToLocalStorage()
      } catch (err) {
        throw err;
      }
    },
    async getWeatherUserLocation(latitude: number, longitude: number): Promise<void> {
      try {
        const response = await this.fetchWeather({ lat: latitude, lon: longitude })
        this.weather.push(response)
        this.saveWeatherToLocalStorage()
        localStorage.setItem('locationUser', response.name);
      } catch (err) {
        throw err;
      }
    },
    async getUserLocation() {
      this.isLoading = true
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
          const { latitude, longitude } = position.coords
          this.getWeatherUserLocation(latitude, longitude)
        }
        )
      } else {
        console.error('Location unavailable');
      }
    },
    removeWeatherById(id: number) {
      this.weather = this.weather.filter(item => {
        if (item.id === id) {
          if (item.name === localStorage.getItem('locationUser')) {
            localStorage.removeItem('locationUser');
          }
          return false;
        }
        return true;
      });

      if (this.weather.length === 0) {
        this.getUserLocation()
      }

      this.saveWeatherToLocalStorage();
    },
    saveWeatherToLocalStorage() {
      localStorage.setItem("weather", JSON.stringify(this.weather));
    },
    loadWeatherLocalStorage() {
      const weatherData = localStorage.getItem("weather");
      if (weatherData) {
        this.isLoading = true;
        setTimeout(() => {
          this.weather = JSON.parse(weatherData);
          this.isLoading = false;
        }, 500);
      }
    },
    loadUserLocationLocalStorage() {
      const locationUser = localStorage.getItem("locationUser");
      if (!locationUser) {
        this.getUserLocation()
      }
    },
    handleInput(query: string, response) {
      const isAlreadyOnList = this.weather.some(item => item.name.toLowerCase() === query.toLowerCase());
      if (isAlreadyOnList) {
        this.errorText = '';
        this.errorText = "It's already on the list";
      } else {
        this.weather.push(response);
        this.errorText = '';
      }
    }
  }
})