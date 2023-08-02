<script setup lang="ts">
import { PropType } from 'vue'
import { useWeatherStore } from '@/stores/weather.store'
import { WeatherItemType } from '@/types/types'
import { IconDrag, IconDelete } from '@/components/icons'

const props = defineProps({
  weatherItem: {
    type: Object as PropType<WeatherItemType>,
    required: true,
  },
})

const store = useWeatherStore()

const flagUrl = `http://openweathermap.org/images/flags/${props.weatherItem.sys.country.toLowerCase()}.png`

const removeWeather = (id: number) => {
  store.removeWeatherById(id)
}
</script>

<template>
  <div class="weather-selected">
    <div class="weather-selected__left">
      <div class="weather-selected__name">
        <IconDrag class="weather-selected__icon handle" />
        <div>
          {{ weatherItem.name }}
          <img :src="flagUrl" />
        </div>
      </div>
      <button @click="removeWeather(weatherItem.id)"><IconDelete /></button>
    </div>
  </div>
</template>

<style scoped lang="scss">
.weather-selected {
  padding: 8px;
  border-radius: $size-14;
  background: #e0e0e0;
  align-items: center;

  &__left {
    gap: 6px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  &__name {
    display: flex;
    gap: 6px;
  }

  &__icon {
    cursor: all-scroll;
  }
}
</style>
