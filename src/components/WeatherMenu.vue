<script setup lang="ts">
import { useRoute } from 'vue-router'
import { IconSettings, IconClose } from '@/components/icons'

const route = useRoute()
</script>

<template>
  <div class="weather-menu">
    <h3 class="weather-menu__title">{{ route.name }}</h3>
    <div class="weather-menu__icon">
      <router-link v-if="route.name === 'Settings'" :to="{ name: 'Weather' }"
        ><IconClose
      /></router-link>
      <router-link v-if="route.name === 'Weather'" :to="{ name: 'Settings' }"
        ><IconSettings
      /></router-link>
    </div>
  </div>
</template>

<style scoped lang="scss">
.weather-menu {
  display: flex;
  justify-content: space-between;
  border: 1px solid $light-gray;
  border-radius: $size-14;
  padding: 12px 18px;
  align-items: center;

  &__icon {
    a {
      display: flex;
    }
    display: flex;
    cursor: pointer;
  }
}
</style>
