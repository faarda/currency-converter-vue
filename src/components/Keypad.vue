<template>
  <div class="converter__main__keypad">
    <button class="converter__main__keypad__btn" v-for="n in 9" :key="n" @click="handleKeypadClick(n)">{{n}}</button>
    <button class="converter__main__keypad__btn action" @click="handleKeypadClick('clear')">
      <svg width="15%" viewBox="0 0 14 14" fill="none">
        <path d="M13 1L1 13" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M1 1L13 13" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
    </button>
    <button class="converter__main__keypad__btn" @click="handleKeypadClick(0)">0</button>
    <button class="converter__main__keypad__btn action" @click="handleKeypadClick('swap')">
      <svg width="20%" viewBox="0 0 19 16" fill="none">
        <path d="M5 15V1" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M1.5 6L5 1L8.5 6" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M14.5 1L14.5 15" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M18 10L14.5 15L11 10" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
    </button>
  </div>
</template>

<script>
import { eventBus } from '../main'

export default {
  name: "Keypad",
  methods: {
    handleKeypadClick(key){
      eventBus.$emit('keypad-clicked', key)
    }
  }
}
</script>

<style>

</style>