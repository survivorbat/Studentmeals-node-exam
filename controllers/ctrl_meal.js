const db = require('../config/db');

const fieldsArray = ['ID', 'Dish', 'DateTime', 'Info', 'ChefID', 'Price', 'MaxFellowEaters', 'DoesCookEat']
const fields = 'ID, Dish, DateTime, Info, ChefID, Price, MaxFellowEaters, DoesCookEat';

/**
 * Checks whether a value can't be converted to the Int type.
 *
 * @param {any} input   The value to test.
 * @returns true if value can't be converted to the specified type; otherwise, false.
 */
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

function updateImage(imgBase64, id) {
	img = new Buffer(imgBase64, 'base64');
	db.query('UPDATE Meals SET Picture = ? WHERE ID = ?', [img,id], function (error, results, fields) {
		if (error){
			console.log(error);
			return [500, error];
		};
		return [200, results];
	});
	return [200, "ok"]
}


module.exports = {
	getAll(req, res, next){
		db.query('SELECT ' + fields + ', (Picture IS NOT NULL) as PictureExist FROM Meals', function (error, results, fields) {
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
		db.query('SELECT ' + fields + ', (Picture IS NOT NULL) as PictureExist FROM Meals WHERE ID = ?', [req.params['id']], function (error, results, fields) {
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
		var img = null;
		if(req.body['Picture'] !== undefined) {
			img = new Buffer(req.body['Picture'], 'base64');
		}
		db.query('INSERT INTO Meals (' + fields + ', Picture) VALUES (?,?,?,?,?,?,?,?,?)', [null,req.body['Dish'],req.body['DateTime'],req.body['Info'],req.body['ChefID'],req.body['Price'],req.body['MaxFellowEaters'],req.body['DoesCookEat'], img], function (error, results, fields) {
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
		if(req.body['Picture'] !== undefined) {
			var result = updateImage(req.body['Picture'], req.body['ID']);
			console.log('test ' + result);
			if (result[0] === 500) {
				res.status(500).send(result[1]);
				return;
			}
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
		if(req.params['id'] === undefined || req.params['id'] === "" || isNotNumeric(req.params['id'])){
			res.status(400).send({message:'Missing or wrong parameters! Please refer to the documentation'}).end();
			return;
		} else {
			db.query('DELETE FROM Meals WHERE ID = ?', [req.params['id']], function (error, results, fields) {
				if (error){
					console.log(error);
					res.status(500).send(error);
					return;
				};
				res.status(200).send(results);
			});
		}
	},
	setByIdThePicture(req,res,next){
		if(req.params['id'] === undefined || req.params['id'] === "" || isNotNumeric(req.params['id']) || req.body['Picture'] === undefined) {
			res.status(400).send({message:'Missing or wrong parameters! Please refer to the documentation'}).end();
			return;
		}
		result = updateImage(req.body['Picture'], req.params['id']);
		res.status(result[0]).send(result[1]);
	},
	getByIdThePicture(req,res, next){
		if(req.params['id'] === undefined || req.params['id'] === "" || isNotNumeric(req.params['id'])) {
			res.status(400).send({message:'Missing or wrong parameters! Please refer to the documentation'}).end();
			return;
		}
		db.query('SELECT picture from Meals WHERE ID = ?', [req.params['id']], function (error, results, fields) {
			if (error){
				console.log(error);
				res.status(500).send(error);
				return;
			};
			res.setHeader('Content-Type', 'image/png' );
			res.status(200).send(results[0]['picture']);
		});
	},
}
