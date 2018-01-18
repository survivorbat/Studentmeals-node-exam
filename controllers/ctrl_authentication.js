const db = require('../config/db'); //Get the database object
const auth = require('../auth/authentication'); //Get the authentication object
module.exports = //Export this directly so the api can use it
{
    checkAuthentication(req, res, next) //Check if the user is authenticated
    {
        //Looking at the content of the body
        console.dir(req.body);

        //Taking the studentNumber and password from the received request.
        const studentNumber = req.body.studentNumber;
        const password = req.body.password;
        //Looking in the database to verify that studentnumber and password.
        db.query('SELECT count(*) as legit from Students Where studentNumber = ? AND password = ?', [studentNumber, password], function (error, results, fields) 
        {
            if (error)
            {
                console.log(error);
                res.status(401).send(error);
                return;
            };
            const legit = results[0].legit;
            //Looking if the input is legit (looking if the count of users with that detail equals 1).
            if (legit == 1)
            {
                //Generate token and reply to user with that token.
                var token = auth.encryptAuthToken(studentNumber);
                res.status(200).json({
                "token": token,
                });
            } 
            else 
            {
                //Invalid login details reply to user with an error.
                res.status(401).json({ "error": "Invalid credentials, contact 23IVK1 at Avans University of Applied Science in Breda! P.S. Ensure that you have sent nodes before contacting s.v.p.!" })
            }
        });
    }
}

