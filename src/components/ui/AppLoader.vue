<script lang="ts" setup>
defineProps({
  isLoading: {
    type: Boolean,
    required: true,
  },
})
</script>

<template>
  <div class="loader-container" v-if="isLoading">
    <div class="loader"></div>
  </div>
  <slot v-else></slot>
</template>

<style scoped>
.loader-container {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  justify-content: center;
  align-items: center;
}

.loader {
  border: 6px solid #f3f3f3;
  border-top: 6px solid #000000;
  border-radius: 50%;
  width: 24px;
  height: 24px;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
