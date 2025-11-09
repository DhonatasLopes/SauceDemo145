import { test, expect } from '../utils/logger.js'
import { snap } from '../utils/snap.js'

// funções de apoio
async function login_step(page){
await page.goto('https://www.saucedemo.com/')

        await expect(page).toHaveURL('/') // verificação classica
        await expect(page.locator('[data-test="login-button"]')).toHaveText('Login')
 
}

async function success_login_step(page) {
    await page.locator('[data-test="username"]').fill('standard_user')
    await page.locator('[data-test="password"]').fill('secret_sauce')
    

}

async function success_login_click_step(page){
    await page.locator('[data-test="login-button"]').click()

    await expect(page).toHaveURL(/inventory\.html/)
    await expect(page.locator('[data-test="title"]')).toHaveText('Products')

    
}

async function add_to_cart_step(page) {
    await page.locator('[data-test="shopping-cart-link"]').click()
    await expect(page).toHaveURL(/cart\.html/)
    await expect(page.locator('[data-test="title"]')).toHaveText("Your Cart")

    await expect(page.locator('[data-test="item-quantity"]')).toHaveText("1")
    await expect(page.locator('[data-test="inventory-item-name"]')).toHaveText("Sauce Labs Backpack")
    await expect(page.locator('[data-test="inventory-item-price"]')).toHaveText("$29.99")
   
    
}

test.describe('SauceDemo - fluxo principal de compra', () => {
    test('Comprar Mochila Direto',
    async({ page }, testInfo) => {
        testInfo.setTimeout(testInfo.timeout + 15000)
    
        // inicio do passo 1
        await test.step('Acessar SauceDemo.com', async () => {
        await login_step(page)
        await snap(page, testInfo, 'TC002-Passo01-home')
        }) // fim do passo 1

        // inicio do passo 2
        await test.step('Login com sucesso', async () => {
           await success_login_step(page) // preeche email e senha
           await snap(page, testInfo,  'TC001-Passo02A-Login_Preenchido') 
           await success_login_click_step(page) // clique para entrar
           await snap(page, testInfo, 'TC001-Passo02B-Inventory') 
        }) // fim do passo 2

        // Inicio do passo 3
            await test.step('Abrir pagina da mochila e adicionar mochila no carrinho', async () => {
                // parte 3.1 - Abrir a pagina da mochila
                // Ação // codigo de produtoi : 4 = mochila
                await page.locator('[data-test="item-4-title-link"]').click()

                // Verificações
                // Estamos na pagina certa ?
                await expect(page).toHaveURL(/inventory-item\.html/) // url
                await expect(page).toHaveTitle('Swag Labs')           // title (guia)
                await expect(page.locator('[data-test="back-to-products"]')).toHaveText('Back to products')
                // As informações do produto estão certas?
                await expect(page.locator('[data-test="inventory-item-name"]')).toHaveText("Sauce Labs Backpack")
                await expect(page.locator('[data-test="inventory-item-price"]')).toHaveText("$29.99")

                await snap(page, testInfo, 'TC002-Passo03_1-Inventory_item') 
                // parte 3.2 - Adicionar produto no carrinho
                // Ação
                await page.locator('[data-test="add-to-cart"]').click()
                // Verificações
                await expect(page.locator('.shopping_cart_badge')).toHaveText('1')
                await snap(page, testInfo, 'TC002-Passo03_2-Mochila-Adicionada') 
            }) // fim do passo 3
        
           
            await test.step('Ir para o carrinho', async () => {
                await add_to_cart_step(page)
                await snap(page, testInfo, 'TC002-Passo4-Carrinho-Conferido')

            })


    }) // fim do test 1


// inicio do teste 2
    test('Comprar Mochila Detalhes',
    async({ page }, testInfo) => {
        testInfo.setTimeout(testInfo.timeout + 15000)

        await test.step('Acessar SauceDemo.com', async () => {
        await login_step(page, testInfo)
        })// fim do passo 1

        // Inicio do passo 2
        await test.step('Login com sucesso', async () => {
            await success_login_step(page) // preeche email e senha
            await snap(page, testInfo, 'TC002-Passo02A-Login_Preenchido') 
            await success_login_click_step(page) // clique para entrar
            await snap(page, testInfo, 'TC002-Passo02B-Inventory') 
            
        }) // Fim do passo 2

        await test.step('Adicionar mochila no carrinho', async () => {
            await page.locator('[data-test="item-4-title-link"]').click()
            // to do: concluir
            await page.locator('[data-test="add-to-cart"]').click()

            await expect(page.locator('.shopping_cart_badge')).toHaveText('1')
            await snap(page, testInfo, 'TC001-Passo03-Mochila-Adicionada') 
            }) // fim do passo 3

    }) 



    
})


//  await test.step('Ir para o checkout', async () => {
//             await page.locator('[data-test="checkout"]').click()
//             await expect(page).toHaveURL(/checkout-step-one\.html/)
//             await expect(page.locator('[data-test="title"]')).toHaveText('Checkout: Your Information')

//             await page.locator('[data-test="firstName"]').fill('Dhonatas')
//             await page.locator('[data-test="lastName"]').fill('Lopes')
//             await page.locator('[data-test="postalCode"]').fill('73752-655')
//             await snap(page, testInfo, 'TC001-Passo5-Dados-Preenchidos')
//             })

//             await test.step('Confirmar pedido', async () => {
//                 await page.locator('[data-test="continue"]').click()
//                 await expect(page).toHaveURL(/checkout-step-two\.html/)
//                 await expect(page.locator('[data-test="title"]')).toHaveText("Checkout: Overview")

//                 await expect(page.locator('[data-test="item-quantity"]')).toHaveText("1")
//                 await expect(page.locator('[data-test="inventory-item-name"]')).toHaveText("Sauce Labs Backpack")
//                 await expect(page.locator('[data-test="inventory-item-price"]')).toHaveText("$29.99")
//                  await expect(page.locator('[data-test="tax-label"]')).toHaveText("Tax: $2.40")
//                 await expect(page.locator('[data-test="total-label"]')).toHaveText("Total: $32.39")


//                 await snap(page, testInfo, 'TC001-Passo6-checando-compra')

//             })

//              await test.step('Compra finalizada', async () => {
//                 await page.locator('[data-test="finish"]').click()
//                 await expect(page).toHaveURL(/checkout-complete\.html/)
//                 await expect(page.locator('[data-test="title"]')).toHaveText("Checkout: Complete!")

//                 await expect(page.locator('[data-test="complete-header"]')).toHaveText("Thank you for your order!")
//                 await expect(page.locator('[data-test="complete-text"]')).toHaveText("Your order has been dispatched, and will arrive just as fast as the pony can get there!")
                
//                 await snap(page, testInfo, 'TC001-Passo7-compra-finalizada')

//             })
