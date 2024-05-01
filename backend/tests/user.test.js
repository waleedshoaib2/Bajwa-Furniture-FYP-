import assert from "assert";
import superagent from "superagent";

const url = "http://localhost:4000/user";

const testUser = {
  name: "John Doe",
  email: "john@example.com",
  phoneNumber: "1234567890",
  address: "123 Main St, City, Country",
  password: "password123",
  isAdmin: false,
  newsletterSubscribed: true,
};
let userId = "";
let token = "";
describe("User Testing", () => {
  describe("User Signup Testing", () => {
    it("Should create a new user with valid data", (done) => {
      superagent
        .post(`${url}/signup`)
        .send(testUser)
        .set("Content-Type", "application/json")
        .then((response) => {
          assert.equal(response.status, 201); // Status code for successful creation
          assert.strictEqual(response.body.message, "User created!");
          done();
        })
        .catch((error) => {
          done(error);
        });
    });
  });

  describe("User Login Testing", () => {
    it("Should login with valid credentials", (done) => {
      superagent
        .post(`${url}/login`)
        .send({ email: testUser.email, password: testUser.password })
        .set("Content-Type", "application/json")
        .then((response) => {
          assert.equal(response.status, 200);
          assert.strictEqual(response.body.name, testUser.name);
          assert.strictEqual(response.body.email, testUser.email);
          assert.strictEqual(response.body.phoneno, testUser.phoneNumber);
          assert.strictEqual(response.body.address, testUser.address);
          assert.strictEqual(response.body.isAdmin, testUser.isAdmin);
          token = response.body.token;
          userId = response.body._id;
          assert(response.body.token);
          done();
        })
        .catch((error) => {
          done(error);
        });
    });
  });

  describe("User Profile Testing", () => {
    it("Should fetch user profile after login", (done) => {
      // Assuming token is available from previous login test

      superagent
        .get(`${url}/profile`)
        .set("Authorization", `Bearer ${token}`)
        .then((response) => {
          assert.equal(response.status, 200);
          assert.strictEqual(response.body.name, testUser.name);
          assert.strictEqual(response.body.email, testUser.email);
          assert.strictEqual(response.body.phoneNumber, testUser.phoneNumber);
          assert.strictEqual(response.body.address, testUser.address);
          assert.strictEqual(response.body.isAdmin, testUser.isAdmin);
          done();
        })
        .catch((error) => {
          done(error);
        });
    });
  });
});
