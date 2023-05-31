export const generateParamErrorInfo = (param = {}, expectedParam = {}, valueParam = {}) => {
    const qtyError = Object.keys(param).length
    let msgError = ''
    for (let i = 0; i < qtyError; i++) {
        const paramError = `El parametro ${Object.keys(param)[i]} debe ser ${expectedParam[i]}, pero se obtuvo ${valueParam[i]},  `
        msgError += paramError
    }

    return `
    Tiene ${qtyError} errores de parametros: 
    ${msgError}
    `
}