import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, SafeAreaView } from 'react-native';
import { api } from '../api';

export default function DetailScreen({ route, navigation }) {
  const { type, id } = route.params;
  const [data, setData] = useState(null);

  useEffect(() => {
    const path = type === 'recipe' ? `/recipes/${id}` : `/blogs/${id}`;
    api.get(path).then(setData);
  }, [type, id]);

  if (!data) return (
    <View style={s.center}>
      <Text style={{ color: '#888' }}>Memuat...</Text>
    </View>
  );

  return (
    <SafeAreaView style={s.safe}>
      <View style={s.navbar}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={s.backBtn}>← Kembali</Text>
        </TouchableOpacity>
        <Text style={s.navTitle}>{type === 'recipe' ? 'Detail Resep' : 'Detail Blog'}</Text>
        <View style={{ width: 70 }} />
      </View>

      <ScrollView style={s.scroll}>
        <View style={s.hero}>
          <Text style={s.heroIcon}>{type === 'recipe' ? '#' : '@'}</Text>
        </View>

        <View style={s.container}>
          <Text style={s.title}>{data.title}</Text>

          {type === 'recipe' ? (
            <>
              <View style={s.tags}>
                {data.duration && <View style={s.tag}><Text style={s.tagText}>{data.duration}</Text></View>}
                {data.difficulty && <View style={s.tag}><Text style={s.tagText}>{data.difficulty}</Text></View>}
                {data.servings && <View style={s.tag}><Text style={s.tagText}>{data.servings}</Text></View>}
              </View>
              {data.description && <Text style={s.desc}>{data.description}</Text>}

              <View style={s.divider} />
              <Text style={s.sectionLabel}>Bahan-bahan</Text>
              {data.ingredients?.map((item, i) => (
                <View key={i} style={s.ingredientRow}>
                  <View style={s.dot} />
                  <Text style={s.ingredientText}>{item}</Text>
                </View>
              ))}

              <View style={s.divider} />
              <Text style={s.sectionLabel}>Langkah Memasak</Text>
              {data.steps?.map((step, i) => (
                <View key={i} style={s.stepRow}>
                  <View style={s.stepNum}><Text style={s.stepNumText}>{i + 1}</Text></View>
                  <Text style={s.stepText}>{step}</Text>
                </View>
              ))}
            </>
          ) : (
            <>
              <Text style={s.meta}>{data.readTime} · {data.author}</Text>
              <View style={s.divider} />
              <Text style={s.blogContent}>{data.content}</Text>
            </>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const s = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#f5f5f5' },
  center: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  navbar: { backgroundColor: '#000', padding: 14, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  backBtn: { color: '#00BCD4', fontSize: 14 },
  navTitle: { color: '#fff', fontSize: 15, fontWeight: '500' },
  scroll: { flex: 1 },
  hero: { backgroundColor: '#000', height: 120, alignItems: 'center', justifyContent: 'center' },
  heroIcon: { color: '#00BCD4', fontSize: 48, fontWeight: 'bold' },
  container: { padding: 20 },
  title: { fontSize: 20, fontWeight: '500', color: '#000', marginBottom: 10 },
  tags: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginBottom: 14 },
  tag: { backgroundColor: '#000', borderRadius: 4, paddingHorizontal: 10, paddingVertical: 4 },
  tagText: { color: '#00BCD4', fontSize: 12 },
  desc: { fontSize: 13, color: '#666', marginBottom: 8, lineHeight: 20 },
  divider: { borderTopWidth: 1, borderTopColor: '#e0e0e0', marginVertical: 16 },
  sectionLabel: { fontSize: 12, fontWeight: '500', color: '#000', marginBottom: 10, textTransform: 'uppercase', letterSpacing: 0.5 },
  ingredientRow: { flexDirection: 'row', alignItems: 'center', gap: 10, paddingVertical: 6, borderBottomWidth: 1, borderBottomColor: '#f0f0f0' },
  dot: { width: 6, height: 6, backgroundColor: '#00BCD4', borderRadius: 3 },
  ingredientText: { fontSize: 14, color: '#444' },
  stepRow: { flexDirection: 'row', gap: 12, marginBottom: 12, alignItems: 'flex-start' },
  stepNum: { width: 24, height: 24, backgroundColor: '#00BCD4', borderRadius: 12, alignItems: 'center', justifyContent: 'center' },
  stepNumText: { color: '#fff', fontSize: 11, fontWeight: '500' },
  stepText: { fontSize: 14, color: '#444', lineHeight: 22, flex: 1 },
  meta: { fontSize: 13, color: '#888', marginBottom: 4 },
  blogContent: { fontSize: 14, color: '#444', lineHeight: 24 }
});
