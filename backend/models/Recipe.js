const mongoose = require('mongoose');

const recipeSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  ingredients: [{ type: String }],
  steps: [{ type: String }],
  duration: { type: String },
  difficulty: { type: String, enum: ['Mudah', 'Sedang', 'Sulit'], default: 'Mudah' },
  servings: { type: String }
}, { timestamps: true });

module.exports = mongoose.model('Recipe', recipeSchema);
