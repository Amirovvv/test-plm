<script setup lang="ts">
import { onMounted } from 'vue'
import { useWeatherStore } from '@/stores/weather.store'
import WeatherList from '@/components/WeatherList.vue'
import AppLoader from '@/components/ui/AppLoader.vue'

const store = useWeatherStore()

onMounted(() => {
  store.loadUserLocationLocalStorage()
})
</script>

<template>
  <AppLoader :isLoading="store.isLoading">
    <WeatherList :weather-data="store.weather" />
  </AppLoader>
</template>
