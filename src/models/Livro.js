import mongoose from "mongoose";

const livroSchema = new mongoose.Schema(
  {
    id: {type: String},
    titulo: {type: String, required: [true, "Titulo do Livro é obrigatorio"]},
    autor: {type: mongoose.Schema.Types.ObjectId, ref: 'autores', required: [true, "O(A) Autor(a) do Livro é obrigatorio"]},
    editora: {type: String, required: [true, "A Editora do Livro é obrigatorio"]},
    numeroPaginas: {type: Number}
  }
);

const livros= mongoose.model('livros', livroSchema);

export default livros;