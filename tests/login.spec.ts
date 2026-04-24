import { test, expect } from '../support/baseTest'

test('login com sucesso', async ({ login, inventory, page }) => {
    await login.doLogin('standard_user', 'secret_sauce')
    await expect(page).toHaveURL(/.*inventory.html/)
    await expect(inventory.titulo).toBeVisible()
    await expect(inventory.titulo).toHaveText('Swag Labs')
});

test('login without username', async ({ login, inventory, page }) => {
    await login.doLogin('', 'secret_sauce')
    await expect(page).toHaveURL('https://www.saucedemo.com/')
    await expect(page).not.toHaveURL(/inventory/)
    await expect(login.errorMessage).toHaveText('Epic sadface: Username is required')
    await expect(login.usernameInput).toHaveClass(/input_error/)
    await expect(login.passwordInput).toHaveClass(/input_error/)
});

test('login without password', async ({ login, inventory, page }) => {
    await login.doLogin('standard_user', '')
    await expect(page).toHaveURL('https://www.saucedemo.com/')
    await expect(page).not.toHaveURL(/inventory/)
    await expect(login.errorMessage).toHaveText('Epic sadface: Password is required')
    await expect(login.usernameInput).toHaveClass(/input_error/)
    await expect(login.passwordInput).toHaveClass(/input_error/)
});

test('login with invalid user', async ({ login, inventory, page }) => {
    await login.doLogin('test', 'secret_sauce')
    await expect(page).toHaveURL('https://www.saucedemo.com/')
    await expect(page).not.toHaveURL(/inventory/)
    await expect(login.errorMessage).toHaveText('Epic sadface: Username and password do not match any user in this service')
    await expect(login.usernameInput).toHaveClass(/input_error/)
    await expect(login.passwordInput).toHaveClass(/input_error/)
});

test('login with lockedout user', async ({ login, inventory, page }) => {
    await login.doLogin('locked_out_user', 'secret_sauce')
    await expect(page).toHaveURL('https://www.saucedemo.com/')
    await expect(page).not.toHaveURL(/inventory/)
    await expect(login.errorMessage).toHaveText('Epic sadface: Sorry, this user has been locked out.')
    await expect(login.usernameInput).toHaveClass(/input_error/)
    await expect(login.passwordInput).toHaveClass(/input_error/)
});