import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { api } from '../api';

const styles = {
  page: { minHeight: '100vh', background: '#f5f5f5', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' },
  card: { background: '#fff', border: '1px solid #e0e0e0', borderRadius: '8px', width: '100%', maxWidth: '400px', overflow: 'hidden' },
  header: { background: '#000', padding: '32px', textAlign: 'center' },
  logo: { fontSize: '24px', fontWeight: '500', color: '#00BCD4' },
  logoSpan: { color: '#fff' },
  sub: { color: '#888', fontSize: '13px', marginTop: '4px' },
  body: { padding: '28px 32px' },
  group: { marginBottom: '16px' },
  label: { display: 'block', fontSize: '13px', fontWeight: '500', marginBottom: '6px', color: '#333' },
  input: { width: '100%', padding: '10px 14px', border: '1px solid #e0e0e0', borderRadius: '6px', fontSize: '14px', outline: 'none' },
  btn: { width: '100%', padding: '12px', background: '#00BCD4', color: '#fff', borderRadius: '6px', fontSize: '14px', fontWeight: '500', marginTop: '8px' },
  link: { textAlign: 'center', marginTop: '16px', fontSize: '13px', color: '#666' },
  err: { color: '#e53935', fontSize: '13px', marginBottom: '12px' }
};

export default function Login() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    setError('');
    const res = await api.post('/auth/login', form);
    if (res.token) {
      localStorage.setItem('token', res.token);
      localStorage.setItem('user', JSON.stringify(res.user));
      navigate('/');
    } else {
      setError(res.message || 'Terjadi kesalahan');
    }
  };

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <div style={styles.header}>
          <div style={styles.logo}><span style={styles.logoSpan}>Dapur </span>Mama</div>
          <p style={styles.sub}>Masuk ke akun Anda</p>
        </div>
        <form style={styles.body} onSubmit={handleSubmit}>
          {error && <p style={styles.err}>{error}</p>}
          <div style={styles.group}>
            <label style={styles.label}>Email</label>
            <input style={styles.input} name="email" type="email" placeholder="Email" value={form.email} onChange={handleChange} required />
          </div>
          <div style={styles.group}>
            <label style={styles.label}>Password</label>
            <input style={styles.input} name="password" type="password" placeholder="Password" value={form.password} onChange={handleChange} required />
          </div>
          <button style={styles.btn} type="submit">Masuk</button>
          <p style={styles.link}>Belum punya akun? <Link to="/register" style={{ color: '#00BCD4' }}>Daftar</Link></p>
        </form>
      </div>
    </div>
  );
}
