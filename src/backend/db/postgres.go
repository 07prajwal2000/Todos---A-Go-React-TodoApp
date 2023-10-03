package db

import (
	"context"
	"log"
	"todoapp/common"

	"github.com/jackc/pgx/v5/pgxpool"
)

var Config *pgxpool.Config

func InitDatabase() {
	url := common.GetConfig(common.DatabaseUrlKey)
	var err error
	Config, err = pgxpool.ParseConfig(url)
	if err != nil {
		log.Fatalf("Error creating database connection.\nError: %s", err.Error())
		return
	}
	Config.MaxConns = 30
}

func GetDatabaseConnection() (*pgxpool.Pool, error) {
	return pgxpool.NewWithConfig(context.Background(), Config)
}
