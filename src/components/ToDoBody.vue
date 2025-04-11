<template>
    <div class="todo-list">
      <transition-group name="fade" tag="div">
        <ToDoStavka
          v-for="(stavka, index) in sortiraneStavke"
          :key="index"
          v-bind="stavka"
          @ažurirajZavršeno="stavka.završeno = $event"
          @ažurirajOpis="stavka.opis = $event"
        >
          <template #default>
            <button @click="stavka.prioritet++" class="button"> + </button>
            <button @click="stavka.prioritet--" class="button"> - </button>
            <button @click="ukloni(index)" class="button"> x </button>
          </template>
        </ToDoStavka>
      </transition-group>
  
      <button @click="dodajStavku" class="add-button">
        Dodaj stavku
      </button>
    </div>
  </template>
  
  <script setup>
import { ref, computed, watch, onMounted } from 'vue'
import ToDoStavka from './ToDoStavka.vue'
import useBrojacStavki from '../composables/useBrojacStavki.js'

// Prvo definiraj emit
const emit = defineEmits(['update-brojac'])

const stavke = ref([
  { opis: 'Implementirati uklanjanje', završeno: false, prioritet: 1 },
  { opis: 'Dodati text edit', završeno: true, prioritet: 2 },
  { opis: 'Implementirati pomicanje', završeno: false, prioritet: 4 },
  { opis: 'Dodati date', završeno: false, prioritet: 5 },
  { opis: 'Implementirati promjenu boje', završeno: false, prioritet: 6 }
])

const sortiraneStavke = computed(() =>
  [...stavke.value].sort((a, b) => b.prioritet - a.prioritet)
)

const dodajStavku = () => {
  stavke.value.push({
    opis: 'Napiši opis...',
    završeno: false,
    prioritet: 0
  })
}

const ukloni = (i) => stavke.value.splice(i, 1)

const { brojac, postavi } = useBrojacStavki()

// Sada možeš koristiti emit bez greške
watch(stavke, () => {
  postavi(stavke.value.length)
  emit('update-brojac', brojac.value)
}, { deep: true, immediate: true })

onMounted(() => {
  postavi(stavke.value.length)
  emit('update-brojac', brojac.value)
})
</script>
  
<style scoped>
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
  