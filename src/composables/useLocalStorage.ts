import axios from "axios";
import { ref } from "vue";


const useLocalStorage = {
  get: (index: string) => {
    localStorage.getItem(index)
    try {
      return JSON.parse(localStorage.getItem(index as string) as string)
    }
    catch {
      return false
    }
  },
  set: (index: string, value: string | object ) => {
    try {
      localStorage.setItem(index, JSON.stringify(value))
      return true;
    }
    catch(e) {
      console.warn(e)
      return false
    }
  }
} 

export default useLocalStorage;
