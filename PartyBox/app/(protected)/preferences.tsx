import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useTheme } from '../../contexts/ThemeContext';
import { useLanguage } from '../../contexts/LanguageContext';
import { Colors } from '../../constants/Colors';
import { translations } from '../../constants/translations';
import { router } from 'expo-router';

const PreferencesScreen: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  const { language, toggleLanguage } = useLanguage();
  const t = translations[language];

  const containerStyle = theme === 'light' ? styles.containerLight : styles.containerDark;
  const titleStyle = theme === 'light' ? styles.titleLight : styles.titleDark;
  const subtitleStyle = theme === 'light' ? styles.subtitleLight : styles.subtitleDark;
  const buttonStyle = theme === 'light' ? styles.buttonLight : styles.buttonDark;
  const buttonTextStyle = theme === 'light' ? styles.buttonTextLight : styles.buttonTextDark;

  return (
    <View style={[styles.container, containerStyle]}>
      <Text style={[styles.title, titleStyle]}>{t.preferencesTitle}</Text>

      {/* Cambiar Tema */}
      <Text style={[styles.subtitle, subtitleStyle]}>{t.themeLabel}</Text>
      <TouchableOpacity
        style={[styles.button, buttonStyle]}
        onPress={toggleTheme}
      >
        <Text style={[styles.buttonText, buttonTextStyle]}>
          {theme === 'light' ? t.changeToDark : t.changeToLight}
        </Text>
      </TouchableOpacity>

      {/* Cambiar Idioma */}
      <Text style={[styles.subtitle, subtitleStyle]}>{t.languageLabel}</Text>
      <TouchableOpacity
        style={[styles.button, buttonStyle]}
        onPress={toggleLanguage}
      >
        <Text style={[styles.buttonText, buttonTextStyle]}>
          {language === 'es' ? t.changeToEnglish : t.changeToSpanish}
        </Text>
      </TouchableOpacity>

      {/* Botón de Regresar */}
      <TouchableOpacity
        style={[styles.button, buttonStyle]}
        onPress={() => router.back()}
      >
        <Text style={[styles.buttonText, buttonTextStyle]}>{t.goBack}</Text>
      </TouchableOpacity>
    </View>
  );
};

// Estilos base
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 18,
    marginBottom: 10,
  },
  button: {
    width: '100%',
    padding: 16,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
    marginBottom: 10,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});

// Estilos para el tema claro
const lightStyles = {
  containerLight: {
    backgroundColor: Colors.background,
  },
  titleLight: {
    color: Colors.primary,
  },
  subtitleLight: {
    color: Colors.text,
  },
  buttonLight: {
    backgroundColor: Colors.secondary,
  },
  buttonTextLight: {
    color: Colors.text,
  },
};

// Estilos para el tema oscuro
const darkStyles = {
  containerDark: {
    backgroundColor: Colors.black,
  },
  titleDark: {
    color: Colors.white,
  },
  subtitleDark: {
    color: Colors.white,
  },
  buttonDark: {
    backgroundColor: Colors.accent,
  },
  buttonTextDark: {
    color: Colors.white,
  },
};

// Combinar estilos base con estilos dinámicos
Object.assign(styles, lightStyles, darkStyles);

export default PreferencesScreen;