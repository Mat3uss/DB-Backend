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


const selectAllNacionalidades = async function(){

    // Script sql para listar todos os registros
    let sql = 'select * from tbl_nacionalidade order by id desc';

    // $queryRawUnsafe(sql)  = Encaminha apenas a variável
    // $queryRaw('select * from tbl_classificacao) = Encaminha o script do banco 

    // Executa o script no banco de dados e recebe o retorno dos dados da variavel rsFilmes
    let rsNacionalidade = await prisma.$queryRawUnsafe(sql)
     // Para usar await a função necessita ser async(async function)

    // Tratamento de erro para retornar dados ou retornar false
     if(rsNacionalidade.length > 0)
     return rsNacionalidade;
     else
        return false

}

const selectNacionalidadeById = async function(id){
        try {
            // Realiza a busca da classificacao pelo ID
            let sql = `select * from tbl_nacionalidade where id = ${id}`;
        
            // Executa no banco de dados o script sql
            let rsNacionalidade = await prisma.$queryRawUnsafe(sql);
    
                return rsNacionalidade;
        
            } catch (error) {
                return false;
                
            }
    }

const deleteNacionalidade = async function(id){
        try {
            let sql = `delete from tbl_nacionalidade where id = ${id}`
    
            let rsNacionalidade = await prisma.$queryRawUnsafe(sql);
            return rsNacionalidade;
            
        } catch (error) {
            return false
            
        }
    }
    const insertNacionalidade =  async function(dadosNacionalidade) {
    
        try {
    
         let sql = `insert into tbl_nacionalidade(pais,nome,bandeira) values ('${dadosNacionalidade.pais} ${dadosNacionalidade.nome} ${dadosNacionalidade.bandeira}')`
                
            // Executa o script SQL no banco de dados | Devemos usar execute e não query!
            // Execute deve ser utilizado para insert, update e delete, onde o banco não devolve dados
            let result = await prisma.$executeRawUnsafe(sql);
            // Validação para verificar se o insert funcionou no banco de dados
            if(result) return true
            else
                return false;
    
        } catch (error) {
    
            return false;
            
        }
    }

    const selectIdNacionalidade = async function() {

        try {
    
        let sql = `select CAST(last_insert_id() as DECIMAL) as id from tbl_genero limit 1`;
    
        let idNacionalidade = await prisma.$queryRawUnsafe(sql)
         return idNacionalidade
        } catch (error) {
            return false
            
        }   
    }
  
    const updateNacionalidade =  async function(id, dadosNacionalidade) {
    
        try {
            
            let sql =  `update tbl_nacionalidade set pais = '${dadosNacionalidade.nome}' where id = ${id}`
               // Executa o script SQL no banco de dados | Devemos usar execute e não query!
               // Execute deve ser utilizado para insert, update e delete, onde o banco não devolve dados
               let result = await prisma.$executeRawUnsafe(sql);
       
               // Validação para verificar se o insert funcionou no banco de dados
               if(result )
                   return true;
               else
                   return false;
       
           } catch (error) {
       
               return false;
               
           }
    }
    
    
       

module.exports = {
    selectAllNacionalidades,
    selectNacionalidadeById,
    deleteNacionalidade,
    insertNacionalidade,
    selectIdNacionalidade,
    updateNacionalidade

}