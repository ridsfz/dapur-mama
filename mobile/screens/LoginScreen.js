import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { api } from '../api';

export default function LoginScreen({ navigation }) {
  const [form, setForm] = useState({ email: '', password: '' });

  const handleLogin = async () => {
    if (!form.email || !form.password) return Alert.alert('Error', 'Email dan password wajib diisi');
    const res = await api.post('/auth/login', form);
    if (res.token) {
      await AsyncStorage.setItem('token', res.token);
      await AsyncStorage.setItem('user', JSON.stringify(res.user));
      navigation.replace('Home');
    } else {
      Alert.alert('Error', res.message || 'Terjadi kesalahan');
    }
  };

  return (
    <View style={s.page}>
      <View style={s.header}>
        <Text style={s.logo}><Text style={s.logoWhite}>Dapur </Text>Mama</Text>
        <Text style={s.sub}>Masuk ke akun Anda</Text>
      </View>
      <View style={s.body}>
        <Text style={s.label}>Email</Text>
        <TextInput style={s.input} placeholder="Email" keyboardType="email-address" autoCapitalize="none" value={form.email} onChangeText={t => setForm({ ...form, email: t })} />
        <Text style={s.label}>Password</Text>
        <TextInput style={s.input} placeholder="Password" secureTextEntry value={form.password} onChangeText={t => setForm({ ...form, password: t })} />
        <TouchableOpacity style={s.btn} onPress={handleLogin}>
          <Text style={s.btnText}>Masuk</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Register')}>
          <Text style={s.linkText}>Belum punya akun? <Text style={s.link}>Daftar</Text></Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const s = StyleSheet.create({
  page: { flex: 1, backgroundColor: '#f5f5f5' },
  header: { backgroundColor: '#000', paddingTop: 80, paddingBottom: 32, alignItems: 'center' },
  logo: { fontSize: 22, color: '#00BCD4', fontWeight: '500' },
  logoWhite: { color: '#fff' },
  sub: { color: '#888', fontSize: 13, marginTop: 4 },
  body: { backgroundColor: '#fff', margin: 16, borderRadius: 8, padding: 24, borderWidth: 1, borderColor: '#e0e0e0', marginTop: 24 },
  label: { fontSize: 13, fontWeight: '500', color: '#333', marginBottom: 6 },
  input: { borderWidth: 1, borderColor: '#e0e0e0', borderRadius: 6, padding: 12, fontSize: 14, marginBottom: 16, backgroundColor: '#fafafa' },
  btn: { backgroundColor: '#00BCD4', borderRadius: 6, padding: 14, alignItems: 'center', marginTop: 4, marginBottom: 16 },
  btnText: { color: '#fff', fontWeight: '500', fontSize: 14 },
  linkText: { textAlign: 'center', fontSize: 13, color: '#666' },
  link: { color: '#00BCD4' }
});
