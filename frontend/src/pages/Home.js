import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { api } from '../api';

const styles = {
  page: { minHeight: '100vh', background: '#f5f5f5' },
  navbar: { background: '#000', padding: '0 32px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '56px' },
  logo: { fontSize: '18px', fontWeight: '500', color: '#00BCD4' },
  logoSpan: { color: '#fff' },
  navRight: { display: 'flex', alignItems: 'center', gap: '16px' },
  userName: { color: '#888', fontSize: '13px' },
  logoutBtn: { background: 'transparent', border: '1px solid #444', color: '#ccc', padding: '6px 14px', borderRadius: '4px', fontSize: '12px' },
  container: { maxWidth: '800px', margin: '0 auto', padding: '32px 20px' },
  sectionTitle: { fontSize: '16px', fontWeight: '500', color: '#000', marginBottom: '16px', paddingBottom: '8px', borderBottom: '2px solid #00BCD4', display: 'inline-block' },
  section: { marginBottom: '40px' },
  card: { background: '#fff', border: '1px solid #e0e0e0', borderRadius: '8px', padding: '16px 20px', marginBottom: '10px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', textDecoration: 'none', color: 'inherit' },
  cardLeft: { display: 'flex', alignItems: 'center', gap: '14px' },
  icon: { width: '44px', height: '44px', background: '#000', borderRadius: '6px', display: 'flex', alignItems: 'center', justifyContent: 'center' },
  iconText: { color: '#00BCD4', fontSize: '18px' },
  cardTitle: { fontSize: '14px', fontWeight: '500', color: '#111' },
  cardMeta: { fontSize: '12px', color: '#888', marginTop: '2px' },
  arrow: { color: '#00BCD4', fontSize: '18px' },
  blogCard: { background: '#fff', border: '1px solid #e0e0e0', borderRadius: '8px', padding: '14px 20px', marginBottom: '10px', display: 'flex', alignItems: 'flex-start', gap: '12px', textDecoration: 'none', color: 'inherit' },
  blogDot: { width: '8px', height: '8px', background: '#00BCD4', borderRadius: '50%', marginTop: '5px', flexShrink: '0' },
  blogTitle: { fontSize: '14px', fontWeight: '500', color: '#111' },
  blogMeta: { fontSize: '12px', color: '#888', marginTop: '2px' },
  loading: { textAlign: 'center', padding: '40px', color: '#888' }
};

export default function Home() {
  const navigate = useNavigate();
  const [recipes, setRecipes] = useState([]);
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const user = JSON.parse(localStorage.getItem('user') || '{}');

  useEffect(() => {
    const load = async () => {
      const [r, b] = await Promise.all([api.get('/recipes'), api.get('/blogs')]);
      setRecipes(Array.isArray(r) ? r : []);
      setBlogs(Array.isArray(b) ? b : []);
      setLoading(false);
    };
    load();
  }, []);

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <div style={styles.page}>
      <nav style={styles.navbar}>
        <div style={styles.logo}><span style={styles.logoSpan}>Dapur </span>Mama</div>
        <div style={styles.navRight}>
          <span style={styles.userName}>{user.name}</span>
          <button style={styles.logoutBtn} onClick={logout}>Keluar</button>
        </div>
      </nav>

      <div style={styles.container}>
        {loading ? (
          <p style={styles.loading}>Memuat...</p>
        ) : (
          <>
            <div style={styles.section}>
              <div style={styles.sectionTitle}>Resep Populer</div>
              {recipes.map(r => (
                <Link key={r._id} to={`/detail/recipe/${r._id}`} style={styles.card}>
                  <div style={styles.cardLeft}>
                    <div style={styles.icon}><span style={styles.iconText}>*</span></div>
                    <div>
                      <div style={styles.cardTitle}>{r.title}</div>
                      <div style={styles.cardMeta}>{r.duration} &middot; {r.difficulty}</div>
                    </div>
                  </div>
                  <span style={styles.arrow}>›</span>
                </Link>
              ))}
            </div>

            <div style={styles.section}>
              <div style={styles.sectionTitle}>Blog Memasak</div>
              {blogs.map(b => (
                <Link key={b._id} to={`/detail/blog/${b._id}`} style={styles.blogCard}>
                  <div style={styles.blogDot}></div>
                  <div>
                    <div style={styles.blogTitle}>{b.title}</div>
                    <div style={styles.blogMeta}>{b.readTime} &middot; {b.author}</div>
                  </div>
                </Link>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
