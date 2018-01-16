const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../server');
const should = chai.should();
const expect = chai.expect();

chai.use(chaiHttp);
describe('Student API interface', () => {
	it('should POST /api/login token incorrectly if with missing parameters', done => {
		chai.request(server)
			.post('/api/login')
			.end((err, res) => {
				res.should.have.status(401);
				done();
			});
	});
	it('should POST /api/login token incorrectly if with incorrectly parameters', done => {
		chai.request(server)
			.post('/api/login')
			.send({studentNumber:'9',password:'hanstextiell'})
			.end((err, res) => {
				res.should.have.status(401);
				done();
			});
	});
	it('should POST /api/login token correctly', done => {
		chai.request(server)
			.post('/api/login')
			.send({studentNumber:'9',password:'hanstextiel'})
			.end((err, res) => {
				res.should.have.status(200);
				done();
			});
	});
});