import { ref } from 'vue'

// definiraš si funkciju i definiraš da će se ona izvozit iz ovog fajla
export default function useBrojacStavki() {
  // inicijaliziramo brojač na 0
  const brojac = ref(0)
  // postavljamo ga na vrijednost koju primi funkcija
  const postavi = (vrijednost) => {
    brojac.value = vrijednost
  }
  // funkcija vraća brojač i metodu postavi
  return { brojac, postavi }
}
