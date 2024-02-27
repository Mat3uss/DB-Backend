/**********************************************************************************************************************************
* Objetivo: Arquivo para realizar as requisições                                                                                  *
* Data: 30/01/24                                                                                                                  *
* Autor: Matheus Zanoni
* Versão: 1.0                                                                                                                     * 
***********************************************************************************************************************************/

/***************************************************************************************************
 *  Para realizar a conexão com o Banco de dados precisamos utilizar uma dependência
 *     - SEQUELIZE ORM
 *     - PRISMA ORM
 *     - FASTFY ORM
 *  
 * - Prisma
 *      npm install prisma --save
 *      npm install @prisma/client --save
 * 
 *      Após a instalação do prisma, devemos rodar o comando abaixo para incializar o prisma
 *      npx prisma init
 **************************************************************************************************/

const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')

const app = express()


app.use((request, response, next) => {

    response.header('Access-Control-Allow-Origin', '*')
    response.header('Access-Control-Allow-Methods', 'GET, POST')
    app.use(cors)

    next()

})

// Cria um objeto do TIPO JSON PARA RECEBR OS DADOS VIA BODY NAS REQUISIÇÔES POST OU PUT
const bodyParserJSON = bodyParser.json();

/******************************** Imports de arquivos e bibliotecas do Projeto *********************************/

    const controllerFilmes = require('./controller/controller_filme.js')

/***************************************************************************************************************/

//EndPoint: Retorna os dados do arquivo JSON
app.get('/AcmeFilmes/filmes', async(request, response, next) => {

    response.status(200)
    response.json(functions.listarFilmes())
})

//EndPoint: Retorna os dados do Banco de Dados
app.get('/v2/acmefilmes/filmes', cors(), async function(request, response, next){
    
    // Chama a função para retornar os dados do filme
    let dadosFilmes = await controllerFilmes.getListarFilmes()

    // Validação para verificar se existem dados
    if (dadosFilmes){
        response.status(200)
        response.json(dadosFilmes)
    } else {
        response.status(404)
        response.json({message: 'Nenhum registro encontrado'})
        
    }

})

//EndPoint: Retorna os dados do filme filtrando pelo ID
app.get('/v2/acmefilmes/filme/:id', cors(), async function(request, response, next){
    // Recebe o ID da requisição do Filme
    let idFilme = request.params.id
    
    // Solicita para a controller o Filme filtrando pelo ID
    let dadosFilme = await controllerFilmes.getBuscarFilme(idFilme)
    console.log(dadosFilme)

    response.status(dadosFilme)
    response.json(dadosFilme)
})

// mariana alves de sousa !! 
// matheusssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssss
// deixaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
// de ser chato #ficalegalmatheus *emoji de joinha*

// EndPoint: Inserir novos filmes no BD

// Não esquecer de colocar o bodyparserJSOn que é quem define o formato de chegada dos
app.post('/v2/acmefilmes/filme', cors(), bodyParserJSON, async function(request, response, next){
    // Recebe os dados encaminhados na requisição no body( JSON)
    let dadosBody = request.body

    let resultDados = await controllerFilmes.setInserirNovoFilme(bodyParser)

    response.status(resultDados.status_code)
    response.json(resultDados)
})

app.listen('8080', function(){
    console.log('API funcionando!!!')
})