<template>
  <!-- zašto smo implementirali id-jeve? Jer su indeksi nepouzdani kao klima u Puli-->
  <!--roditelj je app.vue (bitno za znat)...ova komponenta se renderira u app.vue-->
  <div class="todo-list">
     <!-- transition-group omogućava animacije prilikom dodavanja/uklanjanja stavki -->
    <transition-group name="fade" tag="div">
      <!-- Prikaz svake stavke pomoću komponente ToDoStavka -->
       <!-- Prosljeđujemo sve atribute stavke kao propse pomoću v-bind -->
        <!-- Ažuriramo vrijednost završeno pomoću stavka.zavrseno = $event -->
          <!-- Ažuriramo opis kada korisnik uređuje pomoću stavka.opis = $event -->

          <ToDoStavka
  v-for="stavka in sortiraneStavke"
  :key="stavka.id"
  v-bind="stavka"   
  @ažurirajZavršeno="stavka.završeno = $event"
  @ažurirajOpis="stavka.opis = $event"
>

      <!-- Slot s dodatnim gumbima: povećanje/smanjenje prioriteta (inkrement ili dekrement) i uklanjanje stavke -->
      <!-- slot dohvaća sadržaj iz template default djelova...basically govorimo: tu ćeš spremit nešto ča dobivaš od parenta-->
 
        <template #default>
          <button @click="stavka.prioritet++" class="button"> + </button>
          <button @click="stavka.prioritet--" class="button"> - </button>
          <button @click="ukloni(stavka.id)" class="button"> x </button>
        </template>
      </ToDoStavka> <!-- zatvaranje komponente -->
    </transition-group>
    <!-- Botun za dodavanje nove stavke -->
    <button @click="dodajStavku" class="add-button">
      Dodaj stavku
    </button>
  </div>
</template>

<script setup>
// Importamo potrebne Vue funkcije i komponente
import { ref, computed, watch, onMounted } from 'vue'
import ToDoStavka from './ToDoStavka.vue'
import useBrojacStavki from '../composables/useBrojacStavki.js'

// Definiramo događaj koji emitiramo roditeljskoj komponenti (todo stavka)
const emit = defineEmits(['update-brojac'])

// Lista todo stavki, koristi se kao reaktivni podatak => dinamički se mijenja kroz našu interakciju s stavkama
const stavke = ref([
{ id:1, opis: 'Implementirati uklanjanje', završeno: false, prioritet: 1 },
{ id:2, opis: 'Dodati text edit', završeno: true, prioritet: 2 },
{ id:3, opis: 'Implementirati pomicanje', završeno: false, prioritet: 4 },
{ id:4, opis: 'Dodati date', završeno: false, prioritet: 5 },
{ id: 5,opis: 'Implementirati promjenu boje', završeno: false, prioritet: 6 },
{ id: 6, opis: 'Zgorit ću, jebiga', završeno: true, prioritet: 1}
])

// Vraća novu sortiranu listu stavki prema prioritetu (najveći ide prvi) => computed je jer se dinamički izračunava
// ni dan danas ne kužin ovu foru s ((a, b)=> b.smthng - a.smthng), ali to je template koji pratin :)
const sortiraneStavke = computed(() =>
[...stavke.value].sort((a, b) => b.prioritet - a.prioritet)
)

// Funkcija za dodavanje nove stavke s defaultnim vrijednostima (promijene se kad mi unesemo svoje podatke)
const dodajStavku = () => {
  const najvećiId = Math.max(0, ...stavke.value.map(s => s.id)) // arrow funkcija koja traži najveću vrijednost id-ja u cijelom arrayu
  stavke.value.push({
    id: najvećiId + 1, // postavlja novi id na id+1
    opis: 'Napiši opis...',
    završeno: false,
    prioritet: 0
  })
}



// Funkcija za uklanjanje stavke s određenim id-jem => prima id odabrane stavke, pronalazi indeks s tim id-jem u arrayu i briše ga pomoću splice
const ukloni = (id) => {
  const index = stavke.value.findIndex(s => s.id === id)
  if (index !== -1) stavke.value.splice(index, 1)
}

// Koristimo composable funkciju za upravljanje brojačem stavki
const { brojac, postavi } = useBrojacStavki()

// Gledamo promjene u listi stavki i ažuriramo brojač te šaljemo podatke roditelju => to se radi odmah pri promjeni
watch(stavke, () => {
postavi(stavke.value.length)
emit('update-brojac', brojac.value)
// deep omogućava da se reagira pri promjeni bilo kojeg dijela stavke, a ne samo ako se promijeni cijela
// imediate omogućava da se odmah reagira ne promjenu i pošalje se parentu
}, { deep: true, immediate: true })

// Isto radimo i kad se komponenta učita
onMounted(() => {
postavi(stavke.value.length)
emit('update-brojac', brojac.value)
})
</script>

<style scoped>
/* najte me za css-a nikaj pitati, jer vam to ne razmem */
.todo-list {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.button {
  background-color: #f5f5f5;
  border: 1px solid #ccc;
  padding: 0.25rem 0.5rem;
  cursor: pointer;
  margin-right: 0.5rem;
  border-radius: 4px;
}

.button:hover {
  background-color: #e0e0e0;
}

.add-button {
  background-color: #3b82f6;
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  border: none;
  cursor: pointer;
}

.add-button:hover {
  background-color: #2563eb;
}

.fade-enter-active, .fade-leave-active {
  transition: all 0.3s ease;
}

.fade-enter-from, .fade-leave-to {
  opacity: 0;
  transform: scale(0.95);
}
</style>
