const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const categoriaSchema = new Schema({
  descripcion: {
    type: String,
    required: [true, 'La descripcion es necesaria'],
  },
  usuario: {
    type: Schema.Types.ObjectId,
    ref: 'Usuario',
  },
});

const Categoria = mongoose.model('Categoria', categoriaSchema);

module.exports = Categoria;
