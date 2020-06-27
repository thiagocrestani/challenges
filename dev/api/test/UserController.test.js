var request = require("request");
var urlBase = "http://localhost:8000/";
var chai = require("chai");
var expect = chai.expect;

describe("Test User methods", function () {
  it("Test login method", function (done) {
    request.post(
      {
        url: urlBase + "authenticateUser",
        form: {
          login: "admin",
          password: "123456",
        },
      },
      function (error, response, body) {
        try {
          body = JSON.parse(body);
        } catch (e) {
          body = {};
        }
        expect(body.user.name).to.equal("Admin");
        done();
      }
    );
  });

  it("Test restriced pages", async function (done) {
    request.get(
      {
        url: urlBase + "getAllHeroes",
      },
      function (error, response, body) {
        try {
          body = JSON.parse(body);
        } catch (e) {
          body = {};
        }
        expect(body.message).to.equal("Token inválido");
      }
    );
    done();
  });
});
