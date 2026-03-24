const Ajv = require('ajv');
const { test, expect } = require('../../../src/fixtures/api.fixture');
const { buildBookingPayload } = require('../../../src/utils/dataFactory');
const env = require('../../../src/config/env');

const ajv = new Ajv();
const bookingSchema = {
  type: 'object',
  required: ['firstname', 'lastname', 'totalprice', 'depositpaid', 'bookingdates'],
  properties: {
    firstname: { type: 'string' },
    lastname: { type: 'string' },
    totalprice: { type: 'number' },
    depositpaid: { type: 'boolean' },
    bookingdates: {
      type: 'object',
      required: ['checkin', 'checkout'],
      properties: {
        checkin: { type: 'string' },
        checkout: { type: 'string' }
      }
    },
    additionalneeds: { type: 'string' }
  }
};

const validateBooking = ajv.compile(bookingSchema);

test.describe('Restful-Booker API', () => {
  test('can create and get booking by id', async ({ apiClient }) => {
    const payload = buildBookingPayload();

    const createResponse = await apiClient.createBooking(payload);
    expect(createResponse.status()).toBe(200);

    const createBody = await createResponse.json();
    expect(createBody.bookingid).toBeDefined();
    expect(createBody.booking.firstname).toBe(payload.firstname);

    const getResponse = await apiClient.getBooking(createBody.bookingid);
    expect(getResponse.status()).toBe(200);

    const getBody = await getResponse.json();
    expect(validateBooking(getBody)).toBeTruthy();
    expect(getBody.lastname).toBe(payload.lastname);
  });

  test('can update booking with valid auth token', async ({ apiClient, authToken }) => {
    const payload = buildBookingPayload();
    const createResponse = await apiClient.createBooking(payload);
    const { bookingid } = await createResponse.json();

    const updatedPayload = buildBookingPayload({
      firstname: 'Updated',
      lastname: 'User',
      totalprice: 300,
      additionalneeds: 'Late checkout'
    });

    const updateResponse = await apiClient.updateBooking(bookingid, updatedPayload, authToken);
    expect(updateResponse.status()).toBe(200);

    const updateBody = await updateResponse.json();
    expect(updateBody.firstname).toBe('Updated');
    expect(updateBody.totalprice).toBe(300);
    expect(updateBody.additionalneeds).toBe('Late checkout');
  });

  test('cannot update booking without auth token', async ({ apiClient }) => {
    const payload = buildBookingPayload();
    const createResponse = await apiClient.createBooking(payload);
    const { bookingid } = await createResponse.json();

    const updateResponse = await apiClient.updateBooking(bookingid, buildBookingPayload({ firstname: 'Blocked' }), 'invalid-token');
    expect([403, 500]).toContain(updateResponse.status());
  });

  test('can delete booking with valid auth token', async ({ apiClient, authToken }) => {
    const payload = buildBookingPayload();
    const createResponse = await apiClient.createBooking(payload);
    const { bookingid } = await createResponse.json();

    const deleteResponse = await apiClient.deleteBooking(bookingid, authToken);
    expect(deleteResponse.status()).toBe(201);

    const getResponse = await apiClient.getBooking(bookingid);
    expect(getResponse.status()).toBe(404);
  });

  test('can authenticate successfully', async ({ apiClient }) => {
    const authResponse = await apiClient.authenticate(env.api.username, env.api.password);
    expect(authResponse.status()).toBe(200);

    const authBody = await authResponse.json();
    expect(authBody.token).toBeTruthy();
  });
});
