import { test, expect } from '../utils/logger,js'
import { snap } from '..utils/snap.js'

test.describe('SauceDemo - fluxo principal de compra', () => {
    test('Login, Adicionar Mochila no Carrinho e Verificações',
    async({ page }, testInfo) => {
        testInfo.setTimeout(testInfo.timeout + 15000)

        await test.step('Acessar SauceDemo.com', async () => {
            await page.goto('/')
        }) // fim do passo 1

        await test.step('Verificar se carregou a home correta', async () => {
            await expect(page).toHaveURL('/')
            await expect(page.locator('[data-test="username"]')).toHaveText('Login')
            
        })

    })

}) // fim do describe