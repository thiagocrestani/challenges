var request = require("request");
var urlBase = "http://admin:123456@localhost:8000/";
var chai = require("chai");
var expect = chai.expect;
const userController = require("../src/controllers/UserController");

describe("Test Hero methods", function () {
  it("Test CRUD hero", async function (done) {
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
        const token = body.token;
        request.post(
          {
            url: urlBase + "createNewHero",
            headers: {
              authorization: `Bearer ${token}`,
            },
            form: {
              name: "HeroTest",
              class: "S",
            },
          },
          function (error, response, body) {
            try {
              body = JSON.parse(body);
            } catch (e) {
              body = {};
            }
            expect(body.name).to.equal("HeroTest");
            expect(body.class).to.equal("S");
            const idHero = body._id;

            request.post(
              {
                url: urlBase + "getHero",
                headers: {
                  authorization: `Bearer ${token}`,
                },
                form: {
                  _id: idHero,
                },
              },
              function (error, response, body) {
                try {
                  body = JSON.parse(body);
                } catch (e) {
                  body = {};
                }
                expect(body._id).to.equal(idHero);
                expect(body.name).to.equal("HeroTest");
                expect(body.class).to.equal("S");

                request.post(
                  {
                    url: urlBase + "deleteHero",
                    headers: {
                      authorization: `Bearer ${token}`,
                    },
                    form: {
                      _id: idHero,
                    },
                  },
                  function (error, response, body) {
                    try {
                      body = JSON.parse(body);
                    } catch (e) {
                      body = {};
                    }
                    expect(body.ok).to.equal(1);
                    expect(body.deletedCount).to.equal(1);
                  }
                );
              }
            );
          }
        );
      }
    );
    done();
  });
});
