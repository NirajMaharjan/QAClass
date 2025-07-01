import { test, expect } from '@playwright/test';
import { ContactPage } from '../page_object/contact.po';
import { LoginPage } from '../page_object/login.po';
// import { authenticateUser } from '../utils/helper.spec';

const {authenticateUser,createEntity,validateEntity,deleteEntity, getEntity} = require('../utils/helper.spec')
let accessToken;


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
        // const contact = new ContactPage(page);
        // await contact.addContact(contactData.contact.firstName,contactData.contact.lastName,contactData.contact.dob,contactData.contact.email,contactData.contact.phone,contactData.contact.street1,contactData.contact.street2,contactData.contact.city,contactData.contact.state,contactData.contact.postal,contactData.contact.country)
        // await contact.viewContact();
        // await contact.validateContactCreated(contactData.contact.firstName,contactData.contact.lastName,contactData.contact.dob,contactData.contact.email,contactData.contact.phone,contactData.contact.street1,contactData.contact.street2,contactData.contact.city,contactData.contact.state,contactData.contact.postal,contactData.contact.country)

        const contact = new ContactPage(page);
        await contact.addContact(contactData.contact.firstName,contactData.contact.lastName,contactData.contact.dob,contactData.contact.email,contactData.contact.phone,contactData.contact.street1,contactData.contact.street2,contactData.contact.city,contactData.contact.state,contactData.contact.postal,contactData.contact.country)
        await contact.viewContact();
        await contact.validateContactCreated(contactData.contact.firstName,contactData.contact.lastName,contactData.contact.dob,contactData.contact.email,contactData.contact.phone,contactData.contact.street1,contactData.contact.street2,contactData.contact.city,contactData.contact.state,contactData.contact.postal,contactData.contact.country)
        accessToken = await authenticateUser(testData.validUser.userName, testData.validUser.password,{request})
        const id = await getEntity(accessToken,'/contacts','200',{request});
        await deleteEntity(accessToken,`contacts/${id}`,{request});
        await validateEntity(accessToken,`contacts/${id}`,'404',{request});

    })

    
    test.only('Contact Edit test', async ({page,request}) => {



        //edit garna contact add garna parxa so add function ma dependent huna janxa
        //so to prevent that in edit function, we are first creating the contact then only editing to make it independent 
        
        const Data = {
            "firstName" : "Levi",
            "lastName" : "Ackerman",
            "email" : "levi@gmail.com",
            "phone" : "9808983889",
            "street1" : "Address1",
            "city" : "Kathmandu",
            "stateProvince": "State1",
            "postalCode" : "12345",
            "country":"Nepal"
        };

        const contact = new ContactPage(page);
        
        accessToken = await authenticateUser(testData.validUser.userName, testData.validUser.password,{request})
        await createEntity(Data,accessToken,'/contacts',{request});
        page.reload();

        await contact.viewContact(contactData.contact.firstName,contactData.contact.lastName);
        await contact.contactEdit(contactData.contactEdit.firstName);
        await contact.validateContactCreated(contactData.contactEdit.firstName,contactData.contact.lastName,contactData.contact.dob,contactData.contact.email,contactData.contact.phone,contactData.contact.street1,contactData.contact.street2,contactData.contact.city,contactData.contact.state,contactData.contact.postal,contactData.contact.country)
        const id = await getEntity(accessToken, '/contacts','200',{request});
        //id is managed through url rather than passing it to deleteEntity function
        await deleteEntity(accesToken, `/cotnacts/${id}`,{request})
        //to validate if its deleted => if we check the entry thats already deleted it will return status code 404
        await validateEntity(accessToken,`/contacts/${id}`,'404,{request}')



    })

    test('Contact delete test',async({page,request})=>{
        const Data = {
            "firstName" : "Levi",
            "lastName" : "Ackerman",
            "email" : "levi@gmail.com",
            "phone" : "9808983889",
            "street1" : "Address1",
            "city" : "Kathmandu",
            "stateProvince": "State1",
            "postalCode" : "12345",
            "country":"Nepal"
        };

        const contact = new ContactPage(page);
        
        accessToken = await authenticateUser(testData.validUser.userName, testData.validUser.password,{request})
        await createEntity(Data,accessToken,'/contacts',{request});
        page.reload();

        await contact.viewContact(contactData.contact.firstName,contactData.contact.lastName);
        const id = await getEntity(accessToken,'/contacts','200',{request});
        await contact.contactDelete();
        await validateEntity(accessToken,`/contacts/${id}`,'404',{request});

    })
    
})
