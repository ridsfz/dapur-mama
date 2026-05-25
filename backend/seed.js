const mongoose = require('mongoose');
require('dotenv').config();

const Recipe = require('./models/Recipe');
const Blog = require('./models/Blog');

const recipes = [
  {
    title: 'Rendang Sapi',
    description: 'Masakan khas Minang dengan cita rasa kaya dan gurih',
    ingredients: ['500g daging sapi', '400ml santan', '3 lembar daun jeruk', '2 batang serai', 'Bumbu halus secukupnya'],
    steps: ['Tumis bumbu halus hingga harum', 'Masukkan daging, aduk rata', 'Tuang santan dan masak dengan api kecil', 'Masak hingga santan mengering dan daging berwarna kecoklatan'],
    duration: '45 menit',
    difficulty: 'Sedang',
    servings: '4 porsi'
  },
  {
    title: 'Soto Ayam',
    description: 'Sup ayam kuning yang segar dan kaya rempah',
    ingredients: ['1 ekor ayam', '2L air', 'Daun bawang', 'Seledri', 'Bumbu kuning'],
    steps: ['Rebus ayam hingga empuk', 'Tumis bumbu kuning hingga matang', 'Masukkan bumbu ke kaldu ayam', 'Sajikan dengan pelengkap'],
    duration: '30 menit',
    difficulty: 'Mudah',
    servings: '6 porsi'
  },
  {
    title: 'Gulai Ikan',
    description: 'Gulai ikan yang gurih dengan kuah santan kuning',
    ingredients: ['500g ikan', '300ml santan', 'Bumbu gulai', 'Daun kunyit', 'Serai'],
    steps: ['Bersihkan ikan dan lumuri garam', 'Rebus bumbu dengan santan', 'Masukkan ikan dan masak hingga matang'],
    duration: '25 menit',
    difficulty: 'Mudah',
    servings: '4 porsi'
  }
];

const blogs = [
  {
    title: 'Tips Memasak untuk Pemula',
    content: 'Memasak adalah keterampilan yang bisa dipelajari siapa saja. Mulailah dengan resep sederhana, gunakan bahan segar, dan jangan takut mencoba. Persiapkan semua bahan sebelum mulai memasak agar proses lebih lancar. Baca resep hingga habis sebelum memulai. Gunakan api yang sesuai petunjuk.',
    readTime: '5 menit baca',
    author: 'Tim Dapur Mama'
  },
  {
    title: 'Cara Jualan Masakan Online',
    content: 'Berjualan masakan online bisa menjadi sumber penghasilan yang menjanjikan. Mulai dengan membuat foto masakan yang menarik, tentukan harga yang kompetitif, dan gunakan media sosial untuk promosi. Pastikan kemasan rapi dan higienis. Selalu jaga kualitas dan konsistensi rasa.',
    readTime: '8 menit baca',
    author: 'Tim Dapur Mama'
  },
  {
    title: 'Manfaat Memasak Sendiri di Rumah',
    content: 'Memasak sendiri di rumah memiliki banyak manfaat. Selain lebih hemat, kita bisa mengontrol bahan dan kebersihan masakan. Memasak bersama keluarga juga mempererat hubungan antar anggota keluarga.',
    readTime: '4 menit baca',
    author: 'Tim Dapur Mama'
  }
];

async function seed() {
  await mongoose.connect(process.env.MONGO_URI);
  await Recipe.deleteMany({});
  await Blog.deleteMany({});
  await Recipe.insertMany(recipes);
  await Blog.insertMany(blogs);
  console.log('Data berhasil di-seed');
  process.exit(0);
}

seed().catch(err => { console.error(err); process.exit(1); });
