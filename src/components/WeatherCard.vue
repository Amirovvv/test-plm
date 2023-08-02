<script setup lang="ts">
import { computed, PropType } from 'vue'
import { WeatherItemType } from '@/types/types'
import { IconPressure, IconHumidity, IconSpeed } from '@/components/icons'

const props = defineProps({
  weatherItem: {
    type: Object as PropType<WeatherItemType>,
    required: true,
  },
})

const iconUrl = `https://openweathermap.org/img/wn/${
  props.weatherItem.weather[0].icon
}@${'2x'}.png`
const flagUrl = `http://openweathermap.org/images/flags/${props.weatherItem.sys.country.toLowerCase()}.png`

const capitalizedText = computed(() => {
  if (!props.weatherItem.name) return ''
  return (
    props.weatherItem.weather[0].description.charAt(0).toLocaleUpperCase() +
    props.weatherItem.weather[0].description.slice(1)
  )
})
</script>

<template>
  <div class="weather card">
    <div class="card-basic">
      <div class="card-basic__left">
        <div class="weather-name">
          <span>{{ weatherItem.name }}, {{ weatherItem.sys.country }}</span
          ><img :src="flagUrl" />
        </div>
        <div class="weather-temp">
          {{ Math.round(weatherItem.main.temp) }}°C
        </div>
      </div>
      <div class="card-basic__right">
        <div class="weather-description">{{ capitalizedText }}</div>
        <div class="weather-logo">
          <img :src="iconUrl" />
        </div>
      </div>
    </div>
    <div class="card-additionally">
      <div class="weather-pressure">
        <IconPressure /> {{ weatherItem.main.pressure }} hPa
      </div>
      <div class="weather-humidity">
        <IconHumidity /> {{ weatherItem.main.humidity }} %
      </div>
      <div class="weather-speed">
        <IconSpeed /> {{ weatherItem.wind.speed }} m/s
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.card {
  min-width: 200px;
  width: 400px;
  max-width: 600px;
  border: 1px solid $light-gray;
  border-radius: $size-14;
  display: flex;
  flex-direction: column;
  padding: 18px 26px;
  background: white;

  &-basic {
    display: flex;
    justify-content: space-between;

    &__left {
      display: flex;
      gap: 20px;
      flex-direction: column;
    }
    &__right {
      text-align: center;
    }
  }
  &-additionally {
    display: flex;
    justify-content: space-between;
  }
}

.weather {
  &-name {
    font-weight: 400;
    font-size: 16px;
    span {
      margin-right: 8px;
    }
  }
  &-description {
    font-weight: 400;
    font-size: 16px;
  }
  &-temp {
    font-weight: 700;
    font-size: 36px;
  }
  &-pressure,
  &-humidity,
  &-speed {
    display: flex;
    align-items: center;
    gap: 8px;
    background: #e8e8e8;
    border-radius: 50px;
    padding: 4px 6px;
  }
}
</style>
