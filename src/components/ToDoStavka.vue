<template>
    <div class="task-container">
      <span class="font-bold">{{ prioritet }}</span>
  
      <div @click="emit('ažurirajZavršeno', !završeno)" class="checkbox">
        <div v-if="završeno" class="checkbox-inner"></div>
      </div>
  
      <span v-if="!dopuštenoUređivanje" @dblclick="uključiUređivanje" :class="{ 'line-through': završeno }">
        {{ opis }}
      </span>
  
      <input v-if="dopuštenoUređivanje" ref="unosRef" v-model="noviOpis" @focusout="isključiUređivanje" class="input-field" />
  
      <slot />
    </div>
  </template>
  
  <script setup>
  import { ref, computed } from 'vue'
  
  const props = defineProps({
    opis: String,
    završeno: Boolean,
    prioritet: Number
  })
  
  const emit = defineEmits(['ažurirajOpis', 'ažurirajZavršeno'])
  
  const uređivanje = ref(false)
  const noviOpis = ref('')
  const unosRef = ref(null)
  
  const dopuštenoUređivanje = computed(() => uređivanje.value && !props.završeno)
  
  const uključiUređivanje = () => {
    if (props.završeno) return
    uređivanje.value = true
    noviOpis.value = props.opis
    setTimeout(() => unosRef.value?.focus(), 0)
  }
  
  const isključiUređivanje = () => {
    uređivanje.value = false
    emit('ažurirajOpis', noviOpis.value)
  }
  </script>
  
  <style scoped>
  .task-container {
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }
  
  .checkbox {
    width: 1.25rem;
    height: 1.25rem;
    border: 1px solid #ccc;
    border-radius: 0.25rem;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
  }
  
  .checkbox-inner {
    width: 0.75rem;
    height: 0.75rem;
    background-color: #48bb78; /* Green color */
  }
  
  .input-field {
    border: 1px solid #ccc;
    padding: 0.25rem;
    width: 16rem; /* Equivalent to w-64 in Tailwind */
  }
  
  .line-through {
    text-decoration: line-through;
  }
  </style>
  