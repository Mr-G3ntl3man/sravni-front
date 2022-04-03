import {DataT} from "./dataTypes"

export const sravniApi = {
   getData() {
      return fetch('https://sravni-api.herokuapp.com/')
         .then(res => res.json())
         .then((res: DataT[]) => res)
   }
}