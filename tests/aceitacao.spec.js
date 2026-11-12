const { test, expect } = require('@playwright/test');

test('C1 - Adiciona produto ao carrinho', async ({ page }) => {
    await page.goto('/');

    await page.getByRole('button', {
        name: 'Adicionar Café'
    }).click();

    await page.getByRole('link', {
        name: 'Carrinho'
    }).click();

    await expect(page.getByText('Café', {
        exact: true
    })).toBeVisible();

    await expect(page.getByText('1 produto')).toBeVisible();
});

test('C2 - Impede finalizar compra com carrinho vazio', async ({ page }) => {
    await page.goto('/');

    await page.getByRole('link', {
        name: 'Carrinho'
    }).click();

    await page.getByRole('button', {
        name: 'Finalizar compra'
    }).click();

    await expect(page.getByRole('alert')).toHaveText(
        'Adicione produtos ao carrinho antes de finalizar.'
    );

    await expect(page.getByText('Nenhum produto no carrinho.')).toBeVisible();
});

test('C3 - Remove produto e atualiza o total', async ({ page }) => {
    await page.goto('/');

    await page.getByRole('button', {
        name: 'Adicionar Café'
    }).click();

    await page.getByRole('link', {
        name: 'Carrinho'
    }).click();

    await page.getByRole('button', {
        name: 'Remover Café'
    }).click();

    await expect(page.getByText('Café', {
        exact: true
    })).toHaveCount(0);

    await expect(page.getByText('R$ 0,00')).toBeVisible();
});