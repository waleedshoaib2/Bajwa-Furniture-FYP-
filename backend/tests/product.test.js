import assert from "assert";
import superagent from "superagent";

// Admin credentials
const adminCredentials = {
  email: "waleed@gmail.com",
  password: "waleed",
};

let adminToken;
let categoryId;
let productId;
let userToken;
describe("Category Endpoints", () => {
  before((done) => {
    superagent
      .post("http://localhost:4000/user/login")
      .send(adminCredentials)
      .then((res) => {
        adminToken = res.body.token;
        done();
      })
      .catch((err) => done(err));
  });

  it("Should create a new category", (done) => {
    superagent
      .post("http://localhost:4000/categories")
      .set("Authorization", `Bearer ${adminToken}`)
      .send({
        name: "Test Category",
        description: "Description of Test Category",
      })
      .then((res) => {
        assert.equal(res.status, 201);
        assert.ok(res.body.category._id);
        categoryId = res.body.category._id;
        done();
      })
      .catch((err) => done(err));
  });

  it("Should fetch all categories", (done) => {
    superagent
      .get("http://localhost:4000/categories")
      .set("Authorization", `Bearer ${adminToken}`)
      .then((res) => {
        assert.equal(res.status, 200);
        assert.ok(res.body.length > 0);
        done();
      })
      .catch((err) => done(err));
  });

  // Test case: Update category
  it("Should update the created category", (done) => {
    superagent
      .put(`http://localhost:4000/categories/${categoryId}`)
      .set("Authorization", `Bearer ${adminToken}`)
      .send({ name: "Updated Category Name" })
      .then((res) => {
        assert.equal(res.status, 200);
        assert.equal(res.body.category.name, "Updated Category Name");
        done();
      })
      .catch((err) => done(err));
  });

  it("Should delete the created category", (done) => {
    superagent
      .delete(`http://localhost:4000/categories/${categoryId}`)
      .set("Authorization", `Bearer ${adminToken}`)
      .then((res) => {
        assert.equal(res.status, 200);
        assert.equal(res.body.message, "Category deleted successfully");
        done();
      })
      .catch((err) => done(err));
  });
});

describe("Product Endpoints", () => {
  const userCredentials = {
    email: "kashmala@gmail.com",
    password: "090909",
  };

  before((done) => {
    superagent
      .post("http://localhost:4000/user/login")
      .send(userCredentials)
      .then((res) => {
        userToken = res.body.token;
        done();
      })
      .catch((err) => done(err));
  });

  // Test case: Create a new product
  it("Should create a new product", (done) => {
    superagent
      .post("http://localhost:4000/product/create")
      .set("Authorization", `Bearer ${adminToken}`) // Assuming admin is creating the product
      .send({
        productno: "PROD001",
        name: "Test Product",
        description: "Description of Test Product",
        category: categoryId, // Use the stored category ID
        price: 100,
        material: "Material",
        color: "Color",
        image: "afhdfh",
      })
      .then((res) => {
        assert.equal(res.status, 201);
        assert.ok(res.body._id);
        productId = res.body._id;
        done();
      })
      .catch((err) => done(err));
  });

  // Test case: Fetch all products
  it("Should fetch all products", (done) => {
    superagent
      .get("http://localhost:4000/product/getallproduct")
      .set("Authorization", `Bearer ${adminToken}`) // Assuming admin is fetching all products
      .then((res) => {
        assert.equal(res.status, 200);
        assert.ok(res.body.length > 0);
        done();
      })
      .catch((err) => done(err));
  });

  // Test case: Fetch product by ID
  it("Should fetch product by ID", (done) => {
    superagent
      .get(`http://localhost:4000/product/getproduct/${productId}`)
      .set("Authorization", `Bearer ${adminToken}`)
      .then((res) => {
        assert.equal(res.status, 200);
        assert.ok(res.body._id === productId);
        done();
      })
      .catch((err) => done(err));
  });

  // Test case: Update product
  it("Should update the created product", (done) => {
    superagent
      .put(`http://localhost:4000/product/updateproduct/${productId}`)
      .set("Authorization", `Bearer ${adminToken}`)
      .send({ name: "Updated Product Name" })
      .then((res) => {
        assert.equal(res.status, 200);
        assert.equal(res.body.name, "Updated Product Name");
        done();
      })
      .catch((err) => done(err));
  });

  // Test case: Delete product
  it("Should delete the created product", (done) => {
    superagent
      .delete(`http://localhost:4000/product/delete/${productId}`)
      .set("Authorization", `Bearer ${adminToken}`)
      .then((res) => {
        assert.equal(res.status, 200);
        assert.equal(res.body.message, "Product deleted successfully");
        done();
      })
      .catch((err) => done(err));
  });
});
