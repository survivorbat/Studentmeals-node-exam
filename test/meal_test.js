const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../server');
const should = chai.should();
const expect = chai.expect();

let token = "";

chai.use(chaiHttp);
describe('Meal API interface', () => {
  it('should POST /api/login token correctly', done => {
		chai.request(server)
			.post('/api/login')
			.send({studentNumber:'0',password:'test123test321'})
			.end((err, res) => {
				res.should.have.status(200);
				token = res.body.token;
				done();
			});
  });
	it('should GET /api/meal/ correctly', done => {
		chai.request(server)
			.get('/api/meal')
      .set('Authorization', 'Bearer '+token)
			.end((err, res) => {
				res.should.have.status(200);
				res.body.should.be.a('array');
				done();
			});
	});
	it('should GET /api/meal/1 correctly', done => {
		chai.request(server)
			.get('/api/meal/1')
      .set('Authorization', 'Bearer '+token)
			.end((err, res) => {
				res.should.have.status(200);
				done();
			});
	});
  it('should POST /api/meal correctly', done => {
		chai.request(server)
			.post('/api/meal')
			.set('content-type', 'application/x-www-form-urlencoded')
      .set('Authorization', 'Bearer '+token)
			.send({Dish:'Boerenkool', DateTime:'2018-01-11 20:30:00', Info:'Boerenkool beschrijving', Price:2, ChefID:0, MaxFellowEaters:4, DoesCookEat:1})
			.end((err, res) => {
				res.should.have.status(201);
				res.body.affectedRows.should.equal(1);
				done();
			});
	});
	it('should POST /api/meal incorrectly if with missing parameters', done => {
		chai.request(server)
			.post('/api/meal')
			.set('content-type', 'application/x-www-form-urlencoded')
      .set('Authorization', 'Bearer '+token)
      .send({DateTime:'2018-01-11 20:30:00', Info:'Boerenkool beschrijving', Price:'2', MaxFellowEaters:'4', DoesCookEat:'1'})
			.end((err, res) => {
				res.should.have.status(400);
				done();
			});
	});
});
