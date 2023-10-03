package db

const userByIdQuery = `SELECT id, firstName, lastName, email, createdat, paymenttype, verified, blocked from users where id = $1`
const userByEmailQuery = `SELECT id, firstName, lastName, email, createdat, paymenttype, verified, blocked from users where email = $1`
const userDetailsForLoginQuery = `SELECT id, email, passwordhash, blocked from users where email = $1`
const insertUserQuery = `INSERT into users (firstname, lastName, email, passwordhash, createdat, paymenttype, verified) 
VALUES ($1, $2, $3, $4, $5, $6, $7);`
const findUserCountByEmailQuery = `SELECT id from users where email = $1`

type UserQuery struct {
	UserById             string
	UserByEmail          string
	InsertUser           string
	UserDetailsForLogin  string
	FindUserCountByEmail string
}

var UserQueries = &UserQuery{
	UserById:             userByIdQuery,
	UserByEmail:          userByEmailQuery,
	InsertUser:           insertUserQuery,
	UserDetailsForLogin:  userDetailsForLoginQuery,
	FindUserCountByEmail: findUserCountByEmailQuery,
}
