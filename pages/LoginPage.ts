import { type Locator, type Page } from '@playwright/test'

export class LoginPage {
    readonly page: Page
    readonly titulo: Locator
    readonly usernameInput: Locator
    readonly passwordInput: Locator
    readonly loginButton: Locator
    readonly errorMessage: Locator

    constructor(page: Page) {
        this.page = page
        this.titulo = page.getByRole('heading', { name: 'Swag Labs' })
        this.usernameInput = page.getByRole('textbox', { name: 'Username' })
        this.passwordInput = page.getByRole('textbox', { name: 'Password' })
        this.loginButton = page.getByRole('button', { name: 'Login' })
        this.errorMessage = page.getByTestId('error');
    }

    async goto() {
        await this.page.goto('https://www.saucedemo.com/')
    }

    async doLogin(user: string, pass: string) {
        await this.usernameInput.fill(user);
        await this.passwordInput.fill(pass);
        await this.loginButton.click();
    }
}