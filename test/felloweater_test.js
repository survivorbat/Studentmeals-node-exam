const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../server');
const should = chai.should();
const expect = chai.expect();

let token = "";

chai.use(chaiHttp);
describe('Fellow Eater API interface', () => {
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
    it('should POST /api/felloweater correctly', done => {
		chai.request(server)
			.post('/api/felloweater')
			.set('content-type', 'application/x-www-form-urlencoded')
			.set('Authorization', 'Bearer '+token)
			.send({AmountOfGuests:123, StudentNumber:0, MealID:16})
			.end((err, res) => {
				res.should.have.status(201);
				res.body.affectedRows.should.equal(1);
				done();
			});
	});
	it('should GET /api/felloweater/ correctly', done => {
		chai.request(server)
			.get('/api/felloweater')
			.set('Authorization', 'Bearer '+token)
			.end((err, res) => {
				res.should.have.status(200);
				res.body.should.be.a('array');
				done();
			});
	});
	it('should GET /api/felloweater/0 correctly', done => {
		chai.request(server)
			.get('/api/felloweater/0')
			.set('Authorization', 'Bearer '+token)
			.end((err, res) => {
				res.should.have.status(200);
                res.body[0].AmountOfGuests.should.equal(2);
                res.body[0].StudentNumber.should.equal(2);
                res.body[0].MealID.should.equal(4);
				done();
			});
	});
	it('should GET /api/felloweater/test123 incorrectly', done => {
		chai.request(server)
			.get('/api/felloweater/test')
			.set('Authorization', 'Bearer ' + token)
			.end((err, res) => {
				res.should.have.status(400);
				done();
			});
	});
	it('should POST /api/felloweater incorrectly', done => {
		chai.request(server)
			.post('/api/felloweater')
			.set('content-type', 'application/x-www-form-urlencoded')
			.set('Authorization', 'Bearer ' + token)
			.send({StudentNumber:0, MealID:16})
			.end((err, res) => {
				res.should.have.status(400);
				done();
			});
	});
	it('should PUT /api/felloweater incorrectly with missing value', done => {
		chai.request(server)
			.put('/api/student')
			.set('content-type', 'application/x-www-form-urlencoded')
			.set('Authorization', 'Bearer '+token)
			.send({AmountOfGuests:123, StudentNumber:0, MealID:16})
			.end((err, res) => {
				res.should.have.status(400);
				done();
			});
	});
	it('should DELETE /api/felloweater incorrectly with missing value', done => {
		chai.request(server)
			.delete('/api/felloweater/ddd')
			.set('content-type', 'application/x-www-form-urlencoded')
			.set('Authorization', 'Bearer '+token)
			.end((err, res) => {
				res.should.have.status(400);
				done();
			});
	});
});
