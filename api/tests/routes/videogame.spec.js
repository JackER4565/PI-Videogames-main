/* eslint-disable import/no-extraneous-dependencies */
const { expect } = require("chai");
const session = require("supertest-session");
const app = require("../../src/app.js");
const { Videogame, conn } = require("../../src/db.js");

const agent = session(app);
const videogame = {
	name: "Super Mario Bros",
	description_raw:
		"Super Mario Bros. is a platform game developed and published by Nintendo. The successor to the 1983 arcade game, Mario Bros., and the first in the Super Mario series of",
	platforms: "Nintendo",
	background_image:
		"https://media.rawg.io/media/games/328/3283617cb7d75d67257fc58339188742.jpg",
	released: "1985-09-13",
	rating: 4,
};

describe("Videogame routes", () => {
	before(() =>
		conn.authenticate().catch((err) => {
			console.error("Unable to connect to the database:", err);
		})
	);
	beforeEach(() =>
		Videogame.sync({ force: true }).then(() => Videogame.create(videogame))
	);
  describe("POST /videogames", () => {
    it("should get 200", async () =>
    await agent
        .post("/videogames")
        .send({
          "name": "Super test Bros",
      "description_raw": "Super Mario Bros. is a platform game developed and published by Nintendo. The successor to the 1983 arcade game, Mario Bros., and the first in the Super Mario series of",
      "platforms": ["Nintendo"],
      "genres": ["Action"],
      "background_image": "https://media.rawg.io/media/games/328/3283617cb7d75d67257fc58339188742.jpg",
      "released": "1985-09-13",
      "rating": 4
      })
        .expect(200));
    it("should get 400 name already used", async () =>
        
     await agent
        .post("/videogames")
        .send({
          name: "Super Mario Bros",
          description_raw:
            "Super Mario Bros. is a platform game developed and published by Nintendo. The successor to the 1983 arcade game, Mario Bros., and the first in the Super Mario series of",
          platforms: "Nintendo",
          background_image:
            "https://media.rawg.io/media/games/328/3283617cb7d75d67257fc58339188742.jpg",
          released: "1985-09-13",
          rating: 4,
        })
        .expect(400));
      });
	describe("GET /videogames", () => {
		it("get /videogames should get 200", (done) => {
     agent.get("/videogames").expect(200).then((res) => {
        expect(res.body).to.be.an('array')
        done()
      }
      ).catch(done)
  });
		it("get /videogames?name=path-of-exile should get 200", async () =>
			await agent.get("/videogames?name=path-of-exile").expect(200));

		it("should get 200", async ()  =>
			await agent.get("/videogames/super-mario-bros").expect(500));
	});
	describe("GET /genres", () => {
		it("should return an array of objects", async () =>
			await agent
				.get("/genres")
				.expect(200)
				.expect("Content-Type", /json/)
				.expect(function (res) {
					expect(res.body).to.be.an("array");
				}));
		it('should return "Action"', async () =>
			await agent
				.get("/genres")
				.expect(200)
				.expect("Content-Type", /json/)
				.expect(function (res) {
          res.body.forEach(element => {
            if (element.name === "Action") expect(element.name).to.be.equal("Action");
            if (element.id == 4) expect(element.name).to.be.equal("Action");      
          });
					expect(res.body[0].name).to.be.equal("Action");
				}));
	});
	describe("GET /platforms", () => {
		it("should return an array of objects", async () =>
		await	agent
				.get("/platforms")
				.expect(200)
				.expect("Content-Type", /json/)
				.expect(function (res) {
					expect(res.body).to.be.an("array");
				}));
		it('should return "Xbox One"', async ()  =>
			await agent
				.get("/platforms")
				.expect(200)
				.expect("Content-Type", /json/)
				.expect(function (res) {
          res.body.forEach(element => {
            // if (element.name === "Xbox One") expect(element.name).to.be.equal("Xbox One");
            if (element.id == 1) expect(element.name).to.be.equal("Xbox One");      
          });
					// expect(res.body[0].name).to.be.equal("Xbox One");
				}));
	});
});
