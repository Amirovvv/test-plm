<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useWeatherStore } from '@/stores/weather.store'
import { IconLocation } from '@/components/icons'
import WeatherSelected from '@/components/WeatherSelected.vue'
import AppInput from '@/components/ui/AppInput.vue'
import AppLoader from '@/components/ui/AppLoader.vue'
import draggable from 'vuedraggable'

const store = useWeatherStore()

const searchQuery = ref<string>('')

const getWeather = (): void => {
  store.getWeatherByCity(searchQuery.value)
}

onMounted(() => {
  store.loadUserLocationLocalStorage()
})
</script>

<template>
  <div class="settings">
    <div class="settings-locations">
      <h3>Selected Locations</h3>
      <draggable
        v-model="store.weather"
        tag="ul"
        handle=".handle"
        @end="store.saveWeatherToLocalStorage"
        :itemKey="(item) => item.id"
      >
        <template #item="{ element }">
          <li>
            <WeatherSelected :weather-item="element" />
          </li>
        </template>
      </draggable>
      <div class="settings-locations__loader">
        <AppLoader :is-loading="store.isLoading" />
      </div>
    </div>
    <div class="settings-search">
      <h3>Add Location</h3>
      <div class="settings-search__input">
        <AppInput
          :input-icon="true"
          :error-text="store.errorText"
          input-placeholder="City"
          v-model.trim="searchQuery"
        >
          <template v-slot:icon>
            <IconLocation />
          </template>
        </AppInput>
        <button @click="getWeather">+</button>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.settings {
  border: 1px solid $light-gray;
  border-radius: $size-14;
  padding: 12px 18px;

  &-locations {
    display: flex;
    flex-direction: column;
    gap: 12px;

    &__loader {
      position: relative;
      margin-top: 8px;
    }

    ul {
      display: flex;
      flex-direction: column;
      gap: 6px;
    }
  }

  &-search {
    margin-top: 24px;

    &__input {
      display: flex;
      justify-content: space-between;
      gap: 12px;
      margin-top: 6px;

      & button {
        border: 1px solid $light-gray;
        padding: 8px;
        height: 38px;
        border-radius: 8px;
        display: flex;
        align-items: center;
      }
    }
  }
}
</style>
