import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { api } from '../api';

const styles = {
  page: { minHeight: '100vh', background: '#f5f5f5' },
  navbar: { background: '#000', padding: '0 32px', display: 'flex', alignItems: 'center', gap: '16px', height: '56px' },
  backBtn: { background: 'transparent', border: 'none', color: '#00BCD4', fontSize: '22px', cursor: 'pointer', padding: '0' },
  navTitle: { color: '#fff', fontSize: '16px', fontWeight: '500' },
  container: { maxWidth: '700px', margin: '0 auto', padding: '32px 20px' },
  hero: { background: '#000', borderRadius: '8px', height: '120px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '24px' },
  heroIcon: { color: '#00BCD4', fontSize: '48px' },
  title: { fontSize: '22px', fontWeight: '500', color: '#000', marginBottom: '10px' },
  tags: { display: 'flex', gap: '8px', marginBottom: '20px', flexWrap: 'wrap' },
  tag: { background: '#000', color: '#00BCD4', borderRadius: '4px', padding: '4px 12px', fontSize: '12px' },
  divider: { borderTop: '1px solid #e0e0e0', margin: '20px 0' },
  sectionLabel: { fontSize: '13px', fontWeight: '500', color: '#000', marginBottom: '10px', textTransform: 'uppercase', letterSpacing: '0.04em' },
  ingredientItem: { fontSize: '14px', color: '#444', padding: '6px 0', borderBottom: '1px solid #f0f0f0', display: 'flex', alignItems: 'center', gap: '8px' },
  dot: { width: '6px', height: '6px', background: '#00BCD4', borderRadius: '50', flexShrink: '0' },
  stepRow: { display: 'flex', gap: '12px', alignItems: 'flex-start', marginBottom: '12px' },
  stepNum: { width: '24px', height: '24px', background: '#00BCD4', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: '0' },
  stepNumText: { color: '#fff', fontSize: '11px', fontWeight: '500' },
  stepText: { fontSize: '14px', color: '#444', lineHeight: '1.6', paddingTop: '3px' },
  blogContent: { fontSize: '14px', color: '#444', lineHeight: '1.8' },
  meta: { fontSize: '13px', color: '#888', marginBottom: '16px' },
  loading: { textAlign: 'center', padding: '60px', color: '#888' }
};

export default function Detail() {
  const { type, id } = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState(null);

  useEffect(() => {
    const path = type === 'recipe' ? `/recipes/${id}` : `/blogs/${id}`;
    api.get(path).then(setData);
  }, [type, id]);

  if (!data) return <div style={styles.page}><p style={styles.loading}>Memuat...</p></div>;

  return (
    <div style={styles.page}>
      <nav style={styles.navbar}>
        <button style={styles.backBtn} onClick={() => navigate('/')}>&#8592;</button>
        <span style={styles.navTitle}>{type === 'recipe' ? 'Detail Resep' : 'Detail Blog'}</span>
      </nav>

      <div style={styles.container}>
        <div style={styles.hero}>
          <span style={styles.heroIcon}>{type === 'recipe' ? '#' : '@'}</span>
        </div>

        <h1 style={styles.title}>{data.title}</h1>

        {type === 'recipe' ? (
          <>
            <div style={styles.tags}>
              {data.duration && <span style={styles.tag}>{data.duration}</span>}
              {data.difficulty && <span style={styles.tag}>{data.difficulty}</span>}
              {data.servings && <span style={styles.tag}>{data.servings}</span>}
            </div>
            {data.description && <p style={{ fontSize: '14px', color: '#666', marginBottom: '16px' }}>{data.description}</p>}

            <div style={styles.divider} />
            <div style={styles.sectionLabel}>Bahan-bahan</div>
            {data.ingredients?.map((item, i) => (
              <div key={i} style={styles.ingredientItem}>
                <div style={styles.dot}></div>
                {item}
              </div>
            ))}

            <div style={styles.divider} />
            <div style={styles.sectionLabel}>Langkah Memasak</div>
            {data.steps?.map((step, i) => (
              <div key={i} style={styles.stepRow}>
                <div style={styles.stepNum}><span style={styles.stepNumText}>{i + 1}</span></div>
                <p style={styles.stepText}>{step}</p>
              </div>
            ))}
          </>
        ) : (
          <>
            <p style={styles.meta}>{data.readTime} &middot; {data.author}</p>
            <div style={styles.divider} />
            <p style={styles.blogContent}>{data.content}</p>
          </>
        )}
      </div>
    </div>
  );
}
