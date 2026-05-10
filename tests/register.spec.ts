import { test, expect } from '@playwright/test';
import { RegisterPage } from '../pages/register-page'; 

test('User can register', async ({ page }) => {

    const registerPage = new RegisterPage(page);
    await registerPage.register('user1', 'user1@gmail.com','000000000', 'S/N', '12345678', '12345678');
    await expect(page).toHaveURL(/.TelaInicial/);
});

test('User cannot register with existing email', async ({ page }) => {

    const registerPage = new RegisterPage(page);
    await registerPage.register('user2', 'antonio@gmail.com','000000001', 'S/N', '12345678', '12345678');
    await expect(page.getByText('Este e-mail já está cadastrado.')).toBeVisible();
});

test('User cannot register with mismatched passwords', async ({ page }) => {

    const registerPage = new RegisterPage(page);
    await registerPage.register('user3', 'user3@gmail.com','000000002', 'S/N', '12345678', '87654321');
    await expect(page.getByText('As senhas não conferem.')).toBeVisible();
});

test('User cannot register with empty fields', async ({ page }) => {

    const registerPage = new RegisterPage(page);
    await registerPage.register('', '','', '', '', '');
    await expect(page).toHaveURL(/.registrar/);
});