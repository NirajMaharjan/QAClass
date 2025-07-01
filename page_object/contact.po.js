const {expect} = require("@playwright/test");
const { asyncWrapProviders } = require("async_hooks");


// use this in test files
exports.ContactPage = class ContactPage{

    //locators
    constructor(page){
        this.page = page;

        this.addContactButton = '//button[@id="add-contact"]';

        this.firstNameInput ='#firstName';  
        this.lastNameInput ='//input[@id="lastName"]';  
        this.birthDateInput ='//input[@id="birthdate"]';  
        this.emailInput ='//input[@id="email"]';  
        this.phoneInput ='//input[@id="phone"]';  
        this.streetOneInput ='//input[@id="street1"]';  
        this.streetTwoInput ='//input[@id="street2"]';  
        this.cityInput ='//input[@placeholder="City"]';  
        this.stateProvinceInput ='//input[@id="stateProvince"]';  
        this.postalCodeInput ='//input[@id="postalCode"]';  
        this.countryInput ='//input[@id="country"]';  

        this.submitButton = '//button[@id="submit"]';
        this.cancelButton = '//button[@id="cancel"]'; 
        
        this.alertMessage = '//span[@id="error"]';


        this.savedFirstName ='#firstName';  
        this.savedLastName ='//span[@id="lastName"]';  
        this.savedBirthDate ='//span[@id="birthdate"]';  
        this.savedEmail ='//span[@id="email"]';  
        this.savedPhone ='//span[@id="phone"]';  
        this.savedStreetOne ='//span[@id="street1"]';  
        this.savedStreetTwo ='//span[@id="street2"]';  
        this.savedCity ='//span[@placeholder="City"]';  
        this.savedStateProvince ='//span[@id="stateProvince"]';  
        this.savedPostalCode ='//span[@id="postalCode"]';  
        this.savedCountry ='//span[@id="country"]';  


        this.viewCreatedContact = '//tr[@class="contactTableBodyRow"]';
        this.editButton = '//button[@id="edit-contact"]';
        this.deleteContact='//button[@id="delete-contact]';

        

    }
       

        //actions (fill the fields)
    async addContact(firstName,lastName,birthDate,email,phone,street1,street2,city,stateProvince,postalCode,country){


        await this.page.locator(this.addContactButton).click();
        
        await this.page.locator(this.firstNameInput).fill(firstName);
        await this.page.locator(this.lastNameInput).fill(lastName);
        await this.page.locator(this.birthDateInput).fill(birthDate);
        await this.page.locator(this.emailInput).fill(email);
        await this.page.locator(this.streetOneInput).fill(street1);
        await this.page.locator(this.streetTwoInput).fill(street2);
        await this.page.locator(this.phoneInput).fill(phone);
        await this.page.locator(this.cityInput).fill(city);
        await this.page.locator(this.stateProvinceInput).fill(stateProvince);
        await this.page.locator(this.postalCodeInput).fill(postalCode);
        await this.page.locator(this.countryInput).fill(country);

        // await this.page.waitForTimeout(3000)
      
        await this.page.locator(this.submitButton).click();

    }


    async validateContactCreated(fName,lName,dob,email,phone,street1,street2,city,stateProvince,postalCode,country){
        await this.page.locator(this.viewCreatedContact).click();

        const fNameValidation = await this.page.locator(this.savedFirstName);
        const lNameValidation = await this.page.locator(this.savedLastName);
        const dobValidation = await this.page.locator(this.savedBirthDate);
        const emailValidation  = await this.page.locator(this.savedEmail);
        const phoneValidation = await this.page.locator(this.savedPhone);
        const street2Validation = await this.page.locator(this.savedStreetTwo);
        const street1Validation = await this.page.locator(this.savedStreetOne);
        const cityValidation = await this.page.locator(this.savedCity);
        const  stateProvinceValidation= await this.page.locator(this.savedStateProvince);
        const postalCodeValidation = await this.page.locator(this.savedPostalCode);
        const countryValidation = await this.page.locator(this.savedCountry);

        await expect(fNameValidation).toHaveText(fName);
        await expect(lNameValidation).toHaveText(lName);
        await expect(dobValidation).toHaveText(dob);
        await expect(emailValidation).toHaveText(email);
        await expect(phoneValidation).toHaveText(street1);
        await expect(street1Validation).toHaveText(street2);
        await expect(street2Validation).toHaveText(phone);
        await expect(cityValidation).toHaveText(stateProvince);
        await expect(postalCodeValidation).toHaveText(postalCode);
        await expect(countryValidation).toHaveText(country);
        await expect(stateProvinceValidation).toHaveText(city);
        
    }

    async viewContact(fname,lname){
        // await this.page.locator(this.viewCreatedContact).click();
        const fullName = `${fname} ${lname}`
        this.page.reload();
        //wait for the row containing the full name and click it
        await this.page.locator(`//tr[td[text()='${fullName}']]`).first().click();

    }

    async editContact(firstName){
        await this.page.locator(this.editContact).click();
        await this.page.waitForTimeout(2000);
        await this.page.locator(this.firstNameInput).clear();
        await this.page.locator(this.firstNameInput).fill(firstName);
        await this.page.waitForTimeout(2000);
        await this.page.locator(this.Save).click();

    }

    async contactDelete(){
        await this.page.waitForTimeout(2000);
        //ekcjoti expect garya ho dialog auxa ki vanera
        this.page.once('dialog', async dialog => {
            console.log(`Dialog message: ${dialog.message()}`);
            await dialog.accept(); //use dialog.dismiss() if you want to cancel instead
        });
        await this.page.locator(this.deleteContact).click()
    }

    



    


}