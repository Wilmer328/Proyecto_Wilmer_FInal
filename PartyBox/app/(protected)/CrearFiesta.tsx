import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, Alert } from 'react-native';
import { useDispatch } from 'react-redux';
import { addParty } from '@/store/slices/userSlice';
import { router } from 'expo-router';
import { Colors } from '@/constants/Colors';
import CustomButton from '@/components/CustomButton';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import { useLanguage } from '@/contexts/LanguageContext';
import { useTheme } from '@/contexts/ThemeContext';
import { translations } from '@/constants/translations';
import { Picker } from '@react-native-picker/picker';
import { FiestaService } from '@/config/apiEjecutador';

const CrearFiesta = () => {
  const dispatch = useDispatch();
  const { language } = useLanguage();
  const { theme } = useTheme();
  const t = translations[language];

  const [type, setType] = useState('');
  const [guests, setGuests] = useState('');
  const [food, setFood] = useState('Standard');
  const [decoration, setDecoration] = useState('Standard');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');

  const opacity = useSharedValue(0);
  const translateY = useSharedValue(50);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      opacity: opacity.value,
      transform: [{ translateY: translateY.value }],
    };
  });

  React.useEffect(() => {
    opacity.value = withTiming(1, { duration: 500 });
    translateY.value = withSpring(0, { damping: 10, stiffness: 100 });
  }, []);

  const handleSave = () => {

    const newParty = {
      id: Math.random().toString(),
      type,
      guests: parseInt(guests, 10),
      food,
      decoration,
      date,
    };

    const nombre = newParty.type;
    const invitados = newParty.guests;
    const comida = newParty.food;
    const decoracion = newParty.decoration;
    const fecha = newParty.date;
    
    FiestaService(nombre, invitados, comida, decoracion, fecha);

    if (!type || !guests || !food || !decoration || !date || !time) {
      Alert.alert(t.error, t.completeAllFields);
      return;
    }

    router.back();
  };

  const containerStyle = theme === 'light' ? styles.containerLight : styles.containerDark;
  const titleStyle = theme === 'light' ? styles.titleLight : styles.titleDark;
  const inputStyle = theme === 'light' ? styles.inputLight : styles.inputDark;
  const labelStyle = theme === 'light' ? styles.labelLight : styles.labelDark;

  return (
    <Animated.View style={[styles.container, containerStyle, animatedStyle]}>
      <Text style={[styles.title, titleStyle]}>{t.createParty}</Text>

      <TextInput
        style={[styles.input, inputStyle]}
        placeholder={t.partyType}
        value={type}
        onChangeText={setType}
      />

      <TextInput
        style={[styles.input, inputStyle]}
        placeholder={t.numberOfGuests}
        value={guests}
        onChangeText={setGuests}
        keyboardType="numeric"
      />

      <Text style={[styles.label, labelStyle]}>{t.food}</Text>
      <View style={[styles.pickerContainer, inputStyle]}>
        <Picker
          selectedValue={food}
          onValueChange={(itemValue) => setFood(itemValue)}
        >
          <Picker.Item label="Standard" value="Standard" />
          <Picker.Item label="Premium" value="Premium" />
          <Picker.Item label="Gold" value="Gold" />
        </Picker>
      </View>

      <Text style={[styles.label, labelStyle]}>{t.decoration}</Text>
      <View style={[styles.pickerContainer, inputStyle]}>
        <Picker
          selectedValue={decoration}
          onValueChange={(itemValue) => setDecoration(itemValue)}
        >
          <Picker.Item label="Standard" value="Standard" />
          <Picker.Item label="Premium" value="Premium" />
          <Picker.Item label="Gold" value="Gold" />
        </Picker>
      </View>

      <TextInput
        style={[styles.input, inputStyle]}
        placeholder={t.date}
        value={date}
        onChangeText={(text) => {
          if (/^\d{0,2}\/?\d{0,2}\/?\d{0,4}$/.test(text)) {
            setDate(text);
          }
        }}
        keyboardType="numeric"
      />

      {/* <TextInput
        style={[styles.input, inputStyle]}
        placeholder={t.time}
        value={time}
        onChangeText={(text) => {
          if (/^\d{0,2}:?\d{0,2}$/.test(text)) {
            setTime(text);
          }
        }}
        keyboardType="numeric"
      /> */}

      <CustomButton
        title={t.saveParty}
        onPress={handleSave}
        style={[styles.button, theme === 'light' ? styles.buttonLight : styles.buttonDark]}
        textStyle={[styles.buttonText, theme === 'light' ? styles.buttonTextLight : styles.buttonTextDark]}
      />
      <CustomButton
        title={t.goBack}
        onPress={() => router.replace('/(protected)/home')}
        style={[styles.button, theme === 'light' ? styles.buttonLight : styles.buttonDark]}
        textStyle={[styles.buttonText, theme === 'light' ? styles.buttonTextLight : styles.buttonTextDark]}
      />
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  containerLight: {
    backgroundColor: Colors.background,
  },
  containerDark: {
    backgroundColor: Colors.black,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  titleLight: {
    color: Colors.primary,
  },
  titleDark: {
    color: Colors.white,
  },
  input: {
    width: '100%',
    padding: 12,
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 16,
  },
  inputLight: {
    borderColor: Colors.secondary,
    backgroundColor: Colors.white,
    color: Colors.text,
  },
  inputDark: {
    borderColor: Colors.accent,
    backgroundColor: Colors.darkGray,
    color: Colors.white,
  },
  pickerContainer: {
    width: '100%',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 16,
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
  },
  labelLight: {
    color: Colors.text,
  },
  labelDark: {
    color: Colors.white,
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
  buttonLight: {
    backgroundColor: Colors.secondary,
  },
  buttonDark: {
    backgroundColor: Colors.accent,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  buttonTextLight: {
    color: Colors.text,
  },
  buttonTextDark: {
    color: Colors.white,
  },
});

export default CrearFiesta;