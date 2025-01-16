const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../../index');

chai.use(chaiHttp);
const { expect } = chai;

describe('Elementos API', () => {

  // Test: Obtener todos los elementos
  it('Debería obtener todos los elementos', (done) => {
    chai.request(app)
      .get('/api/elements')
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.be.an('array');
        done();
      });
  });

  // Test: Obtener un elemento por ID
  it('Debería obtener un elemento por ID', (done) => {
    const elementId = 1;
    chai.request(app)
      .get(`/api/elements/${elementId}`)
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.have.property('id').eql(elementId);
        done();
      });
  });

  // Test: Agregar un nuevo elemento
  it('Debería agregar un nuevo elemento', (done) => {
    const newElement = {
      name: 'Elemento Test',
      lat: 40.712776,
      lng: -74.005974,
      associatedLocationId: 1
    };

    chai.request(app)
      .post('/api/elements')
      .send(newElement)
      .end((err, res) => {
        expect(res).to.have.status(201);
        expect(res.body).to.have.property('name').eql(newElement.name);
        done();
      });
  });

  // Test: Actualizar un elemento existente
  it('Debería actualizar un elemento', (done) => {
    const elementId = 1;
    const updatedElement = {
      name: 'Elemento Actualizado'
    };

    chai.request(app)
      .patch(`/api/elements/${elementId}`)
      .send(updatedElement)
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.have.property('name').eql(updatedElement.name);
        done();
      });
  });

  // Test: Eliminar un elemento
  it('Debería eliminar un elemento', (done) => {
    const elementId = 1;
    chai.request(app)
      .delete(`/api/elements/${elementId}`)
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.have.property('message').eql('Elemento eliminado con éxito');
        done();
      });
  });
});