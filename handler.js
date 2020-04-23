'use strict';

const axios = require('axios');
const auth = require('./auth');

const hello = async event => {
  return {
    statusCode: 200,
    body: JSON.stringify(
      {
        message: 'Go Serverless v1.0! Your function executed successfully!',
        input: event,
      },
      null,
      2
    ),
  };
};


const getAddress = async event => {
  const { zip } = event.pathParameters;
  const { Authorization } = event.headers;
  const authorize = auth(Authorization);
  if (!authorize) {
    return {
      statusCode: 403,
      body: JSON.stringify({
        message: 'Unauthorize'
      })
    };
  }

  try {
    const response = await axios(`https://viacep.com.br/ws/${zip}/json/`);
    return {
      statusCode: 200,
      body: JSON.stringify({
        address: response.data
      })
    }
  } catch (error) {
    return {
      statusCode: 400,
      body: JSON.stringify({
        error: error.message
      })
    }
  }
  
};

module.exports = {
  hello,
  getAddress
};
