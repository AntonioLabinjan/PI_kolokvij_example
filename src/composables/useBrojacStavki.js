import { ref } from 'vue'

export default function useBrojacStavki() {
  const brojac = ref(0)
  const postavi = (vrijednost) => {
    brojac.value = vrijednost
  }
  return { brojac, postavi }
}
