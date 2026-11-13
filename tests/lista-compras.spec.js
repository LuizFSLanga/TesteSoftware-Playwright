const { test, expect } = require('@playwright/test');

const produtoExemplo = {
  nome: 'Notebook Lenovo',
  preco: '3499.90',
  estoque: '12',
};

test.beforeEach(async ({ page }) => {
  await page.goto('/');
});

test('adiciona um produto e atualiza o resumo', async ({ page }) => {
  await page.getByLabel('Nome do produto').fill(produtoExemplo.nome);
  await page.getByLabel('Preço (R$)').fill(produtoExemplo.preco);
  await page.getByLabel('Quantidade em estoque').fill(produtoExemplo.estoque);
  await page.getByRole('button', { name: 'Cadastrar produto' }).click();

  await expect(page.getByRole('status')).toHaveText(`Produto "${produtoExemplo.nome}" cadastrado com sucesso!`);
  await expect(page.getByRole('listitem')).toHaveCount(1);
  await expect(page.getByRole('heading', { name: produtoExemplo.nome })).toBeVisible();
  await expect(page.locator('.produto-preco')).toContainText('3.499,90');
  await expect(page.locator('.produto-estoque')).toHaveText('Estoque: 12 unidades');
  await expect(page.getByText('1 produto', { exact: true })).toBeVisible();
});

test('recusa cadastro com campos obrigatórios vazios e mantém a lista intacta', async ({ page }) => {
  await page.getByLabel('Nome do produto').fill(produtoExemplo.nome);
  await page.getByRole('button', { name: 'Cadastrar produto' }).click();

  await expect(page.getByRole('alert')).toHaveText(
    'Preencha corretamente todos os campos obrigatórios: nome, preço e estoque.'
  );
  await expect(page.getByRole('listitem')).toHaveCount(0);
  await expect(page.getByText('Nenhum produto cadastrado ainda.')).toBeVisible();
});

test('mantém produto, preço e estoque após recarregar a página', async ({ page }) => {
  await page.getByLabel('Nome do produto').fill(produtoExemplo.nome);
  await page.getByLabel('Preço (R$)').fill(produtoExemplo.preco);
  await page.getByLabel('Quantidade em estoque').fill(produtoExemplo.estoque);
  await page.getByRole('button', { name: 'Cadastrar produto' }).click();

  await expect(page.getByRole('heading', { name: produtoExemplo.nome })).toBeVisible();
  await page.reload();

  await expect(page.getByRole('heading', { name: produtoExemplo.nome })).toBeVisible();
  await expect(page.locator('.produto-preco')).toContainText('3.499,90');
  await expect(page.locator('.produto-estoque')).toHaveText('Estoque: 12 unidades');
  await expect(page.getByRole('listitem')).toHaveCount(1);
});
