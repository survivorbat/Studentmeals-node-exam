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
});
*/