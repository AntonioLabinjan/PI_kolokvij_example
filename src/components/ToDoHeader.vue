<template>
    <header class="header">
      <!-- dohvaća se slot iz app.vue i dinamički se dohvaća naslov i brojač-->

      <slot />
    </header>
  </template>
  
  <script setup>
  // Možemo dodati bilo kakvu logiku ovdje ako je potrebno
  </script>
  
  <style scoped>

  /* najte me za css-a nikaj pitati, jer vam to ne razmem */
  .header {
    font-size: 1.5rem; /* Za text-2xl */
    font-weight: bold; /* Za font-bold */
    text-align: center; /* Za text-center */
  }
  </style>
  
