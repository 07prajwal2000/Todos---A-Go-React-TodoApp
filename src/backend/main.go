package main

import (
	"log"
	"todoapp/common"
	"todoapp/db"
	"todoapp/routes"

	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
	"github.com/gofiber/fiber/v2/middleware/recover"
	"github.com/spf13/viper"
)

func main() {
	viper.SetConfigFile(".env")
	viper.AutomaticEnv()
	err := viper.ReadInConfig()
	if err != nil {
		log.Fatalf("Failed to load env variables.\nIssue: %s", err.Error())
		return
	}
	common.InitializeJwt()
	db.InitDatabase()

	app := fiber.New()
	app.Use(cors.New(cors.Config{
		AllowOrigins:     "http://localhost:3000",
		AllowMethods:     "*",
		AllowHeaders:     "*",
		AllowCredentials: true,
	}))
	app.Use(recover.New())
	// app.Use(jwtware.Config{
	// 	SigningKey: jwtware.SigningKey{Key: []byte(common.GetConfig(common.JwtSecret))},
	// })
	routes.RegisterAuthRoutes(app)
	app.Listen(":5555")
}
