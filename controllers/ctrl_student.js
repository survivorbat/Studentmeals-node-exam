const db = require('../config/db');

module.exports = {
    getAll(req, res, next){
        res.status(200);
        db.query('SELECT * from person', function (error, results, fields) {
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
        db.query('SELECT * from person WHERE id = ?', [req.params['id']], function (error, results, fields) {
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
        db.query('INSERT INTO person (firstname,lastname,city) VALUES (?,?,?)', [req.body['firstname'],req.body['lastname'],req.body['city']], function (error, results, fields) {
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
        db.query('UPDATE person SET firstname = ?, lastname=?, city=? WHERE id = ?', [req.body['firstname'],req.body['lastname'],req.body['city'],req.body['id']], function (error, results, fields) {
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
            if(req.body['firstname'] === undefined || req.body['lastname'] === undefined || req.body['city'] === undefined){
                res.status(422).end();
                return;
            } else {
                db.query('DELETE FROM person WHERE firstname = ? AND lastname = ? AND city = ?', [req.body['firstname'],req.body['lastname'],req.body['city']], function (error, results, fields) {
                    if (error) throw error;
                    res.status(200).send(results);
                    return;
                });
            }
        } else {
        db.query('DELETE FROM person WHERE id = ?', [req.body['id']], function (error, results, fields) {
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

function isNotNumeric(input){
	return !/^-?[\d.]+(?:e-?\d+)?$/.test(input);
};
