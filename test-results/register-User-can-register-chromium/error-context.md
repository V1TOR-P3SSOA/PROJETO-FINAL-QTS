# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: register.spec.ts >> User can register
- Location: tests\register.spec.ts:4:5

# Error details

```
Error: expect(page).toHaveURL(expected) failed

Expected pattern: /.TelaInicial/
Received string:  "https://ruralink.free.laravel.cloud/registrar"
Timeout: 5000ms

Call log:
  - Expect "toHaveURL" with timeout 5000ms
    8 × unexpected value "https://ruralink.free.laravel.cloud/registrar"

```

# Page snapshot

```yaml
- generic [ref=e3]:
  - img "Rural Link" [ref=e6]
  - generic [ref=e7]:
    - heading "Criar Conta" [level=1] [ref=e8]
    - generic [ref=e9]:
      - paragraph [ref=e11]: • Este e-mail já está cadastrado.
      - generic [ref=e12]:
        - generic [ref=e13]:
          - generic [ref=e14]: Nome Completo
          - generic [ref=e15]:
            - img [ref=e17]
            - 'textbox "Ex: João Silva" [ref=e19]': user1
        - generic [ref=e20]:
          - generic [ref=e21]: E-mail
          - generic [ref=e22]:
            - img [ref=e24]
            - textbox "seu@email.com" [ref=e26]: user1@gmail.com
        - generic [ref=e27]:
          - generic [ref=e28]:
            - generic [ref=e29]: Telefone
            - textbox "(00) 00000-0000" [ref=e30]: (00) 0000-000
          - generic [ref=e31]:
            - generic [ref=e32]: Cidade
            - textbox "Sua cidade" [ref=e33]: S/N
        - generic [ref=e34]:
          - generic [ref=e35]: Senha
          - generic [ref=e36]:
            - img [ref=e38]
            - textbox "••••••••" [ref=e40]
            - button [ref=e41] [cursor=pointer]:
              - img [ref=e42]
        - generic [ref=e44]:
          - generic [ref=e45]: Confirmar Senha
          - textbox "Repita a senha" [ref=e46]
        - generic [ref=e47]:
          - generic [ref=e48]: Foto de Perfil (Opcional)
          - button "Choose File" [ref=e49]
        - button "Cadastrar Agora" [ref=e50] [cursor=pointer]
        - paragraph [ref=e52]:
          - text: Já tem uma conta?
          - link "Entre aqui." [ref=e53] [cursor=pointer]:
            - /url: https://ruralink.free.laravel.cloud/login
```

# Test source

```ts
  1  | import { test, expect } from '@playwright/test';
  2  | import { RegisterPage } from '../pages/register-page'; 
  3  | 
  4  | test('User can register', async ({ page }) => {
  5  | 
  6  |     const registerPage = new RegisterPage(page);
  7  |     await registerPage.register('user1', 'user1@gmail.com','000000000', 'S/N', '12345678', '12345678');
> 8  |     await expect(page).toHaveURL(/.TelaInicial/);
     |                        ^ Error: expect(page).toHaveURL(expected) failed
  9  | });
  10 | 
  11 | test('User cannot register with existing email', async ({ page }) => {
  12 | 
  13 |     const registerPage = new RegisterPage(page);
  14 |     await registerPage.register('user2', 'antonio@gmail.com','000000001', 'S/N', '12345678', '12345678');
  15 |     await expect(page.getByText('Este e-mail já está cadastrado.')).toBeVisible();
  16 | });
  17 | 
  18 | test('User cannot register with empty fields', async ({ page }) => {
  19 | 
  20 |     const registerPage = new RegisterPage(page);
  21 |     await registerPage.register('', '','', '', '', '');
  22 |     await expect(page).toHaveURL(/.registrar/);
  23 | });
```