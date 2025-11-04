// 1 - Referência e bibliotecas
// Declara um objeto chamado test vindo da blibioteca Plawright
const { test, expect } = require('@playwright/test')

// 2 - Classe ou Funções ou Métódos
// um script pode excecutar de de forma :
// - sincrona: Simnultaneo. EX ligação de voz
// - assincrona: separados. ex: mensagem de texto no whatsapp
test ('Realizar o fluxo de compra da mochila', async ({page}) => {
    await page.goto('https://www.saucedemo.com/') // abre o browser no site alvo
    await expect(page).toHaveURL('https://www.saucedemo.com/')            // verifica se esta na pagina raiz
    const botao_login = page.locator('#login-button')
    await expect(botao_login).toHaveText('Login') // verifica elemento escrito login

    // pagina inicial Realizar o login
    // preencher o campo cujo localizador é name com o valor standard_user
    await page.fill('[name="user-name"]', 'standard_user')
    // preencher o campo cujo localizador é cssSelector com o valor secret_sauce
    await page.fill('[placeholder="Password"]', 'secret_sauce')
    botao_login.click()

    // pagina de inventário / produtos
    // Verificar se esta na pagina certa 
    await expect(page).toHaveURL(/.*inventory/)
    let tituloSecao = '.title'
    await expect(page.locator(tituloSecao)).toHaveText('Products') // cssSelector


    // Adicionar a mochila ao carrinho de compras
    const btnAdicionar = 'xpath=/html/body/div/div/div/div[2]/div/div/div/div[1]/div[2]/div[2]/button'
    await page.locator(btnAdicionar).click()
    

    // verrificar se exibe o n1 no carrinho de compras
    const icQuantCart = 'span.shopping_cart_badge'  // cssSelector
    await expect(page.locator(icQuantCart)).toHaveText('1')

    // clicar no icone do carrinho (n 1)
    await page.locator(icQuantCart). click()


    await expect(page).toHaveURL(/.*cart/)
    tituloSecao = '.title' //cssSelector
    await expect(page.locator(tituloSecao)).toHaveText('Your Cart')

    // verifciar dados funcionais
    await expect(page.locator('.cart_quantity')).toHaveText('1')
   await expect(page.locator('.inventory_item_name')).toHaveText('Sauce Labs Backpack')
    await expect(page.locator('.inventory_item_price')).toHaveText('$29.99')

    // Espera de 1 segundo
    await page.waitForTimeout(3000)

}) // Final do teste