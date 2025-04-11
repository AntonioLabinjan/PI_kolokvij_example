<template>
  <div class="app-container">
    <ToDoHeader>
      <template #default>
        <div class="header bg-blue">
          Moja To-Do Aplikacija ({{ brojac }})
        </div>
        <div class="header bg-red">Test</div>
      </template>
    </ToDoHeader>

    <ToDoBody @update-brojac="brojac = $event" />

    <ToDoFooter>
      <template #default>
        Antonio Labinjan
      </template>
    </ToDoFooter>
  </div>
</template>

<script setup>
import ToDoHeader from './components/ToDoHeader.vue'
import ToDoFooter from './components/ToDoFooter.vue'
import ToDoBody from './components/ToDoBody.vue'
import { onMounted, ref } from 'vue'

const brojac = ref(0)

onMounted(() => {
  // Kod koji se izvršava kad se komponenta montira
  alert('Komponenta je montirana!')
})
</script>

<style scoped>
.app-container {
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.header {
  padding: 1rem;
  color: white;
}

.bg-blue {
  background-color: #3b82f6; /* Blue color */
}

.bg-red {
  background-color: #ef4444; /* Red color */
}

</style>
