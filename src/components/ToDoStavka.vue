<template>
  <!-- html kontejner za taskove-->
    <div class="task-container">
      <!-- ovaj span dohvaća prioritet iz propsa -->
      <span class="font-bold">{{ prioritet }}</span>
      <!-- ovaj botun emitira metodu ažurirajZavršeno i invertira indikator završenosti-->
      <div @click="emit('ažurirajZavršeno', !završeno)" class="checkbox">
        <!-- v-if direktiva provjerava dali je task završen i farba checkbox sukladno tome-->
        <div v-if="završeno" class="checkbox-inner"></div>
      </div>
      <!-- v-if direktiva zapakirana u span koja se pojavljuje ako uređivanje nije dopušteno-->
      <span v-if="!dopuštenoUređivanje" @dblclick="uključiUređivanje" :class="{ 'line-through': završeno }">
        {{ opis }}
      </span>
      <!-- v-if direktiva zapakirana u input. Ako je uređivanje dopušteno, otvara se input form koji lovi referencu na unos i mijenja opis todo-a-->
      <input v-if="dopuštenoUređivanje" ref="unosRef" v-model="noviOpis" @focusout="isključiUređivanje" class="input-field" />
  <!-- slot dohvaća sadržaj iz template default djelova...basically govorimo: tu ćeš spremit nešto ča dobivaš od parenta-->
      <slot />
    </div>
  </template>
  
  <script setup>
  // importovi
  import { ref, computed } from 'vue'
  
  // koje propse komponenta šalje?
  // svaki todo ima opis, indikator završenosti i prioritet
  // određujemo tipove podataka za svaki

  // propse roditelj šalje djeci (dobivamo to od van u komponentu)
  const props = defineProps({
    opis: String,
    završeno: Boolean,
    prioritet: Number
  })
  
  // emitove djete šalje roditelju (iz komponente se šalje van)
  const emit = defineEmits(['ažurirajOpis', 'ažurirajZavršeno'])
  
  // Reaktivna varijabla koja određuje je li trenutno uključeno uređivanje
const uređivanje = ref(false)

// Reaktivna varijabla u koju spremamo novi opis dok korisnik uređuje
const noviOpis = ref('')

// Ref na input element — koristimo za automatsko fokusiranje kad se krene uređivati
const unosRef = ref(null)

// Komputed koji govori: dozvoli uređivanje samo ako je uređivanje uključeno i zadatak nije završen
const dopuštenoUređivanje = computed(() => uređivanje.value && !props.završeno)

// Funkcija koja pokreće uređivanje
const uključiUređivanje = () => {
  // Ako je zadatak već završen, ne dozvoljavamo uređivanje
  if (props.završeno) return

  // Postavljamo da je uređivanje aktivno
  uređivanje.value = true

  // Kopiramo trenutni opis u varijablu koju ćemo uređivati
  noviOpis.value = props.opis

  // Čekamo jedan "tick" da se input pojavi pa ga automatski fokusiramo
  setTimeout(() => unosRef.value?.focus(), 0)
}

// Funkcija koja završava uređivanje
const isključiUređivanje = () => {
  // Isključujemo uređivanje
  uređivanje.value = false

  // Emitiramo event prema roditelju s novim opisom
  emit('ažurirajOpis', noviOpis.value)
}

  </script>
  
  <style scoped>
  /* najte me za css-a nikaj pitati, jer vam to ne razmem */
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
  
