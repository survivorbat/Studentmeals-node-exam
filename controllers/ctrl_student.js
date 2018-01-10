const db = require('../config/db');

function isNotNumeric(input){
	return !/^-?[\d.]+(?:e-?\d+)?$/.test(input);
};


module.exports = {
    getAll(req, res, next){
        res.status(200);
        db.query('SELECT StudentNumber, Firstname, Insertion, Lastname, Email, PhoneNumber from Students', function (error, results, fields) {
            if (error){
                console.log(error);
                res.status(500).send(error);
                return;
            };
            res.status(200).send(results);
        });
    },
    getById(req,res, next){
        if(req.params['id'] === undefined || req.params['id'] === "" || isNotNumeric(req.params['id'])) {
            res.status(422).end();
            return;
        } 
        db.query('SELECT StudentNumber, Firstname, Insertion, Lastname, Email, PhoneNumber from Students WHERE StudentNumber = ?', [req.params['id']], function (error, results, fields) {
            if (error){
                console.log(error);
                res.status(500).send(error);
                return;
            };
            res.status(200).send(results);
          });
    },
    create(req,res,next){
        if(req.body['firstname'] === undefined || req.body['lastname'] === undefined || req.body['city'] === undefined){
            res.status(422).end();
            return;
        }
        db.query('INSERT INTO Students (FirstName, Insertion, LastName, Email, PhoneNumber, Password) VALUES (?,?,?,?,?)', [req.body['firstname'],req.body['insertion'],req.body['lastname'],req.body['email'],req.body['phonenumber'],req.body['password']], function (error, results, fields) {
            if (error){
                console.log(error);
                res.status(500).send(error);
                return;
            };
            res.status(200).send(results);
          });
    },
    update(req,res,next){
        if(req.body['id'] === undefined  || req.body['id'] === "" || isNotNumeric(req.body['id']) || req.body['firstname'] === undefined || req.body['lastname'] === undefined || req.body['city'] === undefined){
            res.status(422).end();
            return;
        }
        db.query('UPDATE Students SET FirstName = ?, Insertion = ?, LastName = ?, Email =?, PhoneNumber = ?, Password = ? WHERE StudentNumber = ?', [req.body['firstname'],req.body['insertion'],req.body['lastname'],req.body['email'],req.body['phonenumber'],req.body['password'],req.body['id']], function (error, results, fields) {
            if (error){
                console.log(error);
                res.status(500).send(error);
                return;
            };
            res.status(200).send(results);
          });
    },
    delete(req,res,next){
        if(req.body['id'] === undefined || req.body['id'] === "" || isNotNumeric(req.body['id'])){
            res.status(422).end();
            return;
        } else {
        db.query('DELETE FROM Students WHERE StudentNumber = ?', [req.body['id']], function (error, results, fields) {
            if (error){
                console.log(error);
                res.status(500).send(error);
                return;
            };
            res.status(200).send(results);
          });
        }
    }
}