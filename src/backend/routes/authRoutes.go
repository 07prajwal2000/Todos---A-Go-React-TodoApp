package routes

import (
	"todoapp/handlers"
	"todoapp/middleware"

	"github.com/gofiber/fiber/v2"
)

func RegisterAuthRoutes(app *fiber.App) {
	group := app.Group("/api/v1/auth")
	group.Post("/login", handlers.Login)
	group.Post("/signup", handlers.Signup)
	group.Get("/refresh", handlers.Refresh)

	group.Get("/profile", middleware.JwtMiddleware, handlers.Profile)
	group.Get("/authenticate", middleware.JwtMiddleware, handlers.Authenticate)
}
