# Awesome Project Build with TypeORM

Steps to run this project:

1. Run `npm i` command
2. Setup database settings inside `ormconfig.json` file
3. Run `npm start` command

END POINTS
Rotas de `clientes`(/clientes):

 - GET:  '/' Consulta todos os clientes 
 exemplo: `http://localhost:3000/clientes`
 
  - GET: '/search/:index', Consulta cliente pelo nome ou id
exemplo: `http://localhost:3000/clientes/search/{fullname/id}`

- GET: '/relation', Exibe relação de clientes e cidades
exemplo: `http://localhost:3000/relation`

- POST: '/', Adiciona um cliente novo
exemplo: `http://localhost:3000/clientes`

JSON {
"fullname": "Edson Sousa",
"gender": "Masculino",
"birthday": "1992/07/16",
"age": "28",
"city": 22
}

 - PUT: '/:id', Atualiza os dados de um cliente
 exemplo: `http://localhost:3000/clientes/{id}`
 JSON = POST/clientes
 
 - DELETE: '/:id',  Remove um cliente
 exemplo: `http://localhost:3000/clientes/{id}`




