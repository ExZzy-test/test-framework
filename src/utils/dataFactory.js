function randomSuffix() {
  return `${Date.now()}-${Math.floor(Math.random() * 10000)}`;
}

function buildBookingPayload(overrides = {}) {
  return {
    firstname: 'Test',
    lastname: `User-${randomSuffix()}`,
    totalprice: 150,
    depositpaid: true,
    bookingdates: {
      checkin: '2026-03-03',
      checkout: '2026-03-10'
    },
    additionalneeds: 'Breakfast',
    ...overrides
  };
}

module.exports = {
  buildBookingPayload
};
