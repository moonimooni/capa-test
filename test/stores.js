const should = require("should");
const request = require("supertest");
const app = require("../src/app");

const constants = require("./constants");

describe("GET /stores", () => {
  it("should return status 200", (done) => {
    request(app)
      .get("/stores")
      .expect(200)
      .end((err, res) => {
        return done();
      });
  });

  it("should return array data", (done) => {
    request(app)
      .get("/stores")
      .expect(200)
      .end((err, res) => {
        should(res.body.data).be.an.instanceof(Array);
        res.body.data.map((store) => {
          should(store).have.properties("name", "postcode");
          should(store.name).be.a.String();
          should(store.postcode).be.a.String();
        });
        return done();
      });
  });

  it("should return data in a given radius", (done) => {
    request(app)
      .get(
        `/stores?postcode=${constants.POSTCODE_SUCCESS}&radius=${constants.RADIUS_SUCCESS}`
      )
      .expect(200)
      .end((err, res) => {
        should(res.body.data).be.an.instanceof(Array);
        should(res.body.data.length).greaterThanOrEqual(1);
        res.body.data.map((store) => {
          should(store).have.properties("name", "postcode");
          should(store.name).be.a.String();
          should(store.postcode).be.a.String();
        });
        return done();
      });
  });

  it("should return error for invalid radius range", (done) => {
    request(app)
      .get(
        `/stores?postcode=${constants.POSTCODE_SUCCESS}&radius=${constants.RADIUS_OVER_RANGE}`
      )
      .expect(400)
      .end((err, res) => {
        should(res.body.message).eql("invalid radius range");
        return done();
      });
  });

  it("should return error for invalid radius type", (done) => {
    request(app)
      .get(
        `/stores?postcode=${constants.POSTCODE_SUCCESS}&radius=${constants.RADIUS_INVALID_VALUE}`
      )
      .expect(400)
      .end((err, res) => {
        return done();
      });
  });

  it("should return error for invalid postcode", (done) => {
    request(app)
      .get(
        `/stores?postcode=${constants.POSTCODE_INVALID}&radius=${constants.RADIUS_SUCCESS}`
      )
      .expect(400)
      .end((err, res) => {
        should(res.body.message).eql("Invalid postcode");
        return done();
      });
  });

  it("should return empty array", (done) => {
    request(app)
      .get(
        `/stores?postcode=${constants.POSTCODE_NOT_EXIST}&radius=${constants.RADIUS_SUCCESS}`
      )
      .expect(200)
      .end((err, res) => {
        should(res.body.data).be.an.instanceof(Array);
        should(res.body.data).empty();
        return done();
      });
  });
});

describe("GET /stores/:storeName", () => {
  it("should return status code 200", (done) => {
    request(app)
      .get(`/stores/${constants.STORE_NAME_SUCCESS}`)
      .expect(200)
      .end((err, res) => {
        return done();
      });
  });

  it("should return one store data", (done) => {
    request(app)
      .get(`/stores/${constants.STORE_NAME_SUCCESS}`)
      .expect(200)
      .end((err, res) => {
        should(res.body.data).have.properties("name", "postcode");
        should(res.body.data.name).be.a.String();
        should(res.body.data.postcode).be.a.String();
        return done();
      });
  });

  it("should return empty data object", (done) => {
    request(app)
      .get(`/stores/${constants.STORE_NAME_NOT_EXIST}`)
      .expect(404)
      .end((err, res) => {
        should(res.body).have.property("message");
        should(res.body.message).eql("store not found");
        return done();
      });
  });
});

describe("GET /stores/:storeName/coordinate", () => {
  it("should return status code 200 and longitude,latitude data", (done) => {
    request(app)
      .get(`/stores/${constants.STORE_NAME_SUCCESS}/coordinate`)
      .expect(200)
      .end((err, res) => {
        should(res.body.data).have.properties("longitude", "latitude");
        should(res.body.data.longitude).be.a.Number();
        should(res.body.data.latitude).be.a.Number();
        return done();
      });
  });

  it("should return store not found message", (done) => {
    request(app)
      .get(`/stores/${constants.STORE_NAME_NOT_EXIST}/coordinate`)
      .expect(404)
      .end((err, res) => {
        should(res.body).have.property("message");
        should(res.body.message).eql("store not found");
        return done();
      });
  });
});
