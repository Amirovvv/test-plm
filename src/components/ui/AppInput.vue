<script setup lang="ts">
import { ref, watchEffect } from 'vue'
import { useWeatherStore } from '@/stores/weather.store'

const props = defineProps({
  inputIcon: {
    type: Boolean,
    default: false,
  },
  inputPlaceholder: {
    type: String,
    default: '',
  },
  inputType: {
    type: String,
    default: 'text',
  },
  errorText: {
    type: String,
  },
  modelValue: [String, Number],
})

const store = useWeatherStore()
const emits = defineEmits(['update:modelValue'])

const errorText = ref('')

const updateInput = (event: Event) => {
  emits('update:modelValue', (event.target as HTMLInputElement).value)
  clearError()
}

const clearError = () => {
  errorText.value = ''
  store.errorText = ''
}

watchEffect(() => {
  if (props.errorText) {
    errorText.value = props.errorText
  }
})
</script>

<template>
  <div class="app-input">
    <div class="input-base">
      <div v-if="inputIcon" class="input-base__icon">
        <slot name="icon"></slot>
      </div>
      <input
        :type="inputType"
        :placeholder="inputPlaceholder"
        :value="modelValue"
        @input="updateInput"
      />
    </div>
    <p v-if="errorText" class="app-input__error">{{ errorText }}</p>
  </div>
</template>

<style scoped lang="scss">
.app-input {
  width: 100%;
  &__error {
    color: red;
    font-size: 12px;
    margin-top: 4px;
  }
}
.input-base {
  display: flex;
  gap: 10px;
  align-items: center;
  padding: 8px;
  border-radius: 10px;
  border: 1px solid #e0e3ee;

  & input {
    border: none;
    font-size: 15px;
    width: 100%;
  }

  &__icon {
    display: flex;
  }
}
</style>
