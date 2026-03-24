class BookingClient {
  constructor(request) {
    this.request = request;
  }

  async authenticate(username, password) {
    return this.request.post('/auth', {
      data: { username, password }
    });
  }

  async createBooking(payload) {
    return this.request.post('/booking', {
      data: payload
    });
  }

  async getBooking(id) {
    return this.request.get(`/booking/${id}`);
  }

  async updateBooking(id, payload, token) {
    return this.request.put(`/booking/${id}`, {
      data: payload,
      headers: {
        Cookie: `token=${token}`
      }
    });
  }

  async partialUpdateBooking(id, payload, token) {
    return this.request.patch(`/booking/${id}`, {
      data: payload,
      headers: {
        Cookie: `token=${token}`
      }
    });
  }

  async deleteBooking(id, token) {
    return this.request.delete(`/booking/${id}`, {
      headers: {
        Cookie: `token=${token}`
      }
    });
  }
}

module.exports = { BookingClient };
