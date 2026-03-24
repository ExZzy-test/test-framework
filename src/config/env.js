module.exports = {
  ui: {
    baseUrl: process.env.UI_BASE_URL || 'https://www.saucedemo.com',
    username: process.env.UI_USERNAME || 'standard_user',
    password: process.env.UI_PASSWORD || 'secret_sauce'
  },
  api: {
    baseUrl: process.env.API_BASE_URL || 'https://restful-booker.herokuapp.com',
    username: process.env.API_USERNAME || 'admin',
    password: process.env.API_PASSWORD || 'password123'
  }
};
