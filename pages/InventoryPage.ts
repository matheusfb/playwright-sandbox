import { type Locator, type Page } from '@playwright/test'

export class InventoryPage {
  readonly page: Page
  readonly titulo: Locator
  readonly cartLink: Locator
  readonly orderList: Locator
  readonly productItem: Locator
  readonly menuButton: Locator
  readonly listItems: Locator


  constructor(page: Page) {
    this.page = page
    this.titulo = page.locator('.app_logo')
    this.cartLink = page.getByTestId('shopping-cart-link')
    this.orderList = page.getByTestId('product-sort-container')
    this.productItem = page.getByRole('listitem')
    this.menuButton = page.getByRole('button', { name: 'Open Menu' })
    this.listItems = page.locator('[data-test="inventory-item"]');
  }

  async addItemToCart(itemName: string): Promise<number> {
    const item = this.listItems.filter({ hasText: itemName })
    const priceText = await item.locator('[data-test="inventory-item-price"]').innerText();
    const priceNumber = parseFloat(priceText.replace('$', ''));
    await item.getByRole('button', { name: 'Add to cart', exact: true }).click();
    return priceNumber;
  }

}