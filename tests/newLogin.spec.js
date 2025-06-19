import { test, expect } from '@playwright/test';
import { LoginPage } from '../page_object/login.po';

const testData = require('../fixtures/loginFixture.json')

//this step will be same for all tests
test.beforeEach(async ({page})=>{
    await page.goto('/')
})

//here slash is base url ; it is configured in config file (in use section => baseUrl)
//yesma kei halyo vane baseUrl mau concat hudai janxa /dashboard /profile


//describe : for giving description of any test
test.describe('Valid login tests', () => {
    test('Login using valid username and password', async ({page}) => {
        const login = new LoginPage(page);
        await login.login(testData.validUser.userName,testData.validUser.password);
        await login.verifyValidLogin();
    })
})

test.describe('Invalid login tests', ()=>{
    test('Login using invalid username and valid password', async ({page})=>{
        const login = new LoginPage(page);
        await login.login("niraj","Niraz123456");
        await login.verifyInvalidLogin();
    })

    test('Login using valid username and invalid password', async ({page})=>{
        const login = new LoginPage(page);
        await login.login("niraj@gmail.com","maharjan");
        await login.verifyInvalidLogin();
    })

    test('Login using invalid username and invalid password', async ({page})=>{
        const login = new LoginPage(page);
        await login.login(testData.invalidUser.userName,testData.invalidUser.password);
        await login.verifyInvalidLogin();
    })
})


//in newer versions of playwright, this is done automatically
test.beforeEach(async ({page})=>{
    await page.close()
})