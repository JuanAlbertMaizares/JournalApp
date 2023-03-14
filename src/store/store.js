// modulo que configura el store de redux
import { configureStore } from '@reduxjs/toolkit'
// slide de journal y auth
import { journalSlice } from './journal'
import { authSlice } from './auth'

// configuramos el store de redux
export const store = configureStore({
  // Añadimos los reducers
  reducer: {
    auth: authSlice.reducer,
    journal: journalSlice.reducer,
  },
})