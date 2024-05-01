import assert from "assert";
import superagent from "superagent";
import Server from "socket.io-client";

// Admin credentials
const adminCredentials = {
  email: "waleed@gmail.com",
  password: "waleed",
};

let adminToken;
let chatId;
let userToken;

describe.only("Chat Module", () => {
  // Authenticate as admin and store the token
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

  // Signup as a new user
  it("Should sign up as a new user", (done) => {
    superagent
      .post("http://localhost:4000/user/signup")
      .send({
        name: "TestUser",
        email: "testuser453453@example.com",
        phoneNumber: "1234567890",
        address: "Test Address",
        password: "testpassword",
      })
      .then((res) => {
        assert.equal(res.status, 201);
        done();
      })
      .catch((err) => done(err));
  });

  // Log in as the newly created user
  it("Should log in as the newly created user", (done) => {
    superagent
      .post("http://localhost:4000/user/login")
      .send({
        email: "testuser33@example.com",
        password: "testpassword",
      })
      .then((res) => {
        assert.equal(res.status, 200);
        userToken = res.body.token;
        done();
      })
      .catch((err) => done(err));
  });

  // Initialize a new chat
  it("Should initialize a new chat", (done) => {
    superagent
      .post("http://localhost:4000/chat/chats")
      .set("Authorization", `Bearer ${userToken}`)
      .then((res) => {
        assert.equal(res.status, 200);
        assert.ok(res.body.chatId);
        chatId = res.body.chatId;
        done();
      })
      .catch((err) => done(err));
  });

  // Send a message in the chat
  it("Should send a message in the chat", (done) => {
    const client = new Server("http://localhost:4000", {
      path: "/socket.io",
      transports: ["websocket"],
    });

    client.on("connect", () => {
      client.emit("joinChat", chatId);
      client.emit("sendMessage", chatId, {
        content: "Test message",
      });
    });

    client.on("newMessage", (messageData) => {
      assert.equal(messageData.content, "Test message");
      client.close();
      done();
    });
  });

  // Log in as admin to check for received messages
  it("Should log in as admin and check for received messages", (done) => {
    superagent
      .post("http://localhost:4000/user/login")
      .send(adminCredentials)
      .then((res) => {
        const adminToken = res.body.token;
        superagent
          .get(`http://localhost:4000/chat/chats/${chatId}/messages`)
          .set("Authorization", `Bearer ${adminToken}`)
          .then((res) => {
            assert.equal(res.status, 200);
            assert.ok(res.body.messages.length > 0);
            done();
          })
          .catch((err) => done(err));
      })
      .catch((err) => done(err));
  });

  // Send a response message as admin
  it("Should send a response message as admin", (done) => {
    superagent
      .post(`http://localhost:4000/chat/chats/${chatId}/messages`)
      .set("Authorization", `Bearer ${adminToken}`)
      .send({ content: "Response message" })
      .then((res) => {
        assert.equal(res.status, 200);
        assert.ok(res.body.message.content, "Response message");
        done();
      })
      .catch((err) => done(err));
  });
});
