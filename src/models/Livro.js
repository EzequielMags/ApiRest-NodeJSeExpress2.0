import mongoose from "mongoose";

const livroSchema = new mongoose.Schema(
  {
    id: {type: String},
    titulo: {
      type: String, 
      required: [true, "Titulo do Livro é obrigatorio"]
    },
    autor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'autores',
      required: [true, "O(A) Autor(a) do Livro é obrigatorio"]
    },
    editora: {
      type: String, 
      required: [true, "A Editora do Livro é obrigatorio"],
      enum: {
        values: ["Casa do Código", "Alura", "Deus é bom e o diabo n presta"],
        message: "A editora {VALUE} não é um valor permitido"
      }
    },
    numeroPaginas: 
    {
      type: Number,
      validate: {
        validator: (valor) => {
          return valor >= 10 && valor <= 5000
        },
        message: "O número de páginas deve estar entre 10 e 5000. Valor fornecido: {VALUE}"
      }
    }
  }
);

const livros= mongoose.model('livros', livroSchema);

export default livros;