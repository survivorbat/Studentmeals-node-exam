const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../server');
const should = chai.should();
const expect = chai.expect();
let token = "";
let expiredToken = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE1MTYwMzQwODYsImlhdCI6MTUxNjAyNjg4Niwic3ViIjoiOSJ9.nzyJk5RWz8n1ZGbjji3cG5qJ0slR12vUHNEI3KgSG6Q";
let differentSecrketKeyToken = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJkYXRlRXhwaXJlcyI6MTUxNTYwODc0MSwiZGF0ZUNyZWF0ZWQiOjE1MTU2MDE1NDEsInN0dWRlbnROdW1iZXIiOiIxIn0.lgLGOXdVSQv6ZwIWjgeIgNVw62QoPYLcejQd6U57c5Y";
chai.use(chaiHttp);
describe('Authentication API interface', () => {
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
			.send({studentNumber:'0',password:'test123test321123'})
			.end((err, res) => {
				res.should.have.status(401);
				done();
			});
	});
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
	it('should GET /api/student incorrectly if with expired token', done => {
		chai.request(server)
			.get('/api/student')
			.set('Authorization', 'Bearer '+ expiredToken)
			.end((err, res) => {
				res.should.have.status(401);
				done();
			});
	});
	it('should GET /api/student correctly if with correctly token', done => {
		chai.request(server)
			.get('/api/student')
			.set('Authorization', 'Bearer '+ token)
			.end((err, res) => {
				res.should.have.status(200);
				done();
			});
	});
	it('should GET /api/student incorrectly if with incorrectly secretKey (invalid signature)', done => {
		chai.request(server)
			.get('/api/student')
			.set('Authorization', 'Bearer '+ differentSecrketKeyToken)
			.end((err, res) => {
				res.should.have.status(401);
				done();
			});
	});
});
