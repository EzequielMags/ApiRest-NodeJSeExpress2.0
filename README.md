# API Node.js com Express e MongoDB

API REST desenvolvida com Node.js, Express e MongoDB para gerenciamento de livros e autores. Este projeto implementa funcionalidades avançadas de busca, filtros, paginação e um sistema completo de tratamento de erros personalizado, seguindo boas práticas de desenvolvimento.

## 📋 Sobre o Projeto

Esta API permite realizar operações CRUD (Create, Read, Update, Delete) para duas entidades principais:
- **Autores**: Gerenciamento de informações sobre autores
- **Livros**: Gerenciamento de livros com relacionamento com autores

### Funcionalidades Principais

- ✅ CRUD completo para Autores e Livros
- ✅ **Busca e Filtros Avançados**: Busca de livros por editora, título, número de páginas e nome do autor
- ✅ **Paginação**: Sistema de paginação com ordenação customizável
- ✅ **Relacionamentos**: Populate automático entre Livros e Autores
- ✅ **Tratamento de Erros**: Sistema robusto com classes personalizadas
- ✅ **Validação de Dados**: Validações no nível de schema com Mongoose
- ✅ **Middleware Reutilizável**: Middleware de paginação aplicável a múltiplas rotas

## 🚀 Tecnologias Utilizadas

- **Node.js**: Runtime JavaScript
- **Express**: Framework web para Node.js
- **MongoDB**: Banco de dados NoSQL
- **Mongoose**: ODM (Object Data Modeling) para MongoDB
- **mongoose-autopopulate**: Plugin para popular automaticamente referências
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
│   │   └── livrosController.js   # Lógica de negócio para livros (com busca)
│   ├── erros/
│   │   ├── ErroBase.js           # Classe base para erros personalizados
│   │   ├── NaoEncontrado.js      # Erro 404 - Recurso não encontrado
│   │   ├── RequisicaoIncorreta.js # Erro 400 - Requisição inválida
│   │   └── ErroValidacao.js      # Erro 422 - Erro de validação
│   ├── middlewares/
│   │   ├── manipulador404.js     # Middleware para rotas não encontradas
│   │   ├── manipuladorDeErros.js # Middleware centralizado de tratamento de erros
│   │   └── paginar.js            # Middleware de paginação reutilizável
│   ├── models/
│   │   ├── Autor.js              # Schema do modelo Autor
│   │   ├── Livro.js              # Schema do modelo Livro (com validações)
│   │   ├── index.js              # Exportação centralizada dos models
│   │   └── validadorGlobal.js    # Validador global do Mongoose
│   └── routes/
│       ├── index.js               # Configuração de rotas
│       ├── autoresRoutes.js       # Rotas de autores
│       └── livrosRoutes.js       # Rotas de livros
├── server.js                      # Arquivo de inicialização do servidor
└── package.json                   # Dependências e scripts do projeto
```

## 🎓 Conceitos que Podem Ser Ensinados

Este projeto é ideal para ensinar os seguintes conceitos:

### 1. **Arquitetura MVC (Model-View-Controller)**
- Separação de responsabilidades entre Models, Controllers e Routes
- Organização de código em camadas

### 2. **RESTful API**
- Padrões de nomenclatura de rotas
- Métodos HTTP (GET, POST, PUT, DELETE)
- Status codes apropriados

### 3. **MongoDB e Mongoose**
- Schemas e Models
- Validações no nível de schema
- Relacionamentos entre documentos (References)
- Populate para trazer dados relacionados
- Queries com filtros e operadores ($regex, $gte, $lte)

### 4. **Busca e Filtros**
- Busca por múltiplos parâmetros de query
- Uso de regex para busca case-insensitive
- Filtros por range (min/max)
- Busca em documentos relacionados

### 5. **Paginação**
- Implementação de paginação com `skip()` e `limit()`
- Ordenação dinâmica com `sort()`
- Parâmetros de query para controle de paginação

### 6. **Middleware no Express**
- Criação de middlewares customizados
- Encadeamento de middlewares
- Passagem de dados entre middlewares (`req.resultado`)

### 7. **Tratamento de Erros**
- Classes de erro personalizadas
- Herança em JavaScript (ES6)
- Middleware de erro centralizado
- Tratamento de erros do Mongoose (CastError, ValidationError)

### 8. **Validação de Dados**
- Validação com Mongoose validators
- Validação customizada com funções
- Enum para valores permitidos
- Mensagens de erro personalizadas

### 9. **ES6 Modules**
- Import/Export
- Módulos ES6 nativos

### 10. **Variáveis de Ambiente**
- Uso do dotenv
- Configuração sensível (strings de conexão)

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

| Método | Endpoint | Descrição | Query Parameters |
|--------|----------|-----------|------------------|
| GET | `/autores` | Lista todos os autores | `limite`, `pagina`, `ordenacao` |
| GET | `/autores/:id` | Busca um autor por ID | - |
| POST | `/autores` | Cria um novo autor | - |
| PUT | `/autores/:id` | Atualiza um autor existente | - |
| DELETE | `/autores/:id` | Remove um autor | - |

### Livros

| Método | Endpoint | Descrição | Query Parameters |
|--------|----------|-----------|------------------|
| GET | `/livros` | Lista todos os livros (com informações do autor) | `limite`, `pagina`, `ordenacao` |
| GET | `/livros/:id` | Busca um livro por ID | - |
| GET | `/livros/busca` | Busca livros com filtros | `editora`, `titulo`, `minPaginas`, `maxPaginas`, `nomeAutor`, `limite`, `pagina`, `ordenacao` |
| POST | `/livros` | Cria um novo livro | - |
| PUT | `/livros/:id` | Atualiza um livro existente | - |
| DELETE | `/livros/:id` | Remove um livro | - |

## 🔍 Funcionalidades de Busca e Filtros

### Busca de Livros (`/livros/busca`)

A rota de busca permite filtrar livros por múltiplos critérios:

#### Parâmetros de Busca:
- `editora`: Busca por editora (case-insensitive)
- `titulo`: Busca por título (case-insensitive)
- `minPaginas`: Número mínimo de páginas
- `maxPaginas`: Número máximo de páginas
- `nomeAutor`: Busca por nome do autor (busca o autor primeiro, depois filtra os livros)

#### Exemplos de Uso:

```bash
# Buscar livros por editora
GET /livros/busca?editora=Alura

# Buscar livros por título
GET /livros/busca?titulo=Node

# Buscar livros com número de páginas entre 100 e 500
GET /livros/busca?minPaginas=100&maxPaginas=500

# Buscar livros de um autor específico
GET /livros/busca?nomeAutor=Machado de Assis

# Combinar múltiplos filtros
GET /livros/busca?editora=Alura&minPaginas=200&maxPaginas=400
```

## 📄 Paginação

A paginação está disponível nas rotas de listagem (`/autores` e `/livros`) e na rota de busca (`/livros/busca`).

### Parâmetros de Paginação:
- `limite`: Número de itens por página (padrão: 5)
- `pagina`: Número da página (padrão: 1)
- `ordenacao`: Campo e ordem de ordenação no formato `campo:ordem` (padrão: `_id:1`)
  - `1` = ordem crescente
  - `-1` = ordem decrescente

### Exemplos de Uso:

```bash
# Listar primeira página com 5 itens
GET /livros?limite=5&pagina=1

# Listar segunda página com 10 itens
GET /livros?limite=10&pagina=2

# Ordenar por título em ordem crescente
GET /livros?ordenacao=titulo:1

# Ordenar por número de páginas em ordem decrescente
GET /livros?ordenacao=numeroPaginas:-1

# Combinar paginação e ordenação
GET /livros?limite=10&pagina=1&ordenacao=titulo:1
```

## 📝 Exemplos de Requisições

### Criar um Autor
```bash
POST /autores
Content-Type: application/json

{
  "nome": "Machado de Assis",
  "nacionalidade": "Brasileiro"
}
```

### Criar um Livro
```bash
POST /livros
Content-Type: application/json

{
  "titulo": "Dom Casmurro",
  "autor": "ID_DO_AUTOR_AQUI",
  "editora": "Alura",
  "numeroPaginas": 256
}
```

**Editoras permitidas:**
- Casa do Código
- Alura
- Deus é bom e o diabo n presta
- Dante

### Buscar Livros com Filtros e Paginação
```bash
GET /livros/busca?editora=Alura&minPaginas=100&limite=10&pagina=1&ordenacao=titulo:1
```

## 🛡️ Sistema de Tratamento de Erros

O projeto implementa um sistema robusto de tratamento de erros com classes personalizadas:

### Hierarquia de Erros

```
ErroBase (500)
├── NaoEncontrado (404)
├── RequisicaoIncorreta (400)
    └── ErroValidacao (422)
```

### Classes de Erro

1. **ErroBase**: Classe base para todos os erros personalizados
   - Status padrão: 500
   - Método `enviarReposta()` para padronizar respostas

2. **NaoEncontrado (404)**: Quando um recurso não é encontrado
   - Usado quando IDs não existem
   - Rotas não encontradas

3. **RequisicaoIncorreta (400)**: Quando a requisição está malformada
   - Parâmetros inválidos
   - Valores incorretos

4. **ErroValidacao (422)**: Quando há erros de validação do Mongoose
   - Campos obrigatórios faltando
   - Valores fora do enum
   - Validações customizadas falhando

### Tratamento Automático

- **CastError do Mongoose**: IDs inválidos são automaticamente convertidos para `RequisicaoIncorreta`
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

## 📊 Modelos de Dados

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
  autor: ObjectId (referência ao modelo Autor, obrigatório, autopopulate),
  editora: String (obrigatório, enum: ["Casa do Código", "Alura", "Deus é bom e o diabo n presta", "Dante"]),
  numeroPaginas: Number (validação: entre 10 e 5000)
}
```

### Validações Implementadas

- **Título do Livro**: Obrigatório
- **Autor do Livro**: Obrigatório, referência válida
- **Editora**: Obrigatória, deve estar no enum permitido
- **Número de Páginas**: Opcional, mas se fornecido deve estar entre 10 e 5000
- **Nome do Autor**: Obrigatório

## 🧪 Testando a API

Você pode testar a API usando ferramentas como:
- [Postman](https://www.postman.com/)
- [Insomnia](https://insomnia.rest/)
- [Thunder Client](https://www.thunderclient.com/) (extensão do VS Code)
- `curl` (linha de comando)

### Exemplos com curl

```bash
# Listar todos os autores (com paginação)
curl "http://localhost:3000/autores?limite=5&pagina=1"

# Criar um autor
curl -X POST http://localhost:3000/autores \
  -H "Content-Type: application/json" \
  -d '{"nome": "José de Alencar", "nacionalidade": "Brasileiro"}'

# Buscar livros por editora
curl "http://localhost:3000/livros/busca?editora=Alura"

# Buscar livros com filtros e paginação
curl "http://localhost:3000/livros/busca?minPaginas=100&maxPaginas=500&limite=10&pagina=1&ordenacao=titulo:1"
```

## 🎯 Pontos de Destaque para Ensino

### 1. Middleware Reutilizável
O middleware `paginar.js` demonstra como criar middlewares reutilizáveis que podem ser aplicados a múltiplas rotas, recebendo dados de middlewares anteriores através de `req.resultado`.

### 2. Processamento de Query Parameters
A função `processaBusca()` no `livrosController.js` mostra como processar múltiplos parâmetros de query e construir queries dinâmicas do Mongoose.

### 3. Herança de Classes
O sistema de erros demonstra herança em JavaScript ES6, com classes base e especializadas.

### 4. Populate Automático
O uso do plugin `mongoose-autopopulate` demonstra como automatizar o populate de referências.

### 5. Validação Customizada
O modelo `Livro` inclui validação customizada para número de páginas, mostrando como criar validadores além dos padrões do Mongoose.

## 📄 Licença

Este projeto foi desenvolvido como parte do curso da Alura sobre Node.js.

## 👨‍💻 Autor

Desenvolvido durante o curso "NodeJS lidando com buscas, filtros, paginação em uma API" da Alura.

---

**Nota**: Certifique-se de que o MongoDB está rodando antes de iniciar o servidor. Se estiver usando MongoDB Atlas, verifique se a string de conexão está correta e se o IP está liberado no firewall.
