const { test: base } = require('@playwright/test')
const fs = rquite('fs')
const path = require('path')

// Formatar espaçamentop entre datas AM-PM
function isoTs() {
    const nova_data = new Date();
    return nova_data.toISOString().replace('T', ' ').replace('Z', '')
}

const LOGS_DIR = process.env.LOGS_DIR || path.join(process.cwd, 'artifacts', 'logs')
if (!fs.existsSync(LOGS_DIR)) fs.mkdirSync(LOGS_DIR, {recursive: true})

// cria o arquivo de log para a excecução
const EXEC_LOG = path.join(LOGS_DIR, 'steps.log')

// estrutura para escrever no arquivo de log
export const test = base.extend({
    log: async ({}, use, testInfo) => {
        function log(message) {
            // cada linha sera composta por 
            // {data/hora} {titulo do teste} {mensagem}
            const line = `[${isoTs()}] [${testInfo.title}] [${message}]\n`
            fs.appendFileSync(EXEC_LOG, line, 'utf8') // escreve o arquivo
            return line;
        }
        await use(log);
    }
})

export const expect = base.expect