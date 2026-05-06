import { test, expect } from '../support/baseTest'

test('Assert value of added products', async ({ inventory }) => {
    const precoMochila = await inventory.addItemToCart('Sauce Labs Backpack');
    const precoCamiseta = await inventory.addItemToCart('Sauce Labs Bolt T-Shirt');

    const somaTotal = precoMochila + precoCamiseta;
    console.log(`Cart total should be: ${somaTotal}`);
    expect(somaTotal).toBe(45.98);

    //TODO 
});