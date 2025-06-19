import { test, expect } from '@playwright/test';
import { ContactPage } from '../page_object/contact.po';
import { LoginPage } from '../page_object/login.po';

const contactData = require('../fixtures/contactFixture.json')
const testData = require('../fixtures/loginFixture.json')

//this step will be same for all tests
test.beforeEach(async ({page})=>{

    const login = new LoginPage(page);
    
    await page.goto('/')
    await login.login(testData.validUser.userName,testData.validUser.password);
    await login.verifyValidLogin();
})

test.describe('Contact testcases', () => {



    test('Contact add test', async ({page,request}) => {
        const contact = new ContactPage(page);
        await contact.addContact(contactData.contact.firstName,contactData.contact.lastName,contactData.contact.dob,contactData.contact.email,contactData.contact.phone,contactData.contact.street1,contactData.contact.street2,contactData.contact.city,contactData.contact.state,contactData.contact.postal,contactData.contact.country)
        await contact.validateContactCreated(contactData.contact.firstName,contactData.contact.lastName,contactData.contact.dob,contactData.contact.email,contactData.contact.phone,contactData.contact.street1,contactData.contact.street2,contactData.contact.city,contactData.contact.state,contactData.contact.postal,contactData.contact.country)
    })
    
})
