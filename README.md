# Projeto Portfólio Backend

<p align="left">
  <img alt="Node.js" src="https://img.shields.io/badge/Node.js-20.x-green?logo=node.js" />
  <img alt="Express" src="https://img.shields.io/badge/Express.js-4.x-blue?logo=express" />
  <img alt="Docker" src="https://img.shields.io/badge/Docker-ready-blue?logo=docker" />
  <img alt="License: MIT" src="https://img.shields.io/badge/License-MIT-yellow.svg" />
  <img alt="Status" src="https://img.shields.io/badge/status-em%20desenvolvimento-orange" />
</p>

Backend para extração e disponibilização de badges da Credly via API REST.

## 🚀 Tecnologias Utilizadas
- Node.js (ES Modules)
- Express
- CORS
- node-fetch
- Docker & Docker Compose

## 📦 Instalação Local

1. **Clone o repositório:**
   ```sh
   git clone <URL_DO_REPOSITORIO>
   cd projeto-portifolio-backend
   ```
2. **Instale as dependências:**
   ```sh
   npm install
   ```
3. **Configure variáveis de ambiente (opcional):**
   Crie um arquivo `.env` se necessário.
4. **Inicie o servidor:**
   ```sh
   npm start
   ```

O backend estará disponível em: [http://localhost:3001](http://localhost:3001)

## 🐳 Executando com Docker Compose

1. **Build e start:**
   ```sh
   docker-compose up --build
   ```
2. **Acesse:**
   [http://localhost:3001](http://localhost:3001)

## 🔗 Endpoints da API

### `GET /api/badges`
Retorna um array de badges extraídos da Credly.

**Exemplo de resposta:**
```json
[
  {
    "name": "Badge Name",
    "description": "Descrição do badge",
    "image": "https://...",
    "issued": "2024-01-01"
  }
]
```

### Respostas de Erro
- `404`: Rota de API não encontrada
- `200` com array vazio: Falha ao buscar badges

## 🛠️ Estrutura do Projeto
```
projeto-portifolio-backend/
  ├── credly-scraper/
  │   ├── scraper.js
  │   └── server.js
  ├── server.js
  ├── Dockerfile
  ├── docker-compose.yml
  └── README.md
```

## 📝 Boas Práticas
- Código modular e documentado
- Uso de imagens Docker leves
- Variáveis de ambiente centralizadas
- Pronto para deploy em containers

## 📄 Licença
Este projeto está sob a licença MIT. 
