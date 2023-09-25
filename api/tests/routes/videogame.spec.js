/* eslint-disable import/no-extraneous-dependencies */
const { expect } = require('chai');
const session = require('supertest-session');
const app = require('../../src/app.js');
const { Videogame, conn } = require('../../src/db.js');

const agent = session(app);
const videogame = {
  name: 'Super Mario Bros',
  description_raw: "Super Mario Bros. is a platform game developed and published by Nintendo. The successor to the 1983 arcade game, Mario Bros., and the first in the Super Mario series of",
platforms: "Nintendo",
background_image: "https://media.rawg.io/media/games/328/3283617cb7d75d67257fc58339188742.jpg",
released: "1985-09-13",
rating: 4,
};

describe('Videogame routes', () => {
  before(() => conn.authenticate()
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  }));
  beforeEach(() => Videogame.sync({ force: true })
    .then(() => Videogame.create(videogame)));
  describe('GET /videogames', () => {
    it('should get 200', () =>
      agent.get('/videogames').expect(200)
    );
  });
});
