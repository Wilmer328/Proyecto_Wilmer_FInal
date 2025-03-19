import { configureStore } from '@reduxjs/toolkit';
import userReducer from './slices/userSlice'; // Importa el slice de usuario/fiestas

// Configuración del store
export const store = configureStore({
  reducer: {
    user: userReducer, // Agrega el reducer de usuario/fiestas al store
  },
});

// Exporta los tipos necesarios para TypeScript
export type RootState = ReturnType<typeof store.getState>; // Tipo del estado global
export type AppDispatch = typeof store.dispatch; // Tipo para dispatch