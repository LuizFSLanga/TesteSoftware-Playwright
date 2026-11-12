const { test, expect } = require('@playwright/test');

test.beforeEach(async ({ page }) => {
  await page.goto('/');
});

test('adiciona um item e atualiza o resumo', async ({ page }) => {
  await page.getByLabel('Novo item').fill('Café');
  await page.getByRole('button', { name: 'Adicionar' }).click();

  await expect(page.getByRole('listitem')).toHaveCount(1);
  await expect(page.getByText('Café', { exact: true })).toBeVisible();
  await expect(page.getByText('1 item · 0 concluídos')).toBeVisible();
});

test('recusa item vazio e mantém a lista intacta', async ({ page }) => {
  await page.getByLabel('Novo item').fill('   ');
  await page.getByRole('button', { name: 'Adicionar' }).click();

  await expect(page.getByRole('alert')).toHaveText('Digite um item antes de adicionar.');
  await expect(page.getByRole('listitem')).toHaveCount(0);
});

test('conclui um item e mantém o estado após recarregar', async ({ page }) => {
  await page.getByLabel('Novo item').fill('Café');
  await page.getByRole('button', { name: 'Adicionar' }).click();
  await page.getByRole('checkbox', { name: 'Concluir Café' }).check();

  await expect(page.getByText('1 item · 1 concluído')).toBeVisible();

  await page.reload();

  await expect(page.getByRole('checkbox', { name: 'Concluir Café' })).toBeChecked();
  await expect(page.getByText('1 item · 1 concluído')).toBeVisible();
});
