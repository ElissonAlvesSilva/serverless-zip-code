const auth = (input) => {
  const authorization = input;
  const slsAuth = process.env.SERVERLESS_AUTHORIZATION;

  if (authorization !== slsAuth) {
    return false;
  }
  return true;
};

module.exports = auth;