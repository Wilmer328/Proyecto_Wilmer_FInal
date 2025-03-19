import AsyncStorage from '@react-native-async-storage/async-storage';

// Guardar fiestas en AsyncStorage
export const saveParties = async (parties: any[]) => {
  try {
    await AsyncStorage.setItem('parties', JSON.stringify(parties));
  } catch (error) {
    console.error('Error saving parties:', error);
  }
};

// Cargar fiestas desde AsyncStorage
export const loadParties = async () => {
  try {
    const parties = await AsyncStorage.getItem('parties');
    return parties ? JSON.parse(parties) : [];
  } catch (error) {
    console.error('Error loading parties:', error);
    return [];
  }
};