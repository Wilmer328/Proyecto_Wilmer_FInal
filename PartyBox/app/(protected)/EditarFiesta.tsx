import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, Alert } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { editParty } from '@/store/slices/userSlice';
import { router, useLocalSearchParams } from 'expo-router';
import { Colors } from '@/constants/Colors';
import CustomButton from '@/components/CustomButton';
import { useLanguage } from '@/contexts/LanguageContext';
import { useTheme } from '@/contexts/ThemeContext';
import { translations } from '@/constants/translations';
import { Picker } from '@react-native-picker/picker';
import { RootState } from '@/store/store';

const EditarFiesta = () => {
  const dispatch = useDispatch();
  const { language } = useLanguage();
  const { theme } = useTheme();
  const t = translations[language];
  const { id } = useLocalSearchParams(); // Obtén el ID de la fiesta desde la URL
  const parties = useSelector((state: RootState) => state.user.parties);

  const party = parties.find((p) => p.id === id);

  const [type, setType] = useState(party?.type || '');
  const [guests, setGuests] = useState(party?.guests.toString() || '');
  const [food, setFood] = useState(party?.food || 'Standard');
  const [decoration, setDecoration] = useState(party?.decoration || 'Standard');
  const [date, setDate] = useState(party?.date || '');
  const [time, setTime] = useState(party?.time || '');

  const handleSave = () => {
    if (!type || !guests || !food || !decoration || !date || !time) {
      Alert.alert(t.error, t.completeAllFields);
      return;
    }

    const updatedParty = {
      id: party!.id, // Usamos el ID de la fiesta existente
      type,
      guests: parseInt(guests, 10),
      food,
      decoration,
      date,
      time,
    };

    dispatch(editParty(updatedParty));
    router.replace('/(protected)/FiestasPlaneadas');
  };

  const containerStyle = theme === 'light' ? styles.containerLight : styles.containerDark;
  const titleStyle = theme === 'light' ? styles.titleLight : styles.titleDark;
  const inputStyle = theme === 'light' ? styles.inputLight : styles.inputDark;
  const labelStyle = theme === 'light' ? styles.labelLight : styles.labelDark;

  return (
    <View style={[styles.container, containerStyle]}>
      <Text style={[styles.title, titleStyle]}>{t.editParty}</Text>

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

      <TextInput
        style={[styles.input, inputStyle]}
        placeholder={t.time}
        value={time}
        onChangeText={(text) => {
          if (/^\d{0,2}:?\d{0,2}$/.test(text)) {
            setTime(text);
          }
        }}
        keyboardType="numeric"
      />

      <CustomButton title={t.saveChanges} onPress={handleSave} />
      <CustomButton title={t.goBack} onPress={() => router.replace('/(protected)/FiestasPlaneadas')} />
    </View>
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
});

export default EditarFiesta;