const base = require('@playwright/test');
const { BookingClient } = require('../api/clients/booking.client');
const env = require('../config/env');

const test = base.test.extend({
  apiClient: async ({ request }, use) => {
    await use(new BookingClient(request));
  },

  authToken: async ({ request }, use) => {
    const response = await request.post('/auth', {
      data: {
        username: env.api.username,
        password: env.api.password
      }
    });

    const body = await response.json();
    await use(body.token);
  }
});

module.exports = {
  test,
  expect: base.expect
};
