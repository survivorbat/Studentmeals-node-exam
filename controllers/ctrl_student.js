const db = require('../config/db');

/**
 * Checks whether a value can't be converted to the Int type.
 *
 * @param {any} input   The value to test.
 * @returns true if value can't be converted to the specified type; otherwise, false.
 */
function isNotNumeric(input){
	return !/^-?[\d.]+(?:e-?\d+)?$/.test(input);
};

function updateImage(res, imgBase64, id) {
	img = new Buffer(imgBase64, 'base64');
	db.query('UPDATE Students SET Image = ? WHERE StudentNumber = ?', [img,id], function (error, results, fields) {
		if (error){
			console.log(error);
			res.status(500).send(error);
			return;
		};
		res.status(200).send(results);
	});
}


module.exports = {
    getAll(req, res, next){
        db.query('SELECT StudentNumber, Firstname, Insertion, Lastname, Email, PhoneNumber, (Image IS NOT NULL) as ImageExist from Students', function (error, results, fields) {
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
            res.status(400).send({message:'Missing or wrong parameters! Please refer to the documentation'}).end();
            return;
        }
        db.query('SELECT StudentNumber, Firstname, Insertion, Lastname, Email, PhoneNumber, (Image IS NOT NULL) as ImageExist from Students WHERE StudentNumber = ?', [req.params['id']], function (error, results, fields) {
            if (error){
                console.log(error);
                res.status(500).send(error);
                return;
            };
            res.status(200).send(results);
          });
    },
    create(req,res,next){
        if(req.body['studentNumber'] === undefined ||req.body['firstname'] === undefined || req.body['lastname'] === undefined || req.body['insertion'] === undefined || req.body['email'] === undefined || req.body['phonenumber'] === undefined || req.body['password'] === undefined){
            console.log('ERROR 400',req.body);
            res.status(400).send({message:'Missing or wrong parameters! Please refer to the documentation'}).end();
            return;
        }
				var img = null;
				if(req.body['Picture'] !== undefined) {
					img = new Buffer(req.body['Picture'], 'base64');
				}
        db.query('INSERT INTO Students (StudentNumber, FirstName, Insertion, LastName, Email, PhoneNumber, Password, Image) VALUES (?,?,?,?,?,?,?,?)', [req.body['studentNumber'],req.body['firstname'],req.body['insertion'],req.body['lastname'],req.body['email'],req.body['phonenumber'],req.body['password'],img], function (error, results, fields) {
            if (error){
                console.log(error);
                res.status(500).send(error);
                return;
            };
            res.status(201).send(results);
          });
    },
    update(req,res,next){
        if(req.body['studentNumber'] === undefined || req.body['firstname'] === undefined || req.body['lastname'] === undefined || req.body['insertion'] === undefined || req.body['email'] === undefined || req.body['phonenumber'] === undefined || req.body['password'] === undefined){
            res.status(400).send({message:'Missing or wrong parameters! Please refer to the documentation'}).end();
            return;
        }
				if(req.body['Picture'] !== undefined) {
					updateImage(res, req.body['Picture'], req.body['studentNumber']);
				}
        if(req.body['password']!="" && req.body['password']!=undefined){
            db.query('UPDATE Students SET FirstName = ?, Insertion = ?, LastName = ?, Email =?, PhoneNumber = ?, Password = ? WHERE StudentNumber = ?', [req.body['firstname'],req.body['insertion'],req.body['lastname'],req.body['email'],req.body['phonenumber'],req.body['password'],req.body['studentNumber']], function (error, results, fields) {
            if (error){
                console.log(error);
                res.status(500).send(error);
                return;
            };
            res.status(200).send(results);
          });
        } else {
            db.query('UPDATE Students SET FirstName = ?, Insertion = ?, LastName = ?, Email =?, PhoneNumber = ? WHERE StudentNumber = ?', [req.body['firstname'],req.body['insertion'],req.body['lastname'],req.body['email'],req.body['phonenumber'],req.body['studentNumber']], function (error, results, fields) {
                if (error){
                    console.log(error);
                    res.status(500).send(error);
                    return;
                };
                res.status(200).send(results);
              });
        }
    },
    delete(req,res,next){
        if(req.params['id'] === undefined || req.params['id'] === "" || isNotNumeric(req.params['id'])){
            res.status(400).send({message:'Missing or wrong parameters! Please refer to the documentation'}).end();
            return;
        } else {
        db.query('DELETE FROM Students WHERE StudentNumber = ?', [req.params['id']], function (error, results, fields) {
            if (error){
                console.log(error);
                res.status(500).send(error);
                return;
            };
            res.status(200).send(results);
          });
        }
    },
    getImage(req,res,next){
        if(req.params['id'] === undefined || req.params['id'] === "" || isNotNumeric(req.params['id'])) {
            res.status(400).send({message:'Missing or wrong parameters! Please refer to the documentation'}).end();
            return;
        }
        db.query('SELECT Image from Students WHERE studentNumber = ?', [req.params['id']], function (error, results, fields) {
            if (error){
                console.log(error);
                res.status(500).send(error);
                return;
            };
			res.setHeader('Content-Type', 'image/jpg' );
            res.status(200).send(results[0]['Image']);
          });
    },
	setImage(req,res,next){
		if(req.params['id'] === undefined || req.params['id'] === "" || isNotNumeric(req.params['id']) || req.body['Picture'] === undefined) {
			res.status(400).send({message:'Missing or wrong parameters! Please refer to the documentation'}).end();
			return;
		}
		updateImage(res, req.body['Picture'], req.params['id']);
	},
}
