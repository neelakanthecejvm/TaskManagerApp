
import React from 'react';

import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Switch,
} from 'react-native';

import { useApp } from '../context/AppContext';

export default function ProfileScreen({ navigation }) {
  const { darkMode, toggleDarkMode } = useApp();

  const backgroundColor = darkMode ? '#121212' : '#F4F6FC';
  const textColor = darkMode ? '#FFFFFF' : '#1E293B';
  const cardColor = darkMode ? '#252525' : '#FFFFFF';

  return (
    <View style={[styles.container, { backgroundColor }]}>

      <Text style={[styles.heading, { color: textColor }]}>
        My Profile
      </Text>

      <View style={[styles.card, { backgroundColor: cardColor }]}>
        <Text style={[styles.name, { color: textColor }]}>
          Task Manager User
        </Text>

        <Text style={styles.email}>
          user@example.com
        </Text>
      </View>

      <View style={[styles.setting, { backgroundColor: cardColor }]}>
        <Text style={[styles.settingText, { color: textColor }]}>
          Dark Mode
        </Text>

        <Switch
          value={darkMode}
          onValueChange={toggleDarkMode}
        />
      </View>

      <TouchableOpacity
        style={styles.logoutButton}
        onPress={() => navigation.replace('Login')}
      >
        <Text style={styles.buttonText}>
          Logout
        </Text>
      </TouchableOpacity>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },

  heading: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 25,
  },

  card: {
    padding: 25,
    borderRadius: 12,
    marginBottom: 20,
  },

  name: {
    fontSize: 20,
    fontWeight: 'bold',
  },

  email: {
    color: '#64748B',
    marginTop: 8,
  },

  setting: {
    padding: 18,
    borderRadius: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  settingText: {
    fontSize: 17,
    fontWeight: '600',
  },

  logoutButton: {
    backgroundColor: '#DC2626',
    padding: 15,
    borderRadius: 10,
    marginTop: 30,
    alignItems: 'center',
  },

  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});
