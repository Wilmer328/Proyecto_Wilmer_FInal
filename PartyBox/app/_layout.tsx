import { AuthProvider } from '@/contexts/AuthContext';
import { ThemeProvider } from '@/contexts/ThemeContext';
import { LanguageProvider } from '@/contexts/LanguageContext';
import { Slot } from 'expo-router';
import React from 'react';

export default function Layout() {
  return (
    <AuthProvider>
      <ThemeProvider>
        <LanguageProvider>
          <Slot />
        </LanguageProvider>
      </ThemeProvider>
    </AuthProvider>
  );
}