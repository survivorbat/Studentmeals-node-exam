const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../server');
const should = chai.should();
const expect = chai.expect();

chai.use(chaiHttp);
/*
describe('Error testing', () => {
	it('should GET /errortestinglink/ incorrectly', done => {
		chai.request(server)
			.get('/errortestinglink/')
			.end((err,res) => {
				res.should.have.status(404);
				done();
			});
	});
})

describe('Person API interface', () => {
	it('should GET /api/person/ correctly', done => {
		chai.request(server)
			.get('/api/person')
			.end((err, res) => {
				res.should.have.status(200);
				res.body.should.be.a('array');
				done();
			});
	});
});
*/