import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/store/store';
import { Colors } from '@/constants/Colors';
import PartyCard from '@/components/PartyCard';
import moment from 'moment';
import { useLanguage } from '@/contexts/LanguageContext';
import { useTheme } from '@/contexts/ThemeContext';
import { translations } from '@/constants/translations';
import CustomButton from '@/components/CustomButton';
import { router } from 'expo-router';
import { deleteParty } from '@/store/slices/userSlice';

const FiestasPlaneadas = () => {
  const dispatch = useDispatch();
  const parties = useSelector((state: RootState) => state.user.parties);
  const { language } = useLanguage();
  const { theme } = useTheme();
  const t = translations[language];

  const [currentTime, setCurrentTime] = useState(moment());

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(moment());
    }, 1000); // Actualizar cada segundo

    return () => clearInterval(interval);
  }, []);

  const handleDelete = (id: string) => {
    dispatch(deleteParty(id));
  };

  if (parties.length === 0) {
    return (
      <View style={[styles.container, theme === 'light' ? styles.containerLight : styles.containerDark]}>
        <Text style={[styles.title, theme === 'light' ? styles.titleLight : styles.titleDark]}>
          {t.noParties}
        </Text>
        <CustomButton
          title={t.goBack}
          onPress={() => router.replace('/(protected)/home')}
          style={[styles.button, theme === 'light' ? styles.buttonLight : styles.buttonDark]}
          textStyle={[styles.buttonText, theme === 'light' ? styles.buttonTextLight : styles.buttonTextDark]}
        />
      </View>
    );
  }

  return (
    <View style={[styles.container, theme === 'light' ? styles.containerLight : styles.containerDark]}>
      <CustomButton
        title={t.goBack}
        onPress={() => router.replace('/(protected)/home')}
        style={[styles.button, theme === 'light' ? styles.buttonLight : styles.buttonDark]}
        textStyle={[styles.buttonText, theme === 'light' ? styles.buttonTextLight : styles.buttonTextDark]}
      />
      <Text style={[styles.title, theme === 'light' ? styles.titleLight : styles.titleDark]}>
        {t.plannedParties}
      </Text>

      <FlatList
        data={parties}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.partyContainer}>
            <PartyCard
              party={item}
              currentTime={currentTime}
            />
            <View style={styles.buttonsContainer}>
              <TouchableOpacity
                style={[styles.button, styles.editButton]}
                onPress={() => router.push(`/(protected)/EditarFiesta?id=${item.id}`)}
              >
                <Text style={styles.buttonText}>{t.edit}</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.button, styles.deleteButton]}
                onPress={() => handleDelete(item.id)}
              >
                <Text style={styles.buttonText}>{t.delete}</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
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
  partyContainer: {
    marginBottom: 16,
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  button: {
    padding: 8,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    marginHorizontal: 4,
  },
  editButton: {
    backgroundColor: Colors.secondary,
  },
  deleteButton: {
    backgroundColor: Colors.accent,
  },
  buttonText: {
    color: Colors.white,
    fontWeight: 'bold',
  },
});

export default FiestasPlaneadas;