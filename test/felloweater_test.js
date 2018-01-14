const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../server');
const should = chai.should();
const expect = chai.expect();

let token = "";

chai.use(chaiHttp);
describe('Fellow eater API interface', () =>
{
	it('should GET /api/felloweater/ correctly', done =>
    {
		chai.request(server).get('/api/felloweater').set('Authorization', 'Bearer ' + token).end((err, res) =>
        {
            res.should.have.status(200);
            res.body.should.be.a('array');
            done();
        });
	});
	it('should GET /api/felloweater/0 correctly', done =>
    {
		chai.request(server).get('/api/felloweater/0').set('Authorization', 'Bearer ' + token).end((err, res) =>
        {
            res.should.have.status(200);
            res.body[0].ID.should.equal('4');
            res.body[0].AmountOfGuests.should.equal('0');
            res.body[0].StudentNumber.should.equal('0');
            res.body[0].MealID.should.equal('16');
            done();
        });
	});
	it('should GET /api/felloweater/test123 incorrectly', done =>
    {
		chai.request(server).get('/api/felloweater/test123').set('Authorization', 'Bearer ' + token).end((err, res) =>
        {
            res.should.have.status(400);
            done();
        });
	});
	it('should POST /api/felloweater correctly', done =>
    {
		chai.request(server).post('/api/felloweater').set('content-type', 'application/x-www-form-urlencoded').set('Authorization', 'Bearer ' + token).send(
        {
            AmountOfGuests: 123,
            StudentNumber: 0,
            MealID: 16
        }).end((err, res) =>
        {
            res.should.have.status(201);
            res.body.affectedRows.should.equal(1);
            done();
		});
	});
	it('should POST /api/felloweater incorrectly', done =>
    {
		chai.request(server).post('/api/felloweater').set('content-type', 'application/x-www-form-urlencoded').set('Authorization', 'Bearer ' + token).send(
        {
            AmountOfGuests: 123,
            StudentNumber: 0
        }).end((err, res) =>
        {
            res.should.have.status(400);
            done();
		});
	});
	it('should put /api/felloweater correctly', done =>
    {
		chai.request(server).put('/api/felloweater').set('content-type', 'application/x-www-form-urlencoded').set('Authorization', 'Bearer ' + token).send(
        {
            AmountOfGuests: 123,
            StudentNumber: 0,
            MealID: 16
        }).end((err, res) => 
        {
            res.should.have.status(200); 
            res.body.affectedRows.should.equal(1); 
            done(); 
		}); 
	});
	it('should put /api/felloweater incorrectly with missing value', done =>
    {
		chai.request(server).put('/api/felloweater').set('content-type', 'application/x-www-form-urlencoded').set('Authorization', 'Bearer ' + token).send(
        {
            AmountOfGuests: 123
        }).end((err, res) => 
        {
            res.should.have.status(400);
            done();
		}); 
	});
	it('should delete /api/felloweater correctly', done =>
    {
		chai.request(server).delete('/api/felloweater').set('content-type', 'application/x-www-form-urlencoded').set('Authorization', 'Bearer ' + token).send(
        {
            ID:0
        }).end((err, res) =>
        {
            res.should.have.status(200);
            res.body.affectedRows.should.equal(1);
            done();
		});
	});
	it('should delete /api/felloweater incorrectly with missing value', done => 
    {
		chai.request(server).delete('/api/felloweater').set('content-type', 'application/x-www-form-urlencoded').set('Authorization', 'Bearer ' + token).send(
        {

        }).end((err, res) => 
        {
            res.should.have.status(400); 
            done(); 
		});
	});
});