const { expect } = require('@playwright/test')
// const axios = require('axios')
// const cookie = require('cookie')

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


async function createEntity(userData, accessToken, module, {request}){
    const apiUrl = await getApiBaseUrl();

    const headers = {
        'Content-Type' : 'application/json',
        'Accept' : 'application/json',
        'authorization' : "Bearer " + accessToken,
    };

    const response = await request.post(apiUrl + module, {
        headers,
        data : JSON.stringify(userData),
    })

    const responseBody = await response.json();
    const statusCode = response.status();
    expect(statusCode).toBe(201);

    if (responseBody && responseBody.id){
        return responseBody.id;
    }
    else{
        return null;
    }
}


async function getEntity(accessToken,module,status,{request}){
    const apiUrl = await getApiBaseUrl();

    const headers = {
        'Content-Type' : 'applciation/json',
        'Accept' : 'application/json',
        'authorization' : 'Bearer ' + accessToken,
    };

    const response = await request.get(apiUrl + module, {
        headers,
    })

    const statusCode = response.status();
    expect(statusCode).toBe(parentInt(status));

    const responseBody = await response.json();

    if(responseBody && responseBody[0]._id){
        return responseBody[0]._id;

    }
    else{
        return null;
    }
}



//every time unique data entry garna
//concat this in name
async function getCurrentDateTimeStamp(){
    const now = new Date();
    const year = now.getFullYear()
    const month = (now.getMonth()+1).toString().padStart(2,'0');
    const day = now.getDate().toString().padStart(2,'0')
    const hours = now.getHours().toString().padStart(2,'0')
    const minutes = now.getMinutes().toString().padStart(2,'0')
    const seconds = now.getSeconds().toString().padStart(2,'0')

    return `${year}-${month}-${day}-${hours}-${minutes}-${seconds}`;
    


}



//which entity to delete? here the entity id will be managed via url
async function deleteEntity(accessToken,module,{request}){
    const apiUrl =  await getApiBaseUrl();

    const headers = {
        'Content-Type' : 'applciation/json',
        'Accept' : 'application/json',
        'authorization' : 'Bearer ' + accessToken,
    };

    const response = await request.delete(apiUrl+module,{
        headers
    })

    const statusCode = response.status();
    expect(statusCode).toBe(200);
}


async function validateEntity(accessToken,module,status,{request}){
    const apiUrl = await getApiBaseUrl();

    const headers = {
        'Content-Type' : 'applciation/json',
        'Accept' : 'application/json',
        'authorization' : 'Bearer ' + accessToken,
    };

    const response = await request.get(apiUrl + module, {
        headers,
    })

    const statusCode = response.status();
    expect(statusCode).toBe(parentInt(status));

}


module.exports = {authenticateUser,getEntity,createEntity,deleteEntity,validateEntity}