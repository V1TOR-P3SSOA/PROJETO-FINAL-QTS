import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/login-page';
import * as dotenv from 'dotenv';

dotenv.config();

const email = process.env.USER_EMAIL!;
const password = process.env.USER_PASSWORD!;

test('User can login', async ({ page }) => {

    const loginpage = new LoginPage(page); 
    await loginpage.login(email, password);
    await expect(page).toHaveURL(/.TelaInicial/);
  
  });

test('User cannot login with invalid credentials', async ({ page }) => {

    const loginpage = new LoginPage(page); 
    await loginpage.login(email, 'wrongpassword');
    await expect(page.getByText('E-mail ou senha incorretos.')).toBeVisible();
  });

test('User cannot login with empty fields', async ({ page }) => {

    const loginpage = new LoginPage(page); 
    await loginpage.login('', '');
    await expect(page).toHaveURL(/.login/);
  });