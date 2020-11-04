# Awesome Project Build with TypeORM

Steps to run this project:

1. Run `npm i` command
2. Setup database settings inside `ormconfig.json` file
3. Run `npm start` command

END POINTS
Rotas de `clientes`( /clientes ):

 - GET:  '/' Consulta todos os clientes <br />
 exemplo: `http://localhost:3000/clientes`
 
  - GET: '/search/:index', Consulta cliente pelo nome ou id <br />
exemplo: `http://localhost:3000/clientes/search/{João Paulo / 10}`

- GET: '/relation', Exibe relação de clientes e cidades <br />
exemplo: `http://localhost:3000/relation`

- POST: '/', Adiciona um cliente novo <br />
exemplo: `http://localhost:3000/clientes`

JSON {
"fullname": "Edson Sousa",
"gender": "Masculino",
"birthday": "1992/07/16",
"age": "28",
"city": 22 //id da cidade
}

 - PUT: '/:id', Atualiza os dados de um cliente <br />
 exemplo: `http://localhost:3000/clientes/{id}`
 JSON = POST/clientes
 
 - DELETE: '/:id',  Remove um cliente <br />
 exemplo: `http://localhost:3000/clientes/{id}`
 
 Rotas de `cidades` ( /cidades )
 
 - GET: '/:nome', Consulta uma cidade pelo nome <br />
 exemplo: `http://localhost:3000/cidades/Leme`
 
 -GET: '/', Consulta todas as cidades < br/>
 exemplo: `http://localhost:3000/cidades/`
 
 - GET: '/estado/:nome', Consulta todas as cidades relacionadas a um estado <br />
 exemplo: `http://localhost:3000/cidades/estado/São Paulo`
 
 - DELETE: '/:id', Remove uma cidade <br />
 exemplo:  `http://localhost:3000/cidades/{id}`
 
 - PUT: '/:id', Atualiza os dados de uma cidade <br />
 exemplo: `http://localhost:3000/cidades/{id}`
 JSON {
    "name": "São Paulo",
    "state": 1 //id do estado
}

Rotas de `estados` ( /estados ) < br/>

- GET: '/', Consulta todos os estados
exemplo: `http://localhost:3000/estados/`

- GET '/load' Busca os estados em uma API externa e cadastra no sistema
exemplo: `http://localhost:3000/cidades/load`
 
 - Modelagem do Banco
 
 ![modelagem](https://user-images.githubusercontent.com/31168253/98177514-8b601b00-1ed9-11eb-9fe7-90b86ec15568.png)

 
 
 
 




