// app/(public)/login.tsx
import React, { useState } from 'react';
import { View, Text, TextInput, Alert, Image, StyleSheet } from 'react-native';
import { useAuth } from '../../contexts/AuthContext';
import { router } from 'expo-router';
import { Colors } from '../../constants/Colors';
import { useLanguage } from '../../contexts/LanguageContext';
import { translations } from '../../constants/translations';
import { useTheme } from '../../contexts/ThemeContext';
import CustomButton from '../../components/CustomButton'; 

const LoginScreen: React.FC = () => {
  const [email, setEmail] = useState('');
  const { login } = useAuth();
  const { language } = useLanguage();
  const { theme } = useTheme();
  const t = translations[language];

  const containerStyle = theme === 'light' ? styles.containerLight : styles.containerDark;
  const titleStyle = theme === 'light' ? styles.titleLight : styles.titleDark;
  const inputStyle = theme === 'light' ? styles.inputLight : styles.inputDark;
  const buttonStyle = theme === 'light' ? styles.buttonLight : styles.buttonDark;
  const buttonTextStyle = theme === 'light' ? styles.buttonTextLight : styles.buttonTextDark;

  const handleLogin = () => {
    if (!email.endsWith('@gmail.com')) {
      Alert.alert('Error', 'Por favor, ingresa un correo de Gmail válido.');
      return;
    }
    login(email);
    router.replace('/(protected)/home');
  };

  return (
    <View style={[styles.container, containerStyle]}>
      <Image source={require('../../assets/images/logo.png')} style={styles.logo} />
      <Text style={[styles.title, titleStyle]}>{t.welcome}</Text>
      <TextInput
        style={[styles.input, inputStyle]}
        placeholder={t.emailPlaceholder}
        placeholderTextColor={theme === 'light' ? Colors.text : Colors.white}
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />
      {/* Usa CustomButton en lugar de TouchableOpacity */}
      <CustomButton
        title={t.loginButton}
        onPress={handleLogin}
        style={[styles.button, buttonStyle]}
        textStyle={[styles.buttonText, buttonTextStyle]}
      />
    </View>
  );
};

// Estilos (igual que antes)
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  logo: {
    width: 150,
    height: 150,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    padding: 12,
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 16,
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
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});

// Estilos para el tema claro y oscuro (igual que antes)
const lightStyles = {
  containerLight: {
    backgroundColor: Colors.background,
  },
  titleLight: {
    color: Colors.primary,
  },
  inputLight: {
    borderColor: Colors.primary,
    color: Colors.text,
  },
  buttonLight: {
    backgroundColor: Colors.primary,
  },
  buttonTextLight: {
    color: Colors.white,
  },
};

const darkStyles = {
  containerDark: {
    backgroundColor: Colors.black,
  },
  titleDark: {
    color: Colors.white,
  },
  inputDark: {
    borderColor: Colors.accent,
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

export default LoginScreen;