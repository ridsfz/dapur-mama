import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, SafeAreaView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { api } from '../api';

export default function HomeScreen({ navigation }) {
  const [recipes, setRecipes] = useState([]);
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState({});

  useEffect(() => {
    AsyncStorage.getItem('user').then(u => u && setUser(JSON.parse(u)));
    api.get('/recipes').then(r => setRecipes(Array.isArray(r) ? r : []));
    api.get('/blogs').then(b => setBlogs(Array.isArray(b) ? b : []));
  }, []);

  const logout = async () => {
    await AsyncStorage.removeItem('token');
    await AsyncStorage.removeItem('user');
    navigation.replace('Login');
  };

  return (
    <SafeAreaView style={s.safe}>
      <View style={s.navbar}>
        <Text style={s.logo}><Text style={s.logoWhite}>Dapur </Text>Mama</Text>
        <TouchableOpacity onPress={logout}>
          <Text style={s.logoutBtn}>Keluar</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={s.scroll}>
        <View style={s.container}>
          <View style={s.greet}>
            <Text style={s.greetText}>Halo, {user.name}</Text>
            <Text style={s.greetSub}>Mau masak apa hari ini?</Text>
          </View>

          <Text style={s.sectionTitle}>Resep Populer</Text>
          {recipes.map(r => (
            <TouchableOpacity key={r._id} style={s.card} onPress={() => navigation.navigate('Detail', { type: 'recipe', id: r._id })}>
              <View style={s.cardLeft}>
                <View style={s.icon}><Text style={s.iconText}>#</Text></View>
                <View>
                  <Text style={s.cardTitle}>{r.title}</Text>
                  <Text style={s.cardMeta}>{r.duration} · {r.difficulty}</Text>
                </View>
              </View>
              <Text style={s.arrow}>›</Text>
            </TouchableOpacity>
          ))}

          <Text style={[s.sectionTitle, { marginTop: 24 }]}>Blog Memasak</Text>
          {blogs.map(b => (
            <TouchableOpacity key={b._id} style={s.blogCard} onPress={() => navigation.navigate('Detail', { type: 'blog', id: b._id })}>
              <View style={s.dot} />
              <View style={{ flex: 1 }}>
                <Text style={s.blogTitle}>{b.title}</Text>
                <Text style={s.blogMeta}>{b.readTime} · {b.author}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const s = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#f5f5f5' },
  navbar: { backgroundColor: '#000', padding: 16, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  logo: { fontSize: 18, color: '#00BCD4', fontWeight: '500' },
  logoWhite: { color: '#fff' },
  logoutBtn: { color: '#888', fontSize: 13, borderWidth: 1, borderColor: '#444', paddingHorizontal: 12, paddingVertical: 5, borderRadius: 4 },
  scroll: { flex: 1 },
  container: { padding: 16 },
  greet: { marginBottom: 20 },
  greetText: { fontSize: 18, fontWeight: '500', color: '#000' },
  greetSub: { fontSize: 13, color: '#888', marginTop: 2 },
  sectionTitle: { fontSize: 14, fontWeight: '500', color: '#000', marginBottom: 12, borderBottomWidth: 2, borderBottomColor: '#00BCD4', paddingBottom: 6, alignSelf: 'flex-start' },
  card: { backgroundColor: '#fff', borderRadius: 8, padding: 14, marginBottom: 8, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', borderWidth: 1, borderColor: '#e0e0e0' },
  cardLeft: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  icon: { width: 40, height: 40, backgroundColor: '#000', borderRadius: 6, alignItems: 'center', justifyContent: 'center' },
  iconText: { color: '#00BCD4', fontSize: 18, fontWeight: 'bold' },
  cardTitle: { fontSize: 14, fontWeight: '500', color: '#111' },
  cardMeta: { fontSize: 12, color: '#888', marginTop: 2 },
  arrow: { color: '#00BCD4', fontSize: 20 },
  blogCard: { backgroundColor: '#fff', borderRadius: 8, padding: 14, marginBottom: 8, flexDirection: 'row', alignItems: 'flex-start', gap: 10, borderWidth: 1, borderColor: '#e0e0e0' },
  dot: { width: 8, height: 8, backgroundColor: '#00BCD4', borderRadius: 4, marginTop: 5 },
  blogTitle: { fontSize: 14, fontWeight: '500', color: '#111' },
  blogMeta: { fontSize: 12, color: '#888', marginTop: 2 }
});
