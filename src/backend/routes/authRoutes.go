package routes

import (
	"todoapp/handlers"

	"github.com/gofiber/fiber/v2"
)

func RegisterAuthRoute(app *fiber.App) {
	group := app.Group("/api/v1/auth")
	group.Post("/login", handlers.Login)
}
