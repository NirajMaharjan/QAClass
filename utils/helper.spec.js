const { expect } = require('@playwright/test')
const axios = require('axios')
const cookie = require('cookie')

let apiUrl

async function authenticateUser(username,password,{request}){
    //here api url and our website url is same ; so getApiBaseUrl() is not mandatory
    const apiUrl = await getApiBaseUrl();
    const headers = {
        'Content-Type' : 'application/json',
    };

    const requestBody = {
        email : username,
        password:password

    };
    const response = await request.post(`${apiUrl}/users/login`,{
        data:requestBody,
        headers
    });
    expect(response.status()).toBe(200);
    const responseBody = await response.json();
    const token = responseBody.token;
    return token;
}


async function getApiBaseUrl(){
    apiUrl = process.env.API_BASE_URL;
    if(!apiUrl){
        apiUrl = 'https://thinking-tester-contact-list.herokuapp.com'
    }
    return apiUrl
}

exports.authenticateUser = authenticateUser