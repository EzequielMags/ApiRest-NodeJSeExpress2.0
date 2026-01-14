
import NaoEncontrado from "../erros/NaoEncontrado.js";
import { autores, livros } from "../models/index.js";
import mongoose from "mongoose";
class LivroController {

  static listarLivros = async (req, res, next) => {
    try {
      const buscaLivros = livros.find();

      req.resultado = buscaLivros

      next()
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

  static listarLivroPorFiltro = async (req, res, next) => {
    try {
      const busca = await processaBusca(req.query);

      if (busca !== null) {
        const livrosResultado = livros.find(busca).populate("autor");

        req.resultado = livrosResultado
  
        next()
      }  else {
        res.status(200).send([])
      }

    } catch (erro) {
      next(erro)
    }
  }

}

async function processaBusca(req) {
   // primeira solução com regex
      // const regexTitulo = new RegExp(titulo, "i")
      // const regexEditora = new RegExp(editora, "i")
      const { editora, titulo, minPaginas, maxPaginas, nomeAutor } =  req
     
      let busca = {}
      
      // segunda solução com regex
      if (editora) busca.editora = { $regex: editora, $options: "i" } 
      if (titulo) busca.titulo = { $regex: titulo, $options: "i"}

    if (minPaginas || maxPaginas) busca.numeroPaginas = {
        $gte: minPaginas || 0,
        $lte: maxPaginas || 5000
    }

    if (nomeAutor) {
      const autor = await autores.findOne({ nome: nomeAutor }) 
      if (autor !== null) {
        busca.autor = autor._id
      } else {
        busca = null
      }

    }

    return busca
}
export default LivroController