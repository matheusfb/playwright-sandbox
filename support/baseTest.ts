import { test as base } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage'
import { InventoryPage } from '../pages/InventoryPage'

// 1. Definimos o tipo das nossas fixtures
type MyFixtures = {
    login: LoginPage
    inventory: InventoryPage
};

// 2. Estendemos o test original
export const test = base.extend<MyFixtures>({
    login: async ({ page }, use) => {
        const login = new LoginPage(page)
        await login.goto()
        await use(login)
    },

    inventory: async ({ page }, use) => {
        const inventory = new InventoryPage(page)
        await use(inventory)
    },
});

export { expect } from '@playwright/test'