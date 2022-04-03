import {DataT} from "../dal/dataTypes";
import {Dispatch} from "redux";
import {sravniApi} from "../dal/sravni-api";
import {setError, setLoading} from "./app-reducer";
import {v1} from "uuid";

const initialState: InitialStateT = {
   data: [],
   currentData: [],
   filterOptions: {
      limit: 0,
      program: [],
      currentPrice: 0,
      currentProgram: 'Любая',
      currentSort: 'По платежу'
   }
}

export const banksReducer = (state: InitialStateT = initialState, action: BankActionsT): InitialStateT => {
   switch (action.type) {
      case "banks/SET-PRICE":
      case "banks/SET-PROGRAM":
      case "banks/SET-CURRENT-SORT":
         return {
            ...state,
            filterOptions: {
               ...state.filterOptions,
               ...action.payload
            }
         }

      case 'banks/SET-DATA':
         const data = action.payload.map(el => ({...el, id: v1()}))
         return {...state, data: data, currentData: data}

      case "banks/SET-OPTIONS":
         const maxPrice = state.currentData
            .sort((a, b) => b.rate.creditAmount.from - a.rate.creditAmount.from)[0].rate.creditAmount.from

         return {
            ...state,
            filterOptions: {
               ...state.filterOptions,
               currentPrice: maxPrice,
               program: ['Любая', ...Array.from(new Set(state.currentData.map(el => el.name)))],
            }
         }

      case "banks/SORT_DATA":
         return {
            ...state,
            currentData: [...state.currentData].sort((a, b) => {
               if (state.filterOptions.currentSort === 'По ставке') return a.rate.periods[0].rate.from - b.rate.periods[0].rate.from
               return a.rate.creditAmount.from - b.rate.creditAmount.from
            })
         }

      case "banks/FILTER-DATA":
         return {
            ...state,
            currentData: state.data.filter(el => {
               const currentProgram = state.filterOptions.currentProgram === 'Любая' ? el.name : state.filterOptions.currentProgram
               return el.name === currentProgram && el.rate.creditAmount.from <= state.filterOptions.currentPrice
            })
         }

      default:
         return state
   }
}


export const sortData = () => ({type: 'banks/SORT_DATA'} as const)
export const setOptions = () => ({type: 'banks/SET-OPTIONS'} as const)
export const filterData = () => ({type: 'banks/FILTER-DATA'} as const)
export const setData = (data: DataT[]) => ({type: 'banks/SET-DATA', payload: data} as const)
export const setPrice = (currentPrice: number) => ({type: 'banks/SET-PRICE', payload: {currentPrice}} as const)
export const setCurrentProgram = (currentProgram: string) => ({
   type: 'banks/SET-PROGRAM',
   payload: {currentProgram}
} as const)
export const setCurrentSort = (currentSort: CurrentSortT) => ({
   type: 'banks/SET-CURRENT-SORT',
   payload: {currentSort}
} as const)


export const setOptionsAndFilterData = (action: BankActionsT) => (dispatch: Dispatch) => {
   dispatch(action)
   dispatch(filterData())
}

export const fetchData = (limit?: number) => async (dispatch: Dispatch) => {
   try {
      dispatch(setLoading(true))

      const res = await sravniApi.getData()

      limit ? dispatch(setData(res.slice(0, limit))) : dispatch(setData(res))

      dispatch(setOptions())
      dispatch(sortData())
      dispatch(setLoading(false))
   } catch (e) {
      dispatch(setError(true, e instanceof Error ? e.message : 'Something went wrong...'))
   }
}


export type InitialStateT = {
   data: DomainDataT[]
   currentData: DomainDataT[]
   filterOptions: FilterOptionsT
}

type FilterOptionsT = {
   limit: number
   program: string[]
   currentPrice: number
   currentProgram: string
   currentSort: CurrentSortT
}

export type DomainDataT = DataT & { id: string }
export type CurrentSortT = 'По ставке' | 'По платежу'

export type BankActionsT = ReturnType<typeof setData>
   | ReturnType<typeof setOptions>
   | ReturnType<typeof filterData>
   | ReturnType<typeof sortData>
   | ReturnType<typeof setPrice>
   | ReturnType<typeof setCurrentProgram>
   | ReturnType<typeof setCurrentSort>
