import { AuthProvider } from '@/contexts/AuthContext';
import { ThemeProvider } from '@/contexts/ThemeContext';
import { LanguageProvider } from '@/contexts/LanguageContext';
import { Slot } from 'expo-router';
import React, { useEffect } from 'react';
import { Provider, useDispatch } from 'react-redux';
import { store } from '@/store/store';
import { initializeParties } from '@/store/slices/userSlice';

// Componente para inicializar las fiestas
const InitializeApp = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initializeParties()); // Carga las fiestas al iniciar la app
  }, [dispatch]);

  return <Slot />;
};

export default function Layout() {
  return (
    <Provider store={store}>
      <AuthProvider>
        <ThemeProvider>
          <LanguageProvider>
            <InitializeApp />
          </LanguageProvider>
        </ThemeProvider>
      </AuthProvider>
    </Provider>
  );
}