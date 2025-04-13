<template>
  <div class="app-container">
    <ToDoHeader>
      <!-- ovo se sprema u slot od todo headera-->
      <template #default>
        <div class="header bg-blue">
          <!--brojac je reaktivna varijabla koja se dinamički mijenja-->
          Moja To-Do Aplikacija ({{ brojac }})
        </div>
        <div class="header bg-red">Test</div>
      </template>
    </ToDoHeader>
    <!-- u todobody komponenti se brojač ažurira i prosljeđuje se tu u varijablu brojac (svaki put kad dodaš novi todo, inkrementira se) -->
    <ToDoBody @update-brojac="brojac = $event" />

    <!-- slot dohvaća sadržaj iz template default djelova...basically govorimo: tu ćeš spremit nešto ča dobivaš od parenta-->
     <!-- pomoću template #defualt se definira ča ćemo prosljedit childu i ča će dohvatiti pomoću slota-->
 
    <ToDoFooter>
      <template #default>
        Antonio Labinjan
      </template>
    </ToDoFooter>
  </div>
</template>

<script setup>
// import komponenata
import ToDoHeader from './components/ToDoHeader.vue'
import ToDoFooter from './components/ToDoFooter.vue'
import ToDoBody from './components/ToDoBody.vue'
import { onMounted, ref } from 'vue'

// koristimo ref za označit reaktivnu varijablu koja će se automatski mijenjat kad se nešto desi u kodu
// konkretno, kad se iz todobody emitira update brojača
const brojac = ref(0)

// obični onMounted, niš spektakularno
onMounted(() => {
  // Kod koji se izvršava kad se komponenta montira
  alert('Komponenta je montirana!')
})
</script>

<style scoped>
/* najte me za css-a nikaj pitati, jer vam to ne razmem */
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
