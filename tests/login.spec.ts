import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage'; // Import your POM class

test('Login failed scenario using POM', async ({ page }) => {
  // Initialize the Page Object
  const loginPage = new LoginPage(page);

  // Execute clean, readable steps
  await loginPage.navigateTo();
  await expect(page.getByText(/continue/i)).toBeVisible(); 
  await loginPage.login('invalid_user', 'invalid_password');
  await loginPage.verifyErrorDisplayed();
});
  
