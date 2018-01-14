# prog4node
Super special awesome web API for Robin en Jan
  
# Table of Contents
- [Endpoints](#endpoints)
  - [Details authentication token](#details-authentication-token)
    - [Requesting token](#requesting-token)
    - [Using this API](#using-this-api)
  - [Details student API](#details-student-api)
  - [Details fellow eaters API](#details-fellow-eaters-api)
  - [Details meals API](#details-meals-api)


# prog4node
Super special awesome web API for Robin en Jan

## Details authentication token
Requirements
- Login details (studentNumber and password).
- Postman

### Requesting token
| Field       | Value                                                        |
| ----------- | ------------------------------------------------------------ |
| Method      | POST                                                         |
| Request URL | http://localhost:5000/api/login                              |
| Headers     | Key:Content-Type Value:application/x-www-form-urlencoded     |
| Body        | Key:studentNumber value:NUMMERIC, Key:password value:VALUE   |

### Using this API
| Field       | Value                                                        |
| ----------- | ------------------------------------------------------------ |
| Method      | GET                                                          |
| Request URL | http://localhost:5000/api/student                            |
| Headers     | Key:Content-Type Value:application/x-www-form-urlencoded     |
| Body        | Key:Authorization Value:Bearer AUTHTOKEN                     |


## Details student API
TODO

### Using this API
TODO

| Field       | Value                                                        |
| ----------- | ------------------------------------------------------------ |
| Method      |                                                              |
| Request URL |                                                              |
| Headers     |                                                              |
| Body        |                                                              |


## Details fellow eaters API
TODO

### Using this API
TODO

| Field       | Value                                                        |
| ----------- | ------------------------------------------------------------ |
| Method      | GET                                                          |
| Request URL | http://localhost:5000/api/felloweater                        |
| Headers     | Key:Content-Type Value:application/x-www-form-urlencoded     |
| Body        | Key:ID Value:NUMMERIC                                        |

## Details meals API
TODO

### Using this API
TODO

| Field       | Value                                                        |
| ----------- | ------------------------------------------------------------ |
| Method      |                                                              |
| Request URL |                                                              |
| Headers     |                                                              |
| Body        |                                                              |

Enjoy!