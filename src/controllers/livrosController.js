import NaoEncontrado from "../erros/NaoEncontrado.js";
import { livros } from "../models/index.js";
import mongoose from "mongoose";
class LivroController {

  static listarLivros = async (req, res, next) => {
    try {
      const livrosResultado = await livros.find()
        .populate("autor")
        .exec();

      res.status(200).json(livrosResultado);
    } catch (erro) {
      next(erro)
    }
  }

  static listarLivroPorId = async (req, res, next) => {
    try {
      const id = req.params.id;

      const livroResultados = await livros.findById(id)
        .populate("autor", "nome")
        .exec();


      if (livroResultados === null) {
        next(new NaoEncontrado("O ID é invalido"))
      } else {
        res.status(200).send(livroResultados);
      }

    } catch (erro) {
      if (erro instanceof mongoose.Error.CastError) {
        next(new NaoEncontrado("o ID do livro é invalido"))
      }
    }
  }

  static cadastrarLivro = async (req, res, next) => {
    try {
      let livro = new livros(req.body);

      const livroResultado = await livro.save();

      res.status(201).send(livroResultado.toJSON());
    } catch (erro) {
      next(erro)
    }
  }

  static atualizarLivro = async (req, res, next) => {
    try {
      const id = req.params.id;

      await livros.findByIdAndUpdate(id, {$set: req.body});

      res.status(200).send({message: "Livro atualizado com sucesso"});
    } catch (erro) {
      if (erro instanceof mongoose.Error.CastError) {
        next(new NaoEncontrado("O ID do livro para ser atualizado não foi encontrado"))
      }
    }
  }

  static excluirLivro = async (req, res, next) => {
    try {
      const id = req.params.id;

      await livros.findByIdAndDelete(id);

      res.status(200).send({message: "Livro removido com sucesso"});
    } catch (erro) {
      if (erro instanceof mongoose.Error.CastError) {
        next(new NaoEncontrado("o ID do livro para ser excluido não foi encontrado"))
      }
    }
  }

  static listarLivroPorEditora = async (req, res, next) => {
    try {
      const editora = req.query.editora;

      const livrosResultado = await livros.find({"editora": editora});

      res.status(200).send(livrosResultado);
    } catch (erro) {
      next(erro)
    }
  }



}

export default LivroController