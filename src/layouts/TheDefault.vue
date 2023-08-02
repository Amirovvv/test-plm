<script setup lang="ts">
import WeatherMenu from '@/components/WeatherMenu.vue'
import { onMounted } from 'vue'
import { useWeatherStore } from '@/stores/weather.store'

const store = useWeatherStore()

onMounted(() => {
  store.loadWeatherLocalStorage()
})
</script>

<template>
  <div class="layout">
    <WeatherMenu />
    <div class="main">
      <RouterView />
    </div>
  </div>
</template>

<style scoped>
.layout {
  width: 400px;
  margin: 20px auto;
  display: flex;
  flex-direction: column;
  max-width: 600px;
  gap: 20px;
  height: 100vh;
}
</style>
