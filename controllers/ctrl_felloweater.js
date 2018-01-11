const db = require('../config/db');

module.exports = 
{
    getAll(req, res, next)
    {
        res.status(200);
        db.query('SELECT * from FellowEaters', function (error, results, fields)
        {
            if (error)
            {
                console.log(error);
                res.status(500).send(error);
                return;
            };
            res.status(200).send(results);
        });
    },
    getById(req,res, next)
    {
        if(req.params['ID'] === undefined || req.params['ID'] === "" || isNotNumeric(req.params['ID']))
        {
            res.status(422).end();
            return;
        } 
        db.query('SELECT * from FellowEaters WHERE ID = ?', [req.params['ID']], function (error, results, fields)
        {
            if (error)
            {
                console.log(error);
                res.status(500).send(error);
                return;
            };
            res.status(200).send(results);
        });
    },
    create(req,res,next)
    {
        if(req.body['AmountOfGuests'] === undefined || req.body['StudentNumber'] === undefined || req.body['MealID'] === undefined)
        {
            res.status(422).end();
            return;
        }
        db.query('INSERT INTO FellowEaters (AmountOfGuests, StudentNumber, MealID) VALUES (?,?,?)', [req.body['AmountOfGuests'], req.body['StudentNumber'],req.body['MealID']], function (error, results, fields)
        {
            if (error)
            {
                console.log(error);
                res.status(500).send(error);
                return;
            };
            res.status(200).send(results);
        });
    },
    update(req,res,next)
    {
        if(req.body['ID'] === undefined  || req.body['ID'] === "" || isNotNumeric(req.body['ID']) || req.body['MealID'] === undefined || req.body['StudentNumber'] === undefined)
        {
            res.status(422).end();
            return;
        }
        db.query('UPDATE FellowEaters SET AmountOfGuests = ?, StudentNumber=?, MealID=? WHERE ID = ?', [req.body['AmountOfGuests'], req.body['StudentNumber'], req.body['MealID'], req.body['ID']], function (error, results, fields)
        {
            if (error)
            {
                console.log(error);
                res.status(500).send(error);
                return;
            };
            res.status(200).send(results);
        });
    },
    delete(req,res,next)
    {
        if(req.body['ID'] === undefined || req.body['ID'] === "" || isNotNumeric(req.body['ID']))
        {
            if(req.body['firstname'] === undefined || req.body['lastname'] === undefined || req.body['city'] === undefined)
            {
                res.status(422).end();
                return;
            }
            else
            {
                db.query('DELETE FROM FellowEaters WHERE StudentNumber = ? AND MealID = ?', [req.body['StudentNumber'],req.body['MealID']], function (error, results, fields)
                {
                    if (error) throw error;
                    res.status(200).send(results);
                    return;
                });
            }
        }
        else 
        {
            db.query('DELETE FROM FellowEaters WHERE ID = ?', [req.body['ID']], function (error, results, fields)
            {
                if (error)
                {
                    console.log(error);
                    res.status(500).send(error);
                    return;
                };
                res.status(200).send(results);
            });
        }
    }
}

/**
 * Checks is the value is nummeric or not.
 * 
 * @param {any} input   Input to check on.
 * @returns True on not nummeric values, false on nummeric values
 */
function isNotNumeric(input)
{
	return !/^-?[\d.]+(?:e-?\d+)?$/.test(input);
};
