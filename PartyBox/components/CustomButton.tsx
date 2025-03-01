// components/CustomButton.tsx
import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { Colors } from '../constants/Colors';

interface CustomButtonProps {
  title: string; // Texto del botón
  onPress: () => void; // Función que se ejecuta al presionar el botón
  style?: object; // Estilos personalizados para el contenedor del botón
  textStyle?: object; // Estilos personalizados para el texto del botón
}

const CustomButton: React.FC<CustomButtonProps> = ({ title, onPress, style, textStyle }) => {
  return (
    <TouchableOpacity style={[styles.button, style]} onPress={onPress}>
      <Text style={[styles.buttonText, textStyle]}>{title}</Text>
    </TouchableOpacity>
  );
};

// Estilos base del botón
const styles = StyleSheet.create({
  button: {
    width: '100%',
    padding: 16,
    borderRadius: 25, // Bordes redondeados
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000', // Sombra
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5, // Sombra en Android
    marginBottom: 10,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default CustomButton;