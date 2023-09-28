const { Videogame, Genre, Platform, conn } = require('../../src/db.js');
const { expect } = require('chai');

describe('Videogame model', () => {
  before(() => conn.authenticate()
    .catch((err) => {
      console.error('Unable to connect to the database:', err);
    }));
  describe('Validators', () => {
    beforeEach(() => Videogame.sync({ force: true }));
    describe('name', () => {
      it('should throw an error if name is null', (done) => {
        Videogame.create({})
          .then(() => done(new Error('It requires a valid name')))
          .catch(() => done());
      });
      it('should work when its a valid name', () => {
        Videogame.create({ name: 'Super Mario Bros' });
      });
      it('should throw error if name is duplicated', (done) => {
        Videogame.create({ name: 'Super Mario Bros' })
          .then(() => Videogame.create({ name: 'Super Mario Bros' }))
          .then(() => done(new Error('It requires a unique name')))
          .catch(() => done());
      });
      it('should throw an error if description is null', (done) => {
        Videogame.create({})
          .then(() => done(new Error('It requires a valid description')))
          .catch(() => done());
      });
      it('should throw error if date is null', (done) => {
        Videogame.create({})
          .then(() => done(new Error('It requires a valid date')))
          .catch(() => done());
      });
    });
  });
});

describe('Genre model', () => {
  before(() => conn.authenticate()
    .catch((err) => {
      console.error('Unable to connect to the database:', err);
    }));
  describe('Validators', () => {
    beforeEach(() => Genre.sync({ force: true }));
    describe('name', () => {
      it('should throw an error if name is null', (done) => {
        Genre.create({})
          .then(() => done(new Error('It requires a valid name')))
          .catch(() => done());
      });
      it('should work when its a valid name', () => {
        Genre.create({ name: 'Action' });
      });
    });
  });
});

describe('Platform model', () => {
  before(() => conn.authenticate()
    .catch((err) => {
      console.error('Unable to connect to the database:', err);
    }));
  describe('Validators', () => {
    beforeEach(() => Platform.sync({ force: true }));
    describe('name', () => {
      it('should throw an error if name is null', (done) => {
        Platform.create({})
          .then(() => done(new Error('It requires a valid name')))
          .catch(() => done());
      });
      it('should work when its a valid name', () => {
        Platform.create({ name: 'PC' });
      });
    });
  });
});
