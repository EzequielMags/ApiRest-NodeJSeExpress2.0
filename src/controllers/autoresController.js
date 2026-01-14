import mongoose from "mongoose";
import NaoEncontrado from "../erros/NaoEncontrado.js";
import { autores } from "../models/index.js";

class AutorController {

  static listarAutores = async(req, res, next) => {
    try {
      const autoresResultado =  autores.find();
      req.resultado = autoresResultado
      next()
      
  } catch (erro) {
     next(erro)
  }
  }

  static listarAutorPorId = async (req, res, next) => {
    
      try {
        const id = req.params.id;
  
        const autorResultado = await autores.findById(id);
        
        console.log(autorResultado)
        if (autorResultado === null) {
          next(new NaoEncontrado("Id invalido"))
        } else {
          res.status(200).send({message: "Autor encontrado com sucesso", autor: autorResultado})
        }
  
      } catch (erro) {
        if (erro instanceof mongoose.Error.CastError) {
          next(new NaoEncontrado("Id do Autor invalido"))
        } else {
          next(erro); //passa o erro para o middleware de erro
        }
      }
    }
  
  
    static cadastrarAutor = async (req, res, next) => {
      try {
        let autor = new autores(req.body);
  
        const autorResultado = await autor.save();
  
        res.status(201).send(autorResultado.toJSON());
      } catch (erro) {
        next(erro)
      }
    }
  

    static atualizarAutor = async (req, res, next) => {
      try {
        const id = req.params.id;
  
        await autores.findByIdAndUpdate(id, {$set: req.body});
  
        res.status(200).send({message: "Autor atualizado com sucesso"});
      } catch (erro) {
        if (erro instanceof mongoose.Error.CastError ){
          next(new NaoEncontrado("O ID do autor que será editado não encontrado"))
        } else {
          next(erro)
        }
      }
    }
  
    static excluirAutor = async (req, res, next) => {
      try {
        const id = req.params.id;
  
        await autores.findByIdAndDelete(id);
  
        res.status(200).send({message: "Autor removido com sucesso"});
      } catch (erro) {
        if (erro instanceof mongoose.Error.CastError ){
          next(new NaoEncontrado("O ID do autor será excluido não encontrado"))
        } else {
          next(erro)
        }
      }
    }
  

}

export default AutorController