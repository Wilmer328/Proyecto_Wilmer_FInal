import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { router } from 'expo-router';
import { useAuth } from '../../contexts/AuthContext';
import { Colors } from '../../constants/Colors';
import { useLanguage } from '../../contexts/LanguageContext';
import { translations } from '../../constants/translations';
import { useTheme } from '../../contexts/ThemeContext';
import CustomButton from '../../components/CustomButton'; // Importa el componente reutilizable

const HomeScreen: React.FC = () => {
  const { logout } = useAuth();
  const { language } = useLanguage();
  const { theme } = useTheme();
  const t = translations[language];

  // Estilos dinámicos según el tema
  const containerStyle = theme === 'light' ? styles.containerLight : styles.containerDark;
  const titleStyle = theme === 'light' ? styles.titleLight : styles.titleDark;
  const buttonStyle = theme === 'light' ? styles.buttonLight : styles.buttonDark;
  const buttonTextStyle = theme === 'light' ? styles.buttonTextLight : styles.buttonTextDark;
  const logoutButtonStyle = theme === 'light' ? styles.logoutButtonLight : styles.logoutButtonDark;

  const handleLogout = () => {
    logout();
    router.replace('/login');
  };

  return (
    <View style={[styles.container, containerStyle]}>
      {/* Título de la pantalla */}
      <Text style={[styles.title, titleStyle]}>{t.organizeParty}</Text>

      {/* Botón de Preferencias */}
      <CustomButton
        title={t.preferencesTitle}
        onPress={() => router.push('/(protected)/preferences')}
        style={[styles.button, buttonStyle]}
        textStyle={[styles.buttonText, buttonTextStyle]}
      />

      {/* Botón de Cerrar Sesión */}
      <CustomButton
        title={t.logout}
        onPress={handleLogout}
        style={[styles.logoutButton, logoutButtonStyle]}
        textStyle={styles.logoutButtonText}
      />
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
  logoutButton: {
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
  },
  logoutButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.white,
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
  buttonLight: {
    backgroundColor: Colors.secondary,
  },
  buttonTextLight: {
    color: Colors.text,
  },
  logoutButtonLight: {
    backgroundColor: Colors.accent,
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
  buttonDark: {
    backgroundColor: Colors.accent,
  },
  buttonTextDark: {
    color: Colors.white,
  },
  logoutButtonDark: {
    backgroundColor: Colors.primary,
  },
};

// Combinar estilos base con estilos dinámicos
Object.assign(styles, lightStyles, darkStyles);

export default HomeScreen;