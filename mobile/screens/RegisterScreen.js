import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { api } from '../api';

export default function RegisterScreen({ navigation }) {
  const [form, setForm] = useState({ name: '', email: '', password: '', confirm: '' });

  const handleRegister = async () => {
    if (!form.name || !form.email || !form.password) return Alert.alert('Error', 'Semua field wajib diisi');
    if (form.password !== form.confirm) return Alert.alert('Error', 'Password tidak cocok');

    const res = await api.post('/auth/register', { name: form.name, email: form.email, password: form.password });
    if (res.token) {
      await AsyncStorage.setItem('token', res.token);
      await AsyncStorage.setItem('user', JSON.stringify(res.user));
      navigation.replace('Home');
    } else {
      Alert.alert('Error', res.message || 'Terjadi kesalahan');
    }
  };

  return (
    <ScrollView style={s.page} contentContainerStyle={s.content}>
      <View style={s.header}>
        <Text style={s.logo}><Text style={s.logoWhite}>Dapur </Text>Mama</Text>
        <Text style={s.sub}>Buat akun baru</Text>
      </View>
      <View style={s.body}>
        <Text style={s.label}>Nama Lengkap</Text>
        <TextInput style={s.input} placeholder="Nama lengkap" value={form.name} onChangeText={t => setForm({ ...form, name: t })} />
        <Text style={s.label}>Email</Text>
        <TextInput style={s.input} placeholder="Email" keyboardType="email-address" autoCapitalize="none" value={form.email} onChangeText={t => setForm({ ...form, email: t })} />
        <Text style={s.label}>Password</Text>
        <TextInput style={s.input} placeholder="Password" secureTextEntry value={form.password} onChangeText={t => setForm({ ...form, password: t })} />
        <Text style={s.label}>Konfirmasi Password</Text>
        <TextInput style={s.input} placeholder="Konfirmasi password" secureTextEntry value={form.confirm} onChangeText={t => setForm({ ...form, confirm: t })} />
        <TouchableOpacity style={s.btn} onPress={handleRegister}>
          <Text style={s.btnText}>Daftar</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
          <Text style={s.linkText}>Sudah punya akun? <Text style={s.link}>Masuk</Text></Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const s = StyleSheet.create({
  page: { flex: 1, backgroundColor: '#f5f5f5' },
  content: { flexGrow: 1 },
  header: { backgroundColor: '#000', paddingTop: 60, paddingBottom: 24, alignItems: 'center' },
  logo: { fontSize: '22px', color: '#00BCD4', fontWeight: '500' },
  logoWhite: { color: '#fff' },
  sub: { color: '#888', fontSize: 13, marginTop: 4 },
  body: { backgroundColor: '#fff', margin: 16, borderRadius: 8, padding: 24, borderWidth: 1, borderColor: '#e0e0e0' },
  label: { fontSize: 13, fontWeight: '500', color: '#333', marginBottom: 6 },
  input: { borderWidth: 1, borderColor: '#e0e0e0', borderRadius: 6, padding: 12, fontSize: 14, marginBottom: 14, backgroundColor: '#fafafa' },
  btn: { backgroundColor: '#00BCD4', borderRadius: 6, padding: 14, alignItems: 'center', marginTop: 4, marginBottom: 16 },
  btnText: { color: '#fff', fontWeight: '500', fontSize: 14 },
  linkText: { textAlign: 'center', fontSize: 13, color: '#666' },
  link: { color: '#00BCD4' }
});
