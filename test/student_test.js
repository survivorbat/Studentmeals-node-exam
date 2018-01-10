const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../server');
const should = chai.should();
const expect = chai.expect();

chai.use(chaiHttp);
describe('Student API interface', () => {
	it('should GET /api/student/ correctly', done => {
		chai.request(server)
			.get('/api/student')
			.end((err, res) => {
				res.should.have.status(200);
				res.body.should.be.a('array');
				done();
			});
	});
	it('should GET /api/student/1 correctly', done => {
		chai.request(server)
			.get('/api/student')
			.end((err, res) => {
				res.should.have.status(200);
				done();
			});
	});
	it('should GET /api/student/test incorrectly', done => {
		chai.request(server)
			.get('/api/student/test')
			.end((err, res) => {
				res.should.have.status(422);
				done();
			});
	});
});