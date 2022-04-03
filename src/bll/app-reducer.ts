const initialState: InitialStateT = {
   error: false,
   loading: false,
   errorMessage: ''
}

export const appReducer = (state: InitialStateT = initialState, action: AppActionsT): InitialStateT => {
   switch (action.type) {
      case 'app/SET-LOADING':
      case "app/SET-ERROR":
         return {...state, ...action.payload}

      default:
         return state
   }
}

export const setLoading = (loading: boolean) => ({type: 'app/SET-LOADING', payload: {loading}} as const)
export const setError = (error: boolean, errorMessage: string) => ({
   type: 'app/SET-ERROR',
   payload: {error, errorMessage}
} as const)

export type InitialStateT = {
   error: boolean
   loading: boolean
   errorMessage: string
}

export type AppActionsT = ReturnType<typeof setLoading> | ReturnType<typeof setError>
