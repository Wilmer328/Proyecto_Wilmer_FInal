import { useState } from 'react';
import { View, TextInput, Button, Alert } from 'react-native';
import { FiestaService } from '@/config/apiEjecutador';
import ThemedText from '@/components/ThemedText';
import ThemedView from '@/components/ThemedView';

export default function CrearFiestaForm() {
  const [formData, setFormData] = useState({
    nombre: '',
    invitados: '',
    comida: 'Standard',
    decoracion: 'Standard',
    fecha: ''
  });

  const handleCrearFiesta = async () => {
    try {
      await FiestaService.crearFiesta({
        ...formData,
        invitados: Number(formData.invitados),
        fecha: new Date(formData.fecha).toISOString()
      });
      
      Alert.alert('Éxito', 'Fiesta creada correctamente');
      // Limpiar formulario
      setFormData({
        nombre: '',
        invitados: '',
        comida: 'Standard',
        decoracion: 'Standard',
        fecha: ''
      });
    } catch (error) {
      Alert.alert('Error', error.message);
    }
  };

  return (
    <ThemedView>
      <ThemedText>Nombre de la Fiesta</ThemedText>
      <TextInput
        value={formData.nombre}
        onChangeText={text => setFormData({...formData, nombre: text})}
        placeholder="Ej: Cumpleaños de Juan"
      />

      <ThemedText>Número de Invitados</ThemedText>
      <TextInput
        keyboardType="numeric"
        value={formData.invitados}
        onChangeText={text => setFormData({...formData, invitados: text})}
        placeholder="Ej: 50"
      />

      <Button 
        title="Crear Fiesta" 
        onPress={handleCrearFiesta} 
      />
    </ThemedView>
  );
}