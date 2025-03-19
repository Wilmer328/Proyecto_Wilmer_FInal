import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Colors } from '@/constants/Colors';
import { MaterialIcons } from '@expo/vector-icons';
import moment from 'moment';
import { useLanguage } from '@/contexts/LanguageContext';
import { translations } from '@/constants/translations';

interface PartyCardProps {
  party: {
    type: string;
    guests: number;
    food: string;
    decoration: string;
    date: string;
    time: string;
  };
  currentTime: moment.Moment;
}

const PartyCard = ({ party, currentTime }: PartyCardProps) => {
  const { language } = useLanguage();
  const t = translations[language];

  const partyDateTime = moment(`${party.date} ${party.time}`, 'DD/MM/YYYY HH:mm');
  const timeLeft = moment.duration(partyDateTime.diff(currentTime));

  const months = timeLeft.months();
  const days = timeLeft.days();
  const hours = timeLeft.hours();
  const minutes = timeLeft.minutes();
  const seconds = timeLeft.seconds();

  const timeLeftString =
    timeLeft.asSeconds() > 0
      ? `${months}m ${days}d ${hours}h ${minutes}m ${seconds}s`
      : t.partyStarted;

  return (
    <View style={styles.card}>
      <Text style={styles.cardTitle}>{party.type}</Text>
      <View style={styles.detailRow}>
        <MaterialIcons name="people" size={16} color={Colors.primary} />
        <Text style={styles.detailText}>{t.guests}: {party.guests}</Text>
      </View>
      <View style={styles.detailRow}>
        <MaterialIcons name="restaurant" size={16} color={Colors.primary} />
        <Text style={styles.detailText}>{t.food}: {party.food}</Text>
      </View>
      <View style={styles.detailRow}>
        <MaterialIcons name="celebration" size={16} color={Colors.primary} />
        <Text style={styles.detailText}>{t.decoration}: {party.decoration}</Text>
      </View>
      <View style={styles.detailRow}>
        <MaterialIcons name="date-range" size={16} color={Colors.primary} />
        <Text style={styles.detailText}>{t.date}: {party.date}</Text>
      </View>
      <View style={styles.detailRow}>
        <MaterialIcons name="access-time" size={16} color={Colors.primary} />
        <Text style={styles.detailText}>{t.time}: {party.time}</Text>
      </View>
      <View style={styles.detailRow}>
        <MaterialIcons name="timer" size={16} color={Colors.primary} />
        <Text style={styles.detailText}>{t.timeLeft}: {timeLeftString}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    padding: 16,
    borderWidth: 1,
    borderColor: Colors.secondary,
    borderRadius: 8,
    marginBottom: 16,
    backgroundColor: Colors.white,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.primary,
    marginBottom: 8,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  detailText: {
    marginLeft: 8,
    fontSize: 14,
    color: Colors.text,
  },
});

export default PartyCard;