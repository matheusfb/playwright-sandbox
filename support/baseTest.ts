import { test as base } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage'
import { InventoryPage } from '../pages/InventoryPage'

type MyFixtures = {
    login: LoginPage
    inventory: InventoryPage
};

export const test = base.extend<MyFixtures>({
    login: async ({ page }, use) => {
        const login = new LoginPage(page)
        await login.goto()
        await use(login)
    },

    inventory: async ({ page, login }, use) => {
        const inventory = new InventoryPage(page)
        await login.doLogin('standard_user', 'secret_sauce');   
        await use(inventory)
    },
});

export { expect } from '@playwright/test'