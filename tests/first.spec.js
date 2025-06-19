// @ts-check
import { test, expect } from '@playwright/test';

test('has title', async ({ page }) => {
  await page.goto('https://github.com/login');

  // Expect a title to contain a substring.
  await expect(page).toHaveTitle(/Sign in to GitHub · GitHub/);
});



test('invalid password', async ({ page }) => {
  
  await page.goto('https://github.com/login');


 

  
  await page.fill("//*[@type='text']", 'maharjanniraj87@gmail.com');
  await page.fill("//*[@type='password']", 'helloworld');

 
  await page.click('input[type="submit"]');

  
   await expect(page.getByText('Incorrect username or password.')).toBeVisible();
});



test('Forgot password link', async ({ page }) => {
  
  await page.goto('https://github.com/login');
  

 
  await page.click('//input[@id,forgot-password');
  await page.fill("//*[@type='text']", 'maharjanniraj87@gmail.com');

  
   await expect(page.getByText('Incorrect username or password.')).toBeVisible();
});


test('invalid username', async ({ page }) => {
  
  await page.goto('https://github.com/login');
  
  await page.fill("//*[@type='text']", 'maharjan87@gmail.com');
  await page.fill("//*[@type='password']", 'helloworld703703');

 
  await page.click('input[type="submit"]');

  
   await expect(page.getByText('Incorrect username or password.')).toBeVisible();
});




test('successful login', async ({ page }) => {
  
  await page.goto('https://github.com/login');

  await page.fill("//*[@type='text']", 'maharjanniraj87@gmail.com');
  await page.fill("//*[@type='password']", 'helloworld703703');

 
  await page.click('input[type="submit"]');

  // Assert successful login (redirected to dashboard or specific element appears)
  await expect(page).toHaveURL('https://github.com');
  // await expect(page.getByText('Dashboard')).toBeVisible();
});