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
				res.should.have.status(400);
				done();
			});
	});
	it('should POST /api/student correctly', done => {
		chai.request(server)
			.post('/api/student')
			.set('content-type', 'application/x-www-form-urlencoded')
			.send({firstname:'John',lastname:'Doe',insertion:'de',password:'test',phonenumber:'0292929292',email:'john@dedoe.com'})
			.end((err, res) => {
				res.should.have.status(201);
				res.body.affectedRows.should.equal(1);
				done();
			});
	});
	it('should POST /api/student incorrectly', done => {
		chai.request(server)
			.post('/api/student')
			.set('content-type', 'application/x-www-form-urlencoded')
			.send({firstname:'John',insertion:'de',password:'test',phonenumber:'0292929292',email:'john@dedoe.com'})
			.end((err, res) => {
				res.should.have.status(400);
				done();
			});
	});
});