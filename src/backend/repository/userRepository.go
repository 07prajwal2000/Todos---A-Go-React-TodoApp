package repository

import (
	"context"
	"errors"
	"log"
	"todoapp/db"
	"todoapp/types"

	"github.com/jackc/pgx/v5"
)

type UserRepository interface {
	GetUserById(id int) *types.User
	GetUserByEmail(email string) *types.User
	CreateUser(user *types.User) error

	// returns id, email, password, blocked, success/failure
	GetUserDetailsForLogin(email string) (int, string, string, bool, bool)

	//returns message and error
	GetUserCountByEmail(email string) (string, error)
}

type UserPostgresRepository struct {
	Connection *pgx.Conn
}

func (u UserPostgresRepository) CloseConnection() {
	u.Connection.Close(context.Background())
}

var errServer = errors.New("server error")

func CreateUserRepository() (UserRepository, error) {
	conn, err := db.GetDatabaseConnection()
	if err != nil {
		return nil, errServer
	}
	repo := UserPostgresRepository{Connection: conn}
	return repo, nil
}

func (u UserPostgresRepository) GetUserById(id int) *types.User {
	user := &types.User{}
	defer u.CloseConnection()
	row, err := u.Connection.Query(context.Background(), db.UserQueries.UserById, &id)
	if err != nil {
		log.Printf("Error: %s", err.Error())
		return nil
	}
	if !row.Next() {
		return nil
	}
	err = row.Scan(&user.Id, &user.FirstName, &user.LastName, &user.Email, &user.CreatedAt, &user.PaymentType, &user.Verified, &user.Blocked)
	if err != nil {
		log.Printf("Error: %s", err.Error())
		return nil
	}
	return user
}

func (u UserPostgresRepository) GetUserByEmail(email string) *types.User {
	user := &types.User{}
	defer u.CloseConnection()
	row, err := u.Connection.Query(context.Background(), db.UserQueries.UserByEmail, &email)
	if err != nil {
		log.Printf("Error: %s", err.Error())
		return nil
	}
	if !row.Next() {
		return nil
	}
	err = row.Scan(&user.Id, &user.FirstName, &user.LastName, &user.Email, &user.CreatedAt, &user.PaymentType, &user.Verified, &user.Blocked)
	if err != nil {
		log.Printf("Error: %s", err.Error())
		return nil
	}
	return user
}

func (u UserPostgresRepository) GetUserCountByEmail(email string) (string, error) {
	defer u.CloseConnection()
	rows, err := u.Connection.Query(context.Background(), db.UserQueries.UserDetailsForLogin, &email)
	if err != nil {
		log.Printf("Error: %s", err.Error())
		return "Server error", errors.New("server error")
	}
	if rows.Next() {
		return "User already exists", errors.New("user exists")
	}
	return "", nil
}

// returns id, email, password, blocked, success/failure
func (u UserPostgresRepository) GetUserDetailsForLogin(email string) (int, string, string, bool, bool) {
	defer u.CloseConnection()
	id, dbEmail, password, blocked := -1, "", "", false
	rows, err := u.Connection.Query(context.Background(), db.UserQueries.UserDetailsForLogin, &email)
	if err != nil {
		log.Fatalf("Error: %s", err.Error())
		return id, dbEmail, password, blocked, false
	}
	if !rows.Next() {
		return id, dbEmail, password, blocked, false
	}
	err = rows.Scan(&id, &dbEmail, &password, &blocked)
	if err != nil {
		return id, dbEmail, password, blocked, false
	}
	return id, dbEmail, password, blocked, true
}

func (u UserPostgresRepository) CreateUser(user *types.User) error {
	defer u.CloseConnection()
	_, err := u.Connection.Exec(context.Background(), db.UserQueries.InsertUser, &user.FirstName, &user.LastName, &user.Email, &user.Password, &user.CreatedAt, &user.PaymentType, &user.Verified)
	return err
}

func (u *UserPostgresRepository) UpdateUserById(id int, user *types.User) (*types.User, error) {
	defer u.CloseConnection()
	return nil, nil
}

// func (u *UserPostgresRepository) DeleteUserById(id int) bool {
// 	return true
// }
