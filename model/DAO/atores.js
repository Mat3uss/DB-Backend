/********************************
 * Objetivo: Cria a interação com o Banco de dados MySQL para fazer o CRUD de Filmes
 * Data: 09/04/2024
 * Autor: Matheus Zanoni
 * Versão: 1.0
 *******************************/

// Import da biblioteca do prisma client
const { PrismaClient } = require ('@prisma/client')

// Instaciando o o bjeto prisma com as caracteristicas do prisma client
const prisma = new PrismaClient();

// Inserir um novo filme
const insertAtor = async (dadosAtores) => {

    try {

        let sql
        
        if(dadosAtores.data_falecimento == null || dadosAtores.data_falecimento == '' || dadosAtores.data_falecimento == undefined){
            sql = `insert into tbl_atores (nome, foto ,biografia, data_nascimento, data_falecimento) values ('${dadosAtores.nome}', '${dadosAtores.foto}', '${dadosAtores.biografia}', '${dadosAtores.data_nascimento}', null)`
        }else{
            sql = `insert into tbl_atores (nome, foto ,biografia, data_nascimento, data_falecimento) values ('${dadosAtores.nome}', '${dadosAtores.foto}', '${dadosAtores.biografia}', '${dadosAtores.data_nascimento}', '${dadosAtores.data_falecimento}')`
        }
        
        let resultStatus = await prisma.$executeRawUnsafe(sql)
        if(resultStatus)
            return true
        else
            return false

    } catch (error) {
        return false
    }

}

const selectAllAtors = async function(){

      // Script sql para listar todos os registros
      let sql = 'select * from tbl_atores order by id desc';

      // $queryRawUnsafe(sql)  = Encaminha apenas a variável
      // $queryRaw('select * from tbl_atores) = Encaminha o script do banco 
  
      // Executa o script no banco de dados e recebe o retorno dos dados da variavel rsAtores
      let rsAtores = await prisma.$queryRawUnsafe(sql)
       // Para usar await a função necessita ser async(async function)
  
      // Tratamento de erro para retornar dados ou retornar false
       if(rsAtores.length > 0)
       return rsAtores;
       else
          return false
  
}
const selectAtorsById = async function(id){
    try {
        // Realiza a busca do ator pelo ID
        let sql = `select * from tbl_atores where id = ${id}`;
    
        // Executa no banco de dados o script sql
        let rsAtores = await prisma.$queryRawUnsafe(sql);

            return rsAtores;
    
        } catch (error) {
            return false;
            
        }
}

const deleteAtorsById = async function(id){
    try {
        let sql = `delete from tbl_atores where id = ${id}`

        let rsAtores = await prisma.$queryRawUnsafe(sql);
        return rsAtores;
        
    } catch (error) {
        return false
        
    }
}


const selectIdAtor = async function(){
    try {

        let sql = `select CAST(last_insert_id() as DECIMAL) as id from tbl_atores limit 1`
    

        console.log(sql)

        let atorId = await prisma.$queryRawUnsafe(sql)
         return atorId
        } catch (error) {
            return false
            
        }   
}
module.exports = {
    selectAllAtors, 
    selectAtorsById,
    insertAtor,
    deleteAtorsById,
    selectIdAtor
}
