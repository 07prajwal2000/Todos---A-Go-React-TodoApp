package middleware

import (
	"todoapp/common"

	"github.com/gofiber/fiber/v2"
)

func JwtMiddleware(c *fiber.Ctx) error {
	headers := c.GetReqHeaders()
	authToken, ok := headers["Authorization"]
	if !ok {
		return c.JSON(&fiber.Map{
			"Message": "Access token is required in the header",
		})
	}
	valid, claims := common.VerifyJwtAccessToken(authToken)
	if !valid {
		return c.JSON(&fiber.Map{
			"message": "Invalid token",
		})
	}
	c.Locals("claims", claims)
	return c.Next()
}
