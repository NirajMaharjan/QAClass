const {expect} = require("@playwright/test")


// use this in test files
exports.LoginPage = class LoginPage{
    constructor(page){
        this.page = page;
        this.usernameInput = "#email";  //css selector
        this.passwordInput = '//input[@placeholder="Password"]';
        this.loginButton = '//button[@id="submit"]';
        this.logout = '//button[@id="logout"]';
        this.loginValidation = '//p[contains(text(),"Click on any contact to view the Contact Details")]';
        this.alertMessage = '//span[@id="error"]'

    }

    async login(username,password){
        await this.page.locator(this.usernameInput).fill(username);
        //direct this.passwprd ni rakna milxa
        await this.page.locator('//input[@placeholder = "Password"]').fill(password);
        await this.page.locator(this.loginButton).click();

    }

    async verifyValidLogin(){
        const LoginValidation = await this.page.locator(this.loginValidation);
        await this.page.waitForTimeout(2000);
        expect(this.logOut).toBeVisible;
        await expect(LoginValidation).toHaveText('Click on any contact to view the Contact Details')
    }

    async verifyInvalidLogin(){
        const LoginValidation = await this.page.locator(this.alertMessage);
        await this.page.waitForTimeout(2000);
        await expect(LoginValidation).toHaveText('Incorrect username or password')
    }

}