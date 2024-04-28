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


const selectAllSexos = async function(){

    // Script sql para listar todos os registros
    let sql = 'select * from tbl_sexo order by id desc';

    // $queryRawUnsafe(sql)  = Encaminha apenas a variável
    // $queryRaw('select * from tbl_classificacao) = Encaminha o script do banco 

    // Executa o script no banco de dados e recebe o retorno dos dados da variavel rsFilmes
    let rsSexo = await prisma.$queryRawUnsafe(sql)
     // Para usar await a função necessita ser async(async function)

    // Tratamento de erro para retornar dados ou retornar false
     if(rsSexo.length > 0)
     return rsSexo;
     else
        return false

}

const selectSexoById = async function(id){
        try {
            // Realiza a busca da classificacao pelo ID
            let sql = `select * from tbl_sexo where id = ${id}`;
        
            // Executa no banco de dados o script sql
            let rsSexo = await prisma.$queryRawUnsafe(sql);

                return rsSexo;
        
            } catch (error) {
                return false;
                
            }
    }




module.exports = {
    selectAllSexos,
    selectSexoById
}