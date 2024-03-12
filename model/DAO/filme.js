// ASYNC OBRIGATORIO
//funcao para inserir um filme no banco de dados


// função que faz o import da biblioteca do prisma client para manipular scripts SQL
const {PrismaClient} = require('@prisma/client');


// Instancia d classe PrismaClient 
const prisma = new PrismaClient();

const insertFilme = async function(dadosFilme){
    
    try {
        
    let sql = `insert into tbl_filme ( nome,
                                        sinopse,
                                        duracao,
                                        data_lancamento,
                                        data_relancamento,
                                        foto_capa,
                                        valor_unitario
        ) values (
                                        '${dadosFilme.nome}',
                                        '${dadosFilme.sinopse}',
                                        '${dadosFilme.duracao}',
                                        '${dadosFilme.data_lancamento}',
                                        '${dadosFilme.data_relancamento}',
                                        '${dadosFilme.foto_capa}',
                                        '${dadosFilme.valor_unitario}'


        )`;
console.log(sql)
        //$executeRawUnsafe serve para executar scripts sem retorno de dados
            //(insert, update e delete)
        //$queryRawUnsafe() - serve para executar scripts com retorno de dados (select)

    
        let result = await prisma.$executeRawUnsafe(sql);

        if (result)
            return true
        else
            return false;

        } catch (error) {
            console.log(error)
            return false 

        }

}

//funcao para atualizar um filme no banco de dados
const updateFilme = async function(){

}

//função para excluir um filme no banco de dodos
const deleteFilme = async function (){

}

const selectIdFilme = async function (){
    
    try {

        let sql = `select CAST(last_insert_id() as DECIMAL) as id from tbl_filme limit 1`
    
        let filmeId = await prisma.$queryRawUnsafe(sql)
         return filmeId
        } catch (error) {
            return false
            
        }   
    }
    
//função para listar todos os filmes do banco de dados
const selectAllFilmes = async function(){

    try {

        let sql = 'select * from tbl_filme';
        //Executa o script SQL no BD e recebe o retorno dos dados
    let rsFilmes = await prisma.$queryRawUnsafe(sql);
    
    return rsFilmes;
    } catch (error) {
        return false;
    }
 
}
  

const selectByNome = async function (nome){
 
    try {

    let sql = `select * from tbl_filme where nome LIKE "%${nome}%"`
    let rsFilmes = await prisma.$queryRawUnsafe(sql);

        return rsFilmes;
    } catch (error) {
        return false
    }
    
}

// função para buscar um filme no banco de dados filtrando pelo id 
const selectByIdFilme = async function (id){

    try {
        
    //script sql para filtrar pelo id
    let sql = `select * from tbl_filme where id = ${id}`;
    //executa o sql no banco de dados
    let rsFilme = await prisma.$queryRawUnsafe(sql);

    return rsFilme;

    } catch (error) {
        return false
    }
}    


module.exports = {
    insertFilme,
    updateFilme,
    deleteFilme,
    selectAllFilmes,
    selectByIdFilme,
    selectByNome
}