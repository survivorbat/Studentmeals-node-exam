const db = require('../config/db');

const fieldsArray = ['ID', 'Dish', 'DateTime', 'Info', 'ChefID', 'Price', 'MaxFellowEaters', 'DoesCookEat']
const fields = 'ID, Dish, DateTime, Info, ChefID, Price, MaxFellowEaters, DoesCookEat';

function isNotNumeric(input){
	return !/^-?[\d.]+(?:e-?\d+)?$/.test(input);
};

function bodyContainsAllFields(body, withID) {
	for (variable of fieldsArray) {
		if (variable !== 'ID' || withID) {
			if (body[variable] === undefined) {
				console.log("missing " + variable);
				return false;
			}
		}
	}
	return true;
}


module.exports = {
    getAll(req, res, next){
        db.query('SELECT ' + fields + ' FROM Meals', function (error, results, fields) {
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
        db.query('SELECT ' + fields + ' from Meals WHERE ID = ?', [req.params['id']], function (error, results, fields) {
            if (error){
                console.log(error);
                res.status(500).send(error);
                return;
            };
            res.status(200).send(results);
          });
    },
    create(req,res,next){
        if(!bodyContainsAllFields(req.body, false)){
            console.log('ERROR 400',req.body);
            res.status(400).send({message:'Missing or wrong parameters! Please refer to the documentation'}).end();
            return;
        }
        db.query('INSERT INTO Meals (' + fields + ') VALUES (?,?,?,?,?,?,?,?)', [null,req.body['Dish'],req.body['DateTime'],req.body['Info'],req.body['ChefID'],req.body['Price'],req.body['MaxFellowEaters'],req.body['DoesCookEat']], function (error, results, fields) {
            if (error){
                console.log(error);
                res.status(500).send(error);
                return;
            };
            res.status(201).send(results);
          });
    },
    update(req,res,next){
        if(!bodyContainsAllFields(req.body, true)){
            console.log('400',req.body);
            res.status(400).send({message:'Missing or wrong parameters! Please refer to the documentation'}).end();
            return;
        }
        db.query('UPDATE Meals SET Dish = ?, DateTime = ?, Info =?, ChefID = ?, Price = ?, MaxFellowEaters = ?, DoesCookEat = ? WHERE ID = ?', [req.body['Dish'],req.body['DateTime'],req.body['Info'],req.body['ChefID'],req.body['Price'],req.body['MaxFellowEaters'],req.body['DoesCookEat'],req.body['ID']], function (error, results, fields) {
            if (error){
                console.log(error);
                res.status(500).send(error);
                return;
            };
            res.status(200).send(results);
          });
    },
    delete(req,res,next){
        if(req.body['ID'] === undefined || req.body['ID'] === "" || isNotNumeric(req.body['ID'])){
            res.status(400).send({message:'Missing or wrong parameters! Please refer to the documentation'}).end();
            return;
        } else {
        db.query('DELETE FROM Meals WHERE ID = ?', [req.body['ID']], function (error, results, fields) {
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
