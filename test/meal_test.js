const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../server');
const should = chai.should();
const expect = chai.expect();

chai.use(chaiHttp);
describe('Meal API interface', () => {
	it('should GET /api/meal/ correctly', done => {
		chai.request(server)
			.get('/api/meal')
			.end((err, res) => {
				res.should.have.status(200);
				res.body.should.be.a('array');
				done();
			});
	});
	it('should GET /api/meal/1 correctly', done => {
		chai.request(server)
			.get('/api/meal')
			.end((err, res) => {
				res.should.have.status(200);
				done();
			});
	});
	it('should POST /api/meal correctly', done => {
		chai.request(server)
			.post('/api/meal')
			.set('content-type', 'application/x-www-form-urlencoded')
			.send({Dish:'Boerenkool',DateTime:'2018-01-11 20:30:00',Info:'Boerenkool beschrijving',ChefIDIndex:1,Price:4.4,MaxFellowEaters:3,DoesCookEat:1})
			.end((err, res) => {
				res.should.have.status(201);
				res.body.affectedRows.should.equal(1);
				done();
			});
	});
	it('should POST /api/meal incorrectly because of missing field', done => {
		chai.request(server)
			.post('/api/meal')
			.set('content-type', 'application/x-www-form-urlencoded')
			.send({Dish:'Boerenkool',DateTime:'2018-01-11 20:30:00',Info:'Boerenkool beschrijving',ChefIDIndex:1,Price:4.4,MaxFellowEaters:3})
			.end((err, res) => {
				res.should.have.status(400);
				done();
			});
	});
});
