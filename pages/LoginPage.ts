import { Locator, Page, expect } from '@playwright/test';

export class LoginPage {
  // 1. Define types for variables
  readonly page: Page;
  readonly usernameInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;
  readonly errorMessage: Locator;

  // 2. Initialize the locators in the constructor
  constructor(page: Page) {
    this.page = page;
    this.usernameInput = page.getByPlaceholder('Enter Your NIK');
    this.passwordInput = page.getByPlaceholder('Enter Your Password');
    this.loginButton = page.getByRole('button', { name: 'Login' });
    this.errorMessage = page.getByRole('alert');
  }

  // 3. Define reusable actions (methods)
  async navigateTo() {
    await this.page.goto('https://telkomcel-s1.lumoshive.net/login');
  }

  async login(user: string, pass: string) {
    await this.usernameInput.fill(user);
    await this.passwordInput.fill(pass);
    await this.loginButton.click();
    //await expect(this.page).not.toHaveURL(/login/);
  }

  async verifyErrorDisplayed() {
    await expect(this.errorMessage).toBeVisible();
    await expect(this.errorMessage).toContainText(/Invalid credential/i);
  }
}
