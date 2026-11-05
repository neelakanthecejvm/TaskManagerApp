
import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = () => {
    if (!email.trim() || !password.trim()) {
      Alert.alert('Error', 'Please enter email and password');
      return;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(email.trim())) {
      Alert.alert('Error', 'Please enter a valid email');
      return;
    }

    if (password.length < 6) {
      Alert.alert('Error', 'Password must contain at least 6 characters');
      return;
    }

    navigation.replace('Main');
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.logo}>✓</Text>
        <Text style={styles.title}>Task Manager</Text>
        <Text style={styles.subtitle}>Welcome back! Please login.</Text>

        <Text style={styles.label}>Email Address</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />

        <Text style={styles.label}>Password</Text>
        <View style={styles.passwordBox}>
          <TextInput
            style={styles.passwordInput}
            placeholder="Enter password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry={!showPassword}
          />
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
            <Text style={styles.showText}>
              {showPassword ? 'Hide' : 'Show'}
            </Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>

        <Text style={styles.footer}>
          Demo login: enter any valid email and password (minimum 6 characters).
        </Text>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F4F6FC' },
  content: { flexGrow: 1, justifyContent: 'center', padding: 25 },
  logo: {
    fontSize: 45,
    color: '#FFFFFF',
    backgroundColor: '#4F46E5',
    width: 75,
    height: 75,
    textAlign: 'center',
    textAlignVertical: 'center',
    borderRadius: 20,
    alignSelf: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#1E293B',
  },
  subtitle: {
    textAlign: 'center',
    color: '#64748B',
    marginTop: 8,
    marginBottom: 35,
  },
  label: { fontSize: 15, fontWeight: '600', marginBottom: 8, color: '#334155' },
  input: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: 12,
    padding: 15,
    marginBottom: 20,
  },
  passwordBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: 12,
    paddingHorizontal: 15,
    marginBottom: 25,
  },
  passwordInput: { flex: 1, paddingVertical: 15 },
  showText: { color: '#4F46E5', fontWeight: 'bold' },
  button: {
    backgroundColor: '#4F46E5',
    padding: 17,
    borderRadius: 12,
    alignItems: 'center',
  },
  buttonText: { color: '#FFFFFF', fontSize: 17, fontWeight: 'bold' },
  footer: {
    textAlign: 'center',
    color: '#64748B',
    marginTop: 20,
    fontSize: 12,
  },
});
