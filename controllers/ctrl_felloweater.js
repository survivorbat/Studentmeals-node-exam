const db = require('../config/db');

/**
 * Checks whether a value can't be converted to the Int type.
 * 
 * @param {any} input   The value to test.
 * @returns true if value can't be converted to the specified type; otherwise, false.
 */
function isNotNumeric(input)
{
	return !/^-?[\d.]+(?:e-?\d+)?$/.test(input);
};

module.exports =
{
    getAll(req, res, next)
    {
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
    getById(req, res, next)
    {
        if (req.params['ID'] === undefined || req.params['ID'] === "" || isNotNumeric(req.params['ID']))
        {
            res.status(400).end();
            return;
        }

        db.query('SELECT AmountOfGuests, StudentNumber, MealID from FellowEaters WHERE ID = ?', [req.params['ID']], function (error, results, fields)
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
    create(req, res, next)
    {
        if (req.body['AmountOfGuests'] === undefined || req.body['StudentNumber'] === undefined || req.body['MealID'] === undefined)
        {
            console.log('ERROR 400', req.body);
            res.status(400).end();
            return;
        }

        db.query('INSERT INTO FellowEaters (AmountOfGuests, StudentNumber, MealID) VALUES (?,?,?)', [req.body['AmountOfGuests'], req.body['StudentNumber'], req.body['MealID']], function (error, results, fields)
        {
            if (error)
            {
                console.log(error);
                res.status(500).send(error);
                return;
            };

            res.status(201).send(results);
        });
    },
    update(req, res, next)
    {
        if (req.params['ID'] === undefined || req.params['ID'] === "" || isNotNumeric(req.params['ID']) || req.body['AmountOfGuests'] === undefined || req.body['StudentNumber'] === undefined || req.body['MealID'] === undefined)
        {
            console.log('ERROR 400', req.body);
            res.status(400).end();
            return;
        }
        db.query('UPDATE FellowEaters SET AmountOfGuests = ?, StudentNumber = ?, MealID = ? WHERE ID = ?', [req.body['AmountOfGuests'], req.body['StudentNumber'], req.body['MealID'], req.body['ID']], function (error, results, fields)
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
    delete(req, res, next)
    {
        if (req.params['id'] === undefined || req.params['id'] === "" || isNotNumeric(req.params['id']))
        {
            res.status(400).end();
            return;
        }
        else
        {
            db.query('DELETE FROM FellowEaters WHERE ID = ?', [req.params['id']], function (error, results, fields)
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