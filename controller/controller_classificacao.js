/********************************
 * Objetivo: Arquivo responsável pela interação entre o APP e a MODEL, que teremos todas
 * as tratativas e regra de negócio para o CRUD de Classificação
 * Data: 10/04/2024
 * Autor: Matheus Zanoni
 * Versão: 1.0
 *******************************/

// Import do arquivo de configuração do projeto
const message = require('../modulo/config.js')

// Import do arquivo DAO para manipular dados do banco de dados
const classificacaoDAO = require('../model/DAO/classificacao.js');

const getListarClassficacao = async function(){
    
    let listaClassificacao;
    // Cria uma variavel do tipo json
    let classficacaoJSON = {};

    if ((listaClassificacao)){
        return listaClassificacao;
    }else{
    
    // Chama a função do DAO para buscar os dados do banco de dados
    let dadosClassificacao = await classificacaoDAO.selectAllClassificacoes();

    
    // Verifica se existem dados retornados do DAO
    if(dadosClassificacao){
        if(dadosClassificacao.length > 0){
        // Montando a estrutura do JSOm
        classficacaoJSON.classificacoes = dadosClassificacao;
        classficacaoJSON.quantidade = dadosClassificacao.length;
        classficacaoJSON.status_code = 200;
        // Retorna o JSON montado
        return classficacaoJSON; // 200
        }else{
            return message.ERROR_NOT_FOUND // 404
        }
        } else{
            return message.ERROR_INTERNAL_SERVER_DB // 500

        }
    }
}

const getListarClassficacaoById = async function (id){
   
    // Recebe o id do filme
    let idClassificacao = id;

    // Variável para criar o json do atores
    let classficacaoJSON = {};

    // Validação para ID vazio, indefinido ou não numérico
    if (idClassificacao == '' || idClassificacao == undefined || isNaN(idClassificacao)){
        return message.ERROR_INVALID_ID;
    }else{

        // Solicita para o DAO a busca do ator pelo iD
        let dadosClassificacao = await classificacaoDAO.selectClassficationsById(id)


        // Validação para verificar se existem dados encontrados
        if(dadosClassificacao){
            // Validação para verificar se existem dados de retorno
            if(dadosClassificacao.length > 0){
            classficacaoJSON.atores = dadosClassificacao;
            classficacaoJSON.status_code = 200

            return atoresJSON; // 200
        }else{
            return message.ERROR_NOT_FOUND; //404
        }
        }else{
            return message.ERROR_INTERNAL_SERVER_DB; // 500
        }
    }


}


const setDeleteClassficacao = async function(id){
    try {
        
        let idClassificacao = id;

        if(idClassificacao == '' || idClassificacao == undefined || isNaN(idClassificacao)){
            return message.ERROR_INVALID_ID;
        }else{
            let chamarConst = await classificacaoDAO.selectClassficationsById(idClassificacao)

            if(chamarConst.length > 0){
                let dadosClassificacao = await classificacaoDAO.deleteClassficationById(id)

                if(dadosClassificacao){
                    return message.SUCCESS_DELETED_ITEM
                }else {
                    return message.ERROR_INTERNAL_SERVER_DB
                }
            
        }else {
            return message.ERROR_NOT_FOUND
        }
    }
    } catch (error) {
        return message.ERROR_INTERNAL_SERVER
    }
}

const setUpdateClassificacao = async function(id, contentType, dadosClassificacao){
    try{
        let idClassificacao = id;
        console.log(idClassificacao)

        if(idClassificacao == '' || idClassificacao == undefined || isNaN (idClassificacao)){
            return message.ERROR_INVALID_ID;

           
            
        }else{

        if(String(contentType).toLowerCase() == 'application/json'){
            let updateClassificacaoJson = {};
            
            if(dadosClassificacao.categoria == ''    || dadosClassificacao.categoria == undefined       ||  dadosClassificacao.categoria == null               || dadosClassificacao.categoria.length > 255 ||
            dadosClassificacao.descricao == ''  ||   dadosClassificacao.descricao == undefined  || dadosClassificacao.descricao == null   || dadosClassificacao.descricao > 255 ||
            dadosClassificacao.simbolo == '' ||  dadosClassificacao.simbolo == undefined || dadosClassificacao.simbolo == null  || dadosClassificacao.simbolo > 65000      
    ){
            return message.ERROR_REQUIRED_FIELDS
        } else {

            let validateStatus = true;

            let classificacaoById = await classificacaoDAO.selectClassficationsById(id)

            if(classificacaoById.length > 0){
                if (validateStatus){
                    let uptadeClassificacao = await classificacaoDAO.updateClassificacao(id,dadosClassificacao);
    
                    if(uptadeClassificacao){
                      
                        updateClassificacaoJson.classificacao = dadosClassificacao
                        updateClassificacaoJson.status = message.SUCCESS_UPDATED_ITEM.status
                        updateClassificacaoJson.status_code = message.SUCCESS_UPDATED_ITEM.status_code
                        updateClassificacaoJson.message = message.SUCCESS_UPDATED_ITEM.message
    
                        return updateClassificacaoJson;
                    } else {
                         return message.ERROR_INTERNAL_SERVER_DB
                    }
                }
            }else{
                return message.ERROR_NOT_FOUND
            }
        }
        } else {
            return message.ERROR_CONTENT_TYPE
        }
        }

    } catch (error) {
        return message.ERROR_INTERNAL_SERVER
    }
}


module.exports = {
    getListarClassficacao,
    getListarClassficacaoById,
    setDeleteClassficacao,
    setUpdateClassificacao
}