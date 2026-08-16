import { test, expect } from '@playwright/test'
import { generateOrderCode } from '../support/helps'

// AAA - Arrange, Act, Assert   


test.describe('Consultar Pedido', () => {

  test.beforeEach(async ({ page }) => {

    // Arrange
    await page.goto('http://localhost:5173/')
    await expect(page.getByTestId('hero-section').getByRole('heading')).toContainText('Velô Sprint')

    await page.getByRole('link', { name: 'Consultar Pedido' }).click()
    await expect(page.getByRole('heading')).toContainText('Consultar Pedido')
  })

  test('deve consultar um pedido aprovado', async ({ page }) => {

    // Test Data
    // const order = 'VLO-2H4LLO'
    const order = {
      number: 'VLO-2H4LLO',
      status: 'APROVADO',
      color: 'Lunar White',
      wheels: 'aero Wheels',
      customer: {
        name: 'CRISTIANETESTEUM SILVESTRE',
        email: 'qatesteum@gmail.com'
      },
      payment: 'À Vista',
    }

    // Act
    await page.getByRole('textbox', { name: 'Número do Pedido' }).fill(order.number)
    await page.getByRole('button', { name: 'Buscar Pedido' }).click()

    // Assert
    // const orderCode =page.locator ('//p[text()="Pedido"]/..//p[text()="VLO-2H4LLO"]')
    // await expect(orderCode).toBeVisible( {timeout: 10_000})

    // const containerpedido = page.getByRole('paragraph')
    //   .filter({ hasText: /^Pedido$/ })
    //   .locator('..') //sobe para o Elemento pai ( a div que agrupa ambos)

    // await expect(containerpedido).toContainText('VLO-2H4LLO', { timeout: 10_000 })
    // await expect(page.getByText('APROVADO')).toBeVisible()

    // await expect(page.getByTestId('order-result-id')).toBeVisible()
    // await expect(page.getByTestId('order-result-id')).toContainText('VLO-2H4LLO')

    // await expect(page.getByTestId('order-result-status')).toBeVisible()
    // await expect(page.getByTestId('order-result-status')).toContainText('APROVADO')

    await expect(page.getByTestId(`order-result-${order.number}`)).toMatchAriaSnapshot(`
  - img
  - paragraph: Pedido
  - paragraph: ${order.number}
  - status:
    - img
    - text: ${order.status}
  - img "Velô Sprint"
  - paragraph: Modelo
  - paragraph: Velô Sprint
  - paragraph: Cor
  - paragraph: ${order.color}
  - paragraph: Interior
  - paragraph: cream
  - paragraph: Rodas
  - paragraph: ${order.wheels}
  - heading "Dados do Cliente" [level=4]
  - paragraph: Nome
  - paragraph: ${order.customer.name}
  - paragraph: Email
  - paragraph: ${order.customer.email}
  - paragraph: Loja de Retirada
  - paragraph
  - paragraph: Data do Pedido
  - paragraph: /\\d+\\/\\d+\\/\\d+/
  - heading "Pagamento" [level=4]
  - paragraph: ${order.payment}
  - paragraph: /R\\$ \\d+\\.\\d+,\\d+/
`);
    const statusbadge = page.getByRole('status').filter({ hasText: order.status })
    await expect(statusbadge).toHaveClass(/bg-green-100/)
    await expect(statusbadge).toHaveClass(/text-green-700/)

    const statusIcon= statusbadge.locator('svg')
    await expect(statusIcon).toHaveClass ('lucide lucide-circle-check-big w-4 h-4')
  })
  test('deve consultar um pedido reprovado', async ({ page }) => {

    // Test Data
    //const order = 'VLO-3X4MAY'
    const order = {
      number: 'VLO-3X4MAY',
      status: 'REPROVADO',
      color: 'Midnight Black',
      wheels: 'sport Wheels',
      customer: {
        name: 'QAPAULO SILVESTRE SANTOS',
        email: 'silvestresantos@gmail.com'
      },
      payment: 'À Vista',
    }
    // Act
    await page.getByRole('textbox', { name: 'Número do Pedido' }).fill(order.number)
    await page.getByRole('button', { name: 'Buscar Pedido' }).click()


    await expect(page.getByTestId(`order-result-${order.number}`)).toMatchAriaSnapshot(`
      - img
      - paragraph: Pedido
      - paragraph: ${order.number}
      - status:
        - img
        - text: ${order.status}
      - img "Velô Sprint"
      - paragraph: Modelo
      - paragraph: Velô Sprint
      - paragraph: Cor
      - paragraph: ${order.color}
      - paragraph: Interior
      - paragraph: cream
      - paragraph: Rodas
      - paragraph: ${order.wheels}
      - heading "Dados do Cliente" [level=4]
      - paragraph: Nome
      - paragraph: ${order.customer.name}
      - paragraph: Email
      - paragraph: silvestresantos@gmail.com
      - paragraph: Loja de Retirada
      - paragraph
      - paragraph: Data do Pedido
      - paragraph: /\\d+\\/\\d+\\/\\d+/
      - heading "Pagamento" [level=4]
      - paragraph: ${order.payment}
      - paragraph: /R\\$ \\d+\\.\\d+,\\d+/
      `);

      const statusbadge = page.getByRole('status').filter({ hasText: order.status })
      await expect(statusbadge).toHaveClass(/bg-red-100/)
      await expect(statusbadge).toHaveClass(/text-red-700/)
  
      const statusIcon= statusbadge.locator('svg')
      await expect(statusIcon).toHaveClass ('lucide lucide-circle-x w-4 h-4')
  })
  test('deve consultar um pedido EM_ANALISE', async ({ page }) => {

    // Test Data
    // const order = 'VLO-2H4LLO'
    const order = {
      number: 'VLO-446LFN',
      status: 'EM_ANALISE',
      color: 'Lunar White',
      wheels: 'aero Wheels',
      customer: {
        name: 'FELIPE  CARDOSO',
        email: 'cardoso@gmail.com'
      },
      payment: 'À Vista',
    }

    // Act
    await page.getByRole('textbox', { name: 'Número do Pedido' }).fill(order.number)
    await page.getByRole('button', { name: 'Buscar Pedido' }).click()


    await expect(page.getByTestId(`order-result-${order.number}`)).toMatchAriaSnapshot(`
      - img
      - paragraph: Pedido
      - paragraph: ${order.number}
      - status:
        - img
        - text: ${order.status}
      - img "Velô Sprint"
      - paragraph: Modelo
      - paragraph: Velô Sprint
      - paragraph: Cor
      - paragraph: ${order.color}
      - paragraph: Interior
      - paragraph: cream
      - paragraph: Rodas
      - paragraph: ${order.wheels}
      - heading "Dados do Cliente" [level=4]
      - paragraph: Nome
      - paragraph: ${order.customer.name}
      - paragraph: Email
      - paragraph: ${order.customer.email}
      - paragraph: Loja de Retirada
      - paragraph
      - paragraph: Data do Pedido
      - paragraph: /\\d+\\/\\d+\\/\\d+/
      - heading "Pagamento" [level=4]
      - paragraph: ${order.payment}
      - paragraph: /R\\$ \\d+\\.\\d+,\\d+/
      `);

      const statusbadge = page.getByRole('status').filter({ hasText: order.status })
      await expect(statusbadge).toHaveClass(/bg-amber-100/)
      await expect(statusbadge).toHaveClass(/text-amber-700/)
  
      const statusIcon = statusbadge.locator('svg')
      await expect(statusIcon).toHaveClass('lucide lucide-clock w-4 h-4')

  })
  test('deve exibir mensagem quando o pedido não é encontrado', async ({ page }) => {

    //test data

    const order = generateOrderCode()
    // Act
    await page.getByRole('textbox', { name: 'Número do Pedido' }).fill(order)
    await page.getByRole('button', { name: 'Buscar Pedido' }).click()
    // Assert
    await expect(page.locator('#root')).toMatchAriaSnapshot(`
      - img
      - heading "Pedido não encontrado" [level=3]
      - paragraph: Verifique o número do pedido e tente novamente
      `)


  })
})








