const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../../index');

chai.use(chaiHttp);
const { expect } = chai;

describe('Ubicaciones API', () => {

  // Test: Obtener todas las ubicaciones
  it('Debería obtener todas las ubicaciones', (done) => {
    chai.request(app)
      .get('/api/locations')
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.be.an('array');
        expect(res.body[0]).to.have.property('id');
        expect(res.body[0]).to.have.property('name');
        done();
      });
  });

  // Test: Obtener una ubicación por ID
  it('Debería obtener una ubicación por ID', (done) => {
    const locationId = 1;
    chai.request(app)
      .get(`/api/locations/${locationId}`)
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.have.property('id').eql(locationId);
        done();
      });
  });

  // Test: Agregar una nueva ubicación
  it('Debería agregar una nueva ubicación', (done) => {
    const newLocation = {
      name: 'Ubicación Test',
      lat: 40.712776,
      lng: -74.005974
    };

    chai.request(app)
      .post('/api/locations')
      .send(newLocation)
      .end((err, res) => {
        expect(res).to.have.status(201);
        expect(res.body).to.have.property('name').eql(newLocation.name);
        done();
      });
  });

  // Test: Actualizar una ubicación existente
  it('Debería actualizar una ubicación', (done) => {
    const locationId = 1;
    const updatedLocation = {
      name: 'Ubicación Actualizada'
    };

    chai.request(app)
      .patch(`/api/locations/${locationId}`)
      .send(updatedLocation)
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.have.property('name').eql(updatedLocation.name);
        done();
      });
  });

  // Test: Eliminar una ubicación
  it('Debería eliminar una ubicación', (done) => {
    const locationId = 1;
    chai.request(app)
      .delete(`/api/locations/${locationId}`)
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.have.property('message').eql('Ubicación eliminada con éxito');
        done();
      });
  });
});