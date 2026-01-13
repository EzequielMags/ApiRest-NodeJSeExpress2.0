# API Node.js com Express e MongoDB

API REST desenvolvida com Node.js, Express e MongoDB para gerenciamento de livros e autores. Este projeto implementa um sistema completo de tratamento de erros personalizado e segue boas práticas de desenvolvimento.

## 📋 Sobre o Projeto

Esta API permite realizar operações CRUD (Create, Read, Update, Delete) para duas entidades principais:
- **Autores**: Gerenciamento de informações sobre autores
- **Livros**: Gerenciamento de livros com relacionamento com autores

O projeto implementa um sistema robusto de tratamento de erros com classes personalizadas que facilitam o tratamento e padronização de respostas de erro.

## 🚀 Tecnologias Utilizadas

- **Node.js**: Runtime JavaScript
- **Express**: Framework web para Node.js
- **MongoDB**: Banco de dados NoSQL
- **Mongoose**: ODM (Object Data Modeling) para MongoDB
- **dotenv**: Gerenciamento de variáveis de ambiente
- **nodemon**: Ferramenta de desenvolvimento para reiniciar automaticamente o servidor

## 📁 Estrutura do Projeto

```
├── src/
│   ├── app.js                    # Configuração principal do Express
│   ├── config/
│   │   └── dbConnect.js          # Configuração da conexão com MongoDB
│   ├── controllers/
│   │   ├── autoresController.js  # Lógica de negócio para autores
│   │   └── livrosController.js   # Lógica de negócio para livros
│   ├── erros/
│   │   ├── ErroBase.js           # Classe base para erros personalizados
│   │   ├── NaoEncontrado.js      # Erro 404 - Recurso não encontrado
│   │   ├── RequisicaoIncorreta.js # Erro 400 - Requisição inválida
│   │   └── ErroValidacao.js      # Erro 422 - Erro de validação
│   ├── middlewares/
│   │   ├── manipulador404.js     # Middleware para rotas não encontradas
│   │   └── manipuladorDeErros.js # Middleware centralizado de tratamento de erros
│   ├── models/
│   │   ├── Autor.js              # Schema do modelo Autor
│   │   └── Livro.js              # Schema do modelo Livro
│   └── routes/
│       ├── index.js               # Configuração de rotas
│       ├── autoresRoutes.js       # Rotas de autores
│       └── livrosRoutes.js       # Rotas de livros
├── server.js                      # Arquivo de inicialização do servidor
└── package.json                   # Dependências e scripts do projeto
```

## 🔧 Pré-requisitos

Antes de começar, você precisa ter instalado em sua máquina:
- [Node.js](https://nodejs.org/) (versão 14 ou superior)
- [MongoDB](https://www.mongodb.com/) (local ou MongoDB Atlas)
- [npm](https://www.npmjs.com/) ou [yarn](https://yarnpkg.com/)

## 📦 Instalação

1. Clone o repositório ou navegue até a pasta do projeto:
```bash
cd "caminho/para/o/projeto"
```

2. Instale as dependências:
```bash
npm install
```

3. Crie um arquivo `.env` na raiz do projeto com as seguintes variáveis:
```env
PORT=3000
STRING_CONEXAO_DB=mongodb://localhost:27017/nome-do-banco
```

**Exemplo para MongoDB local:**
```env
PORT=3000
STRING_CONEXAO_DB=mongodb://localhost:27017/alura-node
```

**Exemplo para MongoDB Atlas:**
```env
PORT=3000
STRING_CONEXAO_DB=mongodb+srv://usuario:senha@cluster.mongodb.net/nome-do-banco
```

## 🏃 Como Executar

### Modo Desenvolvimento

Para executar o projeto em modo desenvolvimento com hot-reload (usando nodemon):

```bash
npm run dev
```

O servidor será iniciado na porta definida na variável `PORT` (padrão: 3000) e estará disponível em:
```
http://localhost:3000
```

### Modo Produção

Para executar em modo produção:

```bash
node server.js
```

## 📚 Endpoints da API

### Autores

| Método | Endpoint | Descrição |
|--------|----------|-----------|
| GET | `/autores` | Lista todos os autores |
| GET | `/autores/:id` | Busca um autor por ID |
| POST | `/autores` | Cria um novo autor |
| PUT | `/autores/:id` | Atualiza um autor existente |
| DELETE | `/autores/:id` | Remove um autor |

### Livros

| Método | Endpoint | Descrição |
|--------|----------|-----------|
| GET | `/livros` | Lista todos os livros (com informações do autor) |
| GET | `/livros/:id` | Busca um livro por ID |
| GET | `/livros/busca?editora=nome` | Busca livros por editora |
| POST | `/livros` | Cria um novo livro |
| PUT | `/livros/:id` | Atualiza um livro existente |
| DELETE | `/livros/:id` | Remove um livro |

### Exemplos de Requisições

#### Criar um Autor
```bash
POST /autores
Content-Type: application/json

{
  "nome": "Machado de Assis",
  "nacionalidade": "Brasileiro"
}
```

#### Criar um Livro
```bash
POST /livros
Content-Type: application/json

{
  "titulo": "Dom Casmurro",
  "autor": "ID_DO_AUTOR",
  "editora": "Editora XYZ",
  "numeroPaginas": 256
}
```

#### Buscar Livros por Editora
```bash
GET /livros/busca?editora=Editora XYZ
```

## 🛡️ Sistema de Tratamento de Erros

O projeto implementa um sistema robusto de tratamento de erros com classes personalizadas:

### Classes de Erro

1. **ErroBase**: Classe base para todos os erros personalizados
2. **NaoEncontrado (404)**: Quando um recurso não é encontrado
3. **RequisicaoIncorreta (400)**: Quando a requisição está malformada
4. **ErroValidacao (422)**: Quando há erros de validação do Mongoose

### Tratamento Automático

- **CastError do Mongoose**: IDs inválidos são automaticamente convertidos para `NaoEncontrado`
- **ValidationError do Mongoose**: Erros de validação são tratados como `ErroValidacao`
- **Rotas não encontradas**: Retornam erro 404 através do `manipulador404`
- **Erros não tratados**: Retornam erro 500 genérico através de `ErroBase`

### Exemplo de Resposta de Erro

```json
{
  "messagem": "Id do Autor invalido",
  "status": 404
}
```

## 📝 Modelos de Dados

### Autor
```javascript
{
  id: String,
  nome: String (obrigatório),
  nacionalidade: String
}
```

### Livro
```javascript
{
  id: String,
  titulo: String (obrigatório),
  autor: ObjectId (referência ao modelo Autor, obrigatório),
  editora: String (obrigatório),
  numeroPaginas: Number
}
```

## 🔍 Funcionalidades Implementadas

- ✅ CRUD completo para Autores e Livros
- ✅ Relacionamento entre Livros e Autores (populate)
- ✅ Busca de livros por editora
- ✅ Tratamento centralizado de erros
- ✅ Validação de dados com Mongoose
- ✅ Conversão automática de CastError para NaoEncontrado
- ✅ Middleware para rotas não encontradas (404)

## 🧪 Testando a API

Você pode testar a API usando ferramentas como:
- [Postman](https://www.postman.com/)
- [Insomnia](https://insomnia.rest/)
- [Thunder Client](https://www.thunderclient.com/) (extensão do VS Code)
- `curl` (linha de comando)

### Exemplo com curl

```bash
# Listar todos os autores
curl http://localhost:3000/autores

# Criar um autor
curl -X POST http://localhost:3000/autores \
  -H "Content-Type: application/json" \
  -d '{"nome": "José de Alencar", "nacionalidade": "Brasileiro"}'
```

## 📄 Licença

Este projeto foi desenvolvido como parte do curso da Alura sobre Node.js.

## 👨‍💻 Autor

Desenvolvido durante o curso "NodeJS lidando com buscas, filtros, paginação em uma API" da Alura.

---

**Nota**: Certifique-se de que o MongoDB está rodando antes de iniciar o servidor. Se estiver usando MongoDB Atlas, verifique se a string de conexão está correta e se o IP está liberado no firewall.
