import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const usePreferences = () => {
  const [theme, setTheme] = useState('light');
  const [language, setLanguage] = useState('es');

  useEffect(() => {
    const loadPreferences = async () => {
      const savedTheme = await AsyncStorage.getItem('theme');
      const savedLanguage = await AsyncStorage.getItem('language');
      if (savedTheme) setTheme(savedTheme);
      if (savedLanguage) setLanguage(savedLanguage);
    };
    loadPreferences();
  }, []);

  const savePreferences = async () => {
    await AsyncStorage.setItem('theme', theme);
    await AsyncStorage.setItem('language', language);
  };

  return { theme, language, setTheme, setLanguage, savePreferences };
};

export default usePreferences;