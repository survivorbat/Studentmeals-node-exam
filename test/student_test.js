const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../server');
const should = chai.should();
const expect = chai.expect();

let token = "";

chai.use(chaiHttp);
describe('Student API interface', () => {
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
	it('should GET /api/student/ correctly', done => {
		chai.request(server)
			.get('/api/student')
			.set('Authorization', 'Bearer '+token)
			.end((err, res) => {
				res.should.have.status(200);
				res.body.should.be.a('array');
				done();
			});
	});
	it('should GET /api/student/0 correctly', done => {
		chai.request(server)
			.get('/api/student/0')
			.set('Authorization', 'Bearer '+token)
			.end((err, res) => {
				res.should.have.status(200);
				res.body[0].Firstname.should.equal('Testpersoon');
				res.body[0].Lastname.should.equal('Persoontest');
				done();
			});
	});
	it('should GET /api/student/test incorrectly', done => {
		chai.request(server)
			.get('/api/student/test')
			.set('Authorization', 'Bearer '+token)
			.end((err, res) => {
				res.should.have.status(400);
				done();
			});
	});
	it('should POST /api/student correctly', done => {
		chai.request(server)
			.post('/api/student')
			.set('content-type', 'application/x-www-form-urlencoded')
			.set('Authorization', 'Bearer '+token)
			.send({studentNumber: 2039, firstname:'John',lastname:'Doe',insertion:'de',password:'test',phonenumber:'0292929292',email:'john@dedoe.com'})
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
			.set('Authorization', 'Bearer '+token)
			.send({firstname:'John',insertion:'de',password:'test',phonenumber:'0292929292',email:'john@dedoe.com'})
			.end((err, res) => {
				res.should.have.status(400);
				done();
			});
	});
	it('should put /api/student correctly', done => {
		chai.request(server)
			.put('/api/student')
			.set('content-type', 'application/x-www-form-urlencoded')
			.set('Authorization', 'Bearer '+token)
			.send({studentNumber: 0, firstname:'Testpersoon',lastname:'Persoontest',insertion:'',password:'test123test321',phonenumber:'0292929292',email:'john@dedoe.com', image: ''})
			.end((err, res) => {
				res.should.have.status(200);
				res.body.affectedRows.should.equal(1);
				done();
			});
	});
	it('should put /api/student incorrectly with missing value', done => {
		chai.request(server)
			.put('/api/student')
			.set('content-type', 'application/x-www-form-urlencoded')
			.set('Authorization', 'Bearer '+token)
			.send({firstname:'John',insertion:'de',password:'test',phonenumber:'0292929292',email:'john@dedoe.com'})
			.end((err, res) => {
				res.should.have.status(400);
				done();
			});
	});
	it('should delete /api/student correctly', done => {
		chai.request(server)
			.delete('/api/student/2039')
			.set('content-type', 'application/x-www-form-urlencoded')
			.set('Authorization', 'Bearer '+token)
			.end((err, res) => {
				res.should.have.status(200);
				res.body.affectedRows.should.equal(1);
				done();
			});
	});
	it('should delete /api/student incorrectly with missing value', done => {
		chai.request(server)
			.delete('/api/student/ddd')
			.set('content-type', 'application/x-www-form-urlencoded')
			.set('Authorization', 'Bearer '+token)
			.end((err, res) => {
				res.should.have.status(400);
				done();
			});
	});
});
