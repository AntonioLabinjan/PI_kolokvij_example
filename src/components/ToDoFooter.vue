<template>
    <footer class="footer">
      <!-- dohvaća se slot iz app.vue i dinamički se dohvaća trenutna godina pomoću JS date objekta i getFullYear metode-->
      <slot /> – {{ new Date().getFullYear() }}
    </footer>
  </template>
  
  <script setup>
  // Možeš dodati bilo kakvu logiku ovdje ako je potrebno
  </script>
  
  <style scoped>
    /* najte me za css-a nikaj pitati, jer vam to ne razmem */
  .footer {
    margin-bottom: 1.25rem; /* Za mb-5 */
    font-size: 0.875rem; /* Za text-sm */
    color: #6b7280; /* Za text-gray-500 */
  }
  </style>
  
