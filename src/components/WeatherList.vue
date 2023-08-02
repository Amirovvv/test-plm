<script setup lang="ts">
import { PropType } from 'vue'
import { WeatherItemType } from '@/types/types'
import WeatherCard from '@/components/WeatherCard.vue'

defineProps({
  weatherData: {
    type: Object as PropType<WeatherItemType[]>,
    required: true,
  },
})
</script>

<template>
  <div class="weather-list">
    <WeatherCard
      v-for="weather in weatherData"
      :key="weather.id"
      :weather-item="weather"
    />
  </div>
</template>

<style scoped>
.weather-list {
  display: flex;
  flex-direction: column;
  gap: 14px;
}
</style>
