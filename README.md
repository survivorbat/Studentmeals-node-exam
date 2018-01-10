# prog4node
Super special awesome web API for Robin en Jan

Details auth token.
Requirements
- Login details (studentNumber and password).
- Postman

Requesting token.
Method: POST
Request URL: http://localhost:5000/api/login
Headers: (Key:Content-Type Value:application/x-www-form-urlencoded)
Body: (Key:studentNumber value:PLACENUMBER), (Key:password value:PLACEPASSWORD)
Copy result.

Using this API (example):
Method: GET
Request URL: http://localhost:5000/api/student
Headers: (Key:Content-Type Value:application/x-www-form-urlencoded), (Key:Authorization Value:Bearer PLACETOKEN)

Enjoy!