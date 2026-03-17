import { test, expect } from '@playwright/test'
import { generateOrderCode } from '../support/helps'

// AAA - Arrange, Act, Assert   

test('deve consultar um pedido aprovado', async ({ page }) => {

// Test Data
const order= 'VLO-2H4LLO'

    // Arrange
  await page.goto('http://localhost:5173/')
  await expect(page.getByTestId('hero-section').getByRole('heading')).toContainText('Velô Sprint')

  await page.getByRole('link', { name: 'Consultar Pedido' }).click()
  await expect(page.getByRole('heading')).toContainText('Consultar Pedido')

// Act
  await page.getByRole('textbox', { name: 'Número do Pedido' }).fill( order)
  await page.getByRole('button', { name: 'Buscar Pedido' }).click()

  // Assert
  // const orderCode =page.locator ('//p[text()="Pedido"]/..//p[text()="VLO-2H4LLO"]')
  // await expect(orderCode).toBeVisible( {timeout: 10_000})
  
  const containerpedido =page.getByRole('paragraph')
      .filter({hasText: /^Pedido$/ })
      .locator('..') //sobe para o Elemento pai ( a div que agrupa ambos)

  await expect (containerpedido).toContainText('VLO-2H4LLO',{timeout: 10_000})
  await expect(page.getByText('APROVADO')).toBeVisible()

  // await expect(page.getByTestId('order-result-id')).toBeVisible()
  // await expect(page.getByTestId('order-result-id')).toContainText('VLO-2H4LLO')

  // await expect(page.getByTestId('order-result-status')).toBeVisible()
  // await expect(page.getByTestId('order-result-status')).toContainText('APROVADO')

 })
  test ( 'deve exibir mensagem quando o pedido não é encontrado', async ({ page }) => {

//test data

  const order = generateOrderCode()
  // Arrange
  await page.goto('http://localhost:5173/')
  await expect(page.getByTestId('hero-section').getByRole('heading')).toContainText('Velô Sprint')

  await page.getByRole('link', { name: 'Consultar Pedido' }).click()
  await expect(page.getByRole('heading')).toContainText('Consultar Pedido')
  // Act
  await page.getByRole('textbox', { name: 'Número do Pedido' }).fill( order)
  await page.getByRole('button', { name: 'Buscar Pedido' }).click()
  // Assert
  
  await expect(page.locator('#root')).toContainText('Pedido não encontrado')
  await expect(page.locator('#root')).toContainText('Pedido não encontradoVerifique o número do pedido e tente novamente')

  
  // await expect(page.locator('#root')).toMatchAriaSnapshot(`
  //   - img
  //   - heading "Pedido não encontrado" [level=3]
  //   - paragraph: Verifique o número do pedido e tente novamente
 







})








