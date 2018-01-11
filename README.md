# prog4node
Super special awesome web API for Robin en Jan
  
# Table of Contents
- [Endpoints](#endpoints)
  - [Details authentication token](#details-authentication-token)
    - [Requesting token](#requesting-token)
    - [Using this API](#using-this-api)
  - [Details student API](#details-authentication-token)
  - [Details fellow eaters API](#details-authentication-token)
  - [Details authentication token](#details-authentication-token)
  - [Details authentication token](#details-authentication-token)

# prog4node
Super special awesome web API for Robin en Jan

## Details authentication token
Requirements
- Login details (studentNumber and password).
- Postman

### Requesting token
Method: POST
Request URL: http://localhost:5000/api/login
Headers: (Key:Content-Type Value:application/x-www-form-urlencoded)
Body: (Key:studentNumber value:PLACENUMBER), (Key:password value:PLACEPASSWORD)
Copy result.

### Using this API
Method: GET
Request URL: http://localhost:5000/api/student
Headers: (Key:Content-Type Value:application/x-www-form-urlencoded), (Key:Authorization Value:Bearer PLACETOKEN)


Enjoy!