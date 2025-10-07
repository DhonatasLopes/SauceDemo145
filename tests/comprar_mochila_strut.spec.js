import { test, expect } from '../utils/logger.js'
import { snap } from '../utils/snap.js'

// funções de apoio
async function login_step(page, testInfo){
await page.goto('/')

        await expect(page).toHaveURL('/') // verificação classica
        await expect(page.locator('[data-test="login-button"]')).toHaveText('Login')

        await snap(page, testInfo, 'TC001-Passo01-home') 
}

async function success_login_step(page, testInfo) {
    await page.locator('[data-test="username"]').fill('standard_user')
    await page.locator('[data-test="password"]').fill('secret_sauce')
    await snap(page, testInfo, 'TC001-Passo02A-Login_Preenchido') 
    await page.locator('[data-test="login-button"]').click()

    await expect(page).toHaveURL(/inventory\.html/)
    await expect(page.locator('[data-test="title"]')).toHaveText('Products')

    await snap(page, testInfo, 'TC001-Passo02B-Inventory') 
}
test.describe('SauceDemo - fluxo principal de compra', () => {
    test('Comprar Mochila Direto',
    async({ page }, testInfo) => {
        testInfo.setTimeout(testInfo.timeout + 15000)
    
        // inicio do passo 1
        await test.step('Acessar SauceDemo.com', async () => {
        await login_step(page, testInfo)
        }) // fim do passo 1

        // inicio do passo 2
        await test.step('Login com sucesso', async () => {
           success_login_step(page, testInfo) 
        }) // fim do passo 2

        // Inicio do passo 3
            await test.step('Adicionar mochila no carrinho', async () => {
                const seletor_mochila = page.locator('.inventory_item').filter({ hasText: /Backpack/})
                await seletor_mochila.getByRole('button', {name: /Add to cart/}).click()

                await expect(page.locator('.shopping_cart_badge')).toHaveText('1')
                await snap(page, testInfo, 'TC001-Passo03-Mochila-Adicionada') 
            }) // fim do passo 3
        
           
            await test.step('Ir para o carrinho', async () => {
                await page.locator('[data-test="shopping-cart-link"]').click()
                await expect(page).toHaveURL(/cart\.html/)
                await expect(page.locator('[data-test="title"]')).toHaveText("Your Cart")

                await expect(page.locator('[data-test="item-quantity"]')).toHaveText("1")
                await expect(page.locator('[data-test="inventory-item-name"]')).toHaveText("Sauce Labs Backpack")
                await expect(page.locator('[data-test="inventory-item-price"]')).toHaveText("$29.99")
                await snap(page, testInfo, 'TC001-Passo4-Carrinho-Conferido')

            })

            await test.step('Ir para o checkout', async () => {
            await page.locator('[data-test="checkout"]').click()
            await expect(page).toHaveURL(/checkout-step-one\.html/)
            await expect(page.locator('[data-test="title"]')).toHaveText('Checkout: Your Information')

            await page.locator('[data-test="firstName"]').fill('Dhonatas')
            await page.locator('[data-test="lastName"]').fill('Lopes')
            await page.locator('[data-test="postalCode"]').fill('73752-655')
            await snap(page, testInfo, 'TC001-Passo5-Dados-Preenchidos')
            })

            await test.step('Confirmar pedido', async () => {
                await page.locator('[data-test="continue"]').click()
                await expect(page).toHaveURL(/checkout-step-two\.html/)
                await expect(page.locator('[data-test="title"]')).toHaveText("Checkout: Overview")

                await expect(page.locator('[data-test="item-quantity"]')).toHaveText("1")
                await expect(page.locator('[data-test="inventory-item-name"]')).toHaveText("Sauce Labs Backpack")
                await expect(page.locator('[data-test="inventory-item-price"]')).toHaveText("$29.99")
                 await expect(page.locator('[data-test="tax-label"]')).toHaveText("Tax: $2.40")
                await expect(page.locator('[data-test="total-label"]')).toHaveText("Total: $32.39")


                await snap(page, testInfo, 'TC001-Passo6-checando-compra')

            })

             await test.step('Compra finalizada', async () => {
                await page.locator('[data-test="finish"]').click()
                await expect(page).toHaveURL(/checkout-complete\.html/)
                await expect(page.locator('[data-test="title"]')).toHaveText("Checkout: Complete!")

                await expect(page.locator('[data-test="complete-header"]')).toHaveText("Thank you for your order!")
                await expect(page.locator('[data-test="complete-text"]')).toHaveText("Your order has been dispatched, and will arrive just as fast as the pony can get there!")
                
                await snap(page, testInfo, 'TC001-Passo7-compra-finalizada')

            })




    }) // fim do test 1
//     test('Comprar Mochila Detalhes',
//     async({ page }, testInfo) => {
//         testInfo.setTimeout(testInfo.timeout + 15000)

//         await test.step('Acessar SauceDemo.com', async () => {
//         await login_step(page, testInfo)
//         })

//         await test.step('Login com sucesso', async () => {
//            success_login_step(page, testInfo) 
//         }) 

//         await test.step('Adicionar mochila no carrinho', async () => {
//                 const seletor_mochila = page.locator('.inventory_item').filter({ hasText: /Backpack/})
//                 await seletor_mochila.getByRole('link', { hasText: /Backpack/}).click()
//             // to do: concluir
//                 await expect(page.locator('.shopping_cart_badge')).toHaveText('1')
//                 await snap(page, testInfo, 'TC001-Passo03-Mochila-Adicionada') 
//             })

//     }) 
}) // fim do describe