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
//app importa funcoes


const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();

// Cria um objeto do tipo JSON para receber os dados via body nas requisições POST ou PUT
const bodyParserJSON = bodyParser.json();

//request - Receber dados
//response - Devolve dados

app.use((request,response,next) =>{
    response.header('Acess-Control-Allow-Origin','*');
    response.header('Acess-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    app.use(cors())
    
    next();
});


/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    // Import dos arquivos da controller do projeto 
    const controllerFilmes = require ('./controller/controller_filme.js');

    const controllerAtores = require('./controller/controller_atores.js')

    const controllerDiretores = require('./controller/controller_diretor.js')

    const controllerGeneros = require('./controller/controller_generos.js')
    
    const controllerClassificacao = require('./controller/controller_classificacao.js')

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


// Criando um objeto para controlar a chegada dos dados da requisição em formato JSON 
const bodyParserJson = bodyParser.json();



// FILMES

app.get('/v2/acmefilmes/filmes', cors(),async function (request,response,next){

    // chama a função da controller para retornar os filmes;
    let dadosFilmes = await controllerFilmes.getListarFilmes();

    // validação para retornar o Json dos filmes ou retornar o erro 404;
    if(dadosFilmes){
        response.json(dadosFilmes);
        response.status(200);
    }else{
        response.json({message: 'Nenhum registro foi encontrado'});
        response.status(404);
    }
});

app.get('/v1/acmefilmes/filmeNome', cors(), async function(request,response,next){

    let nomeFilme = request.query.nome
    let filmeNome = await controllerFilmes.getBuscarFilmeNome(nomeFilme)

        response.json(filmeNome);
        response.status(filmeNome.status_code)
} )

app.get('/v2/acmefilmes/filme/:id', cors(), async function(request,response,next){

    // recebe o id da requisição
    let idFilme = request.params.id

    //encaminha o id para a acontroller buscar o filme
    let dadosFilme = await controllerFilmes.getBuscarFilme(idFilme);

    response.status(dadosFilme.status_code);
    response.json(dadosFilme);
})

app.post('/v2/acmefilmes/filme', cors(), bodyParserJson, async function (request, response,next ){

//  Api reebe o content-tye (API DEVE RECEBER SOMENTE application/json)
    let contentType = request.headers['content-type'];
    

    // recebe o que chegar no corpo da requisição e guardar nessa variável local
    let dadosBody = request.body;
    // encaminha os dados para a controller enviar para o DAO
    let resultDadosNovoFilme = await controllerFilmes.setInserirNovoFilme(dadosBody, contentType);


    response.status(resultDadosNovoFilme.status_code);
    response.json(resultDadosNovoFilme);

} )

app.delete('/v1/acmefilmes/deleteFilme/:id', cors (), async function (request,response,next){

    let idFilme = request.params.id

    let dadosFilme = await controllerFilmes.setExcluirFilme(idFilme);
    
    response.status(dadosFilme.status_code);
    response.json(dadosFilme);
})

app.put('/v1/acmefilmes/updateFilme/:id', cors(), bodyParserJson, async function(request,response,next){

    let idFilme = request.params.id
    let contentType = request.headers['content-type'];
    let dadosBody = request.body

    let resultUpdateFilme = await controllerFilmes.setAtualizarFilme(idFilme, dadosBody, contentType);

    response.status(resultUpdateFilme.status_code)
    response.json(resultUpdateFilme)

    
} )
// FILMES

//   ATORES
app.get('/v3/acmefilmes/atores', cors(), async function(request, response, next){

    // Chama a função para retornar os dados do filme
    let dadosAtores = await controllerAtores.getListarAtores();

    // Validação para verificar se existem dados
    if(dadosAtores){
        response.json(dadosAtores)
        response.status(200);
    }else{
        response.json({message: 'Nenhum registro encontrado'})
        response.status()
    }
});

app.get('/v3/acmefilmes/atores/:id', cors(), async function(request, response, next){
  // Recebe o id da requisição 
  let idAtores = request.params.id;

  // Solicita para a controller o ator filtrando pelo id
  let dadosAtores = await controllerAtores.getListarAtoresById(idAtores);

   response.status(dadosAtores.status_code);
   response.json(dadosAtores);
 
});

app.delete('/v3/acmefilmes/atores/:id', cors(), async function(request, response, next){

  let idAtores = request.params.id

  let resultDados = await controllerAtores.setDeleteAtor(idAtores);

  response.status(resultDados.status_code);
  response.json(resultDados);
});


app.post('/v2/acmefilmes/atores/', cors(), bodyParserJson, async (request, response, next) => {

    let contentType = request.headers['content-type']
    let dadosBody = request.body
    let resultDados = await controllerAtores.setInserirNovoAtor(dadosBody, contentType)
    response.status(resultDados.status_code);
    response.json(resultDados)

})

// DIRETORES

app.get('/v3/acmefilmes/diretores', cors(), async function(request, response, next){

    // Chama a função para retornar os dados do genero
    let dadosDiretor = await controllerDiretor.getListarDiretores();

    // Validação para verificar se existem dados
    if(dadosDiretor){
        response.json(dadosDiretor)
        response.status(200);
    }else{
        response.json({message: 'Nenhum registro encontrado'})
        response.status()
    }
});

app.get('/v3/acmefilmes/diretores/:id', cors(), async function(request, response, next){
  // Recebe o id da requisição 
  let idDiretor = request.params.id;

  // Solicita para a controller o ator filtrando pelo id
  let dadosDiretor = await controllerDiretor.getListarDiretorById(idDiretor);

   response.status(dadosDiretor.status_code);
   response.json(dadosDiretor);
 
});

app.post('/v3/acmefilmes/insertdiretor', cors(), bodyParserJSON, async function(request, response, next){

    // Recebe o content-type da requisição (API deve receber application/json )
   let contentType = request.headers['content-type'];

   // Recebe os dados encaminhados na requisição do body (JSON)
   let dadosBody = request.body;

   
   // Encaminha os dados da requisição para a controller enviar para o banco de dados
   let resultDados = await controllerDiretor.setInserirNovoDiretor(dadosBody, contentType);

   response.status(resultDados.status_code);
   response.json(resultDados);
});

app.delete('/v3/acmefilmes/diretores/:id', cors(), async function(request, response, next){

    let idDiretores = request.params.id

    let resultDados = await controllerDiretor.setDeleteDiretor(idDiretores);

    response.status(resultDados.status_code);
    response.json(resultDados);
});

app.put('/v3/acmefilmes/updatediretores/:id', cors(), bodyParserJSON, async function(request,response, next){
    let idDiretor = request.params.id
    let contentType = request.headers['content-type']
    let dadosBody = request.body

    let dadosDiretor = await controllerDiretor.setUpdateDiretor(idDiretor, contentType, dadosBody);

    response.status(dadosDiretor.status_code);
    response.json(dadosDiretor);
});


// DIRETORES

// GENEROS

app.get('/v3/acmefilmes/generos', cors(), async function(request, response, next){

    // Chama a função para retornar os dados do genero
    let dadosGenero = await controllerGeneros.getListarGenero();

    // Validação para verificar se existem dados
    if(dadosGenero){
        response.json(dadosGenero)
        response.status(200);
    }else{
        response.json({message: 'Nenhum registro encontrado'})
        response.status()
    }
});

app.get('/v3/acmefilmes/generos/:id', cors(), async function(request, response, next){
  // Recebe o id da requisição 
  let idGeneros = request.params.id;

  // Solicita para a controller o ator filtrando pelo id
  let dadosGenero = await controllerGeneros.getListarGenerosById(idGeneros);

   response.status(dadosGenero.status_code);
   response.json(dadosGenero);
 
});

app.delete('/v3/acmefilmes/generos/:id', cors(), async function(request, response, next){

  let idGeneros = request.params.id

  let resultDados = await controllerGeneros.setDeleteGenero(idGeneros);

  response.status(resultDados.status_code);
  response.json(resultDados);
});

app.post('/v3/acmefilmes/genero', cors(), bodyParserJson, async function(request, response, next){

  // Recebe o content-type da requisição (API deve receber application/json )
 let contentType = request.headers['content-type'];

 // Recebe os dados encaminhados na requisição do body (JSON)
 let dadosBody = request.body;

 
 // Encaminha os dados da requisição para a controller enviar para o banco de dados
 let resultDados = await controllerGeneros.setInserirNovoGenero(dadosBody, contentType);

 response.status(resultDados.status_code);
 response.json(resultDados);
})

app.put('/v3/acmefilmes/generos/:id', cors(), bodyParserJson, async function(request,response, next){
  let idGeneros = request.params.id
  let contentType = request.headers['content-type']
  let dadosBody = request.body

  let dadosGenero = await controllerGeneros.setUpdateGenero(idGeneros, contentType, dadosBody);

  response.status(dadosGenero.status_code);
  response.json(dadosGenero)
})
// GENEROS

// CLASSIFICAÇÃO

app.get('/v3/acmefilmes/classificacao', cors(), async function(request,response,next){

    let dadosClassificacao = await controllerClassificacao.getListarClassficacao();

    // Validação para verificar se existem dados
    if(dadosClassificacao){
        response.json(dadosClassificacao)
        response.status(200);
    }else{
        response.json({message: 'Nenhum registro encontrado'})
        response.status()
    }
})
app.get('/v3/acmefilmes/classificacao/:id', cors(), async function(request,response,next){

    let idClassificacao = request.params.id

    let dadosClassificacao = await controllerClassificacao.getListarClassficacaoById(idClassificacao)

    response.status(dadosClassificacao.status_code)
    response.json(dadosClassificacao)
})

app.delete('/v3/acmefilmes/classificacao/:id', cors(), async function(request, response, next){
    let idClassificacao = request.params.id

    let resultDados = await controllerClassificacao.setDeleteClassficacao(idClassificacao);

    response.status(resultDados.status_code);
    response.json(resultDados)
})
app.post('/v3/acmefilmes/classificacao', cors(), bodyParserJson, async function(request, response, next){

    // Recebe o content-type da requisição (API deve receber application/json )
   let contentType = request.headers['content-type'];
  
   // Recebe os dados encaminhados na requisição do body (JSON)
   let dadosBody = request.body;
  
   
   // Encaminha os dados da requisição para a controller enviar para o banco de dados
   let resultDados = await controllerClassificacao.setInserirNovaClassificacao(dadosBody, contentType);
  
   response.status(resultDados.status_code);
   response.json(resultDados);
  })


app.put('/v3/acmefilmes/classificacao/:id', cors(), bodyParserJson, async function(request,response, next){
    let idClassificacao = request.params.id
    let contentType = request.headers['content-type']
    let dadosBody = request.body
  
    let dadosClassificacao = await controllerClassificacao.setUpdateClassificacao(idClassificacao, contentType, dadosBody);
  
    response.status(dadosClassificacao.status_code);
    response.json(dadosClassificacao)
  })

// CLASSIFICAÇÃO

app.listen('8080', function(){
    console.log('API FUNCIONANDO')
})