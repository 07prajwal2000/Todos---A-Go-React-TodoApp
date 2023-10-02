package handlers

import (
	"log"
	"net/http"
	"strconv"
	"time"
	"todoapp/common"
	"todoapp/types"
	"todoapp/types/response"

	"github.com/gofiber/fiber/v2"
	"github.com/golang-jwt/jwt/v5"
)

func Login(c *fiber.Ctx) error {
	loginDto := &types.LoginDto{}
	if err := c.BodyParser(loginDto); err != nil {
		c.SendStatus(http.StatusBadRequest)
		return c.JSON(&response.LoginResponse{
			Message: "Unknown data format",
			Success: false,
		})
	}
	log.Print(*loginDto)
	exp, _ := strconv.Atoi(common.GetConfig(common.JwtExpiry))
	iss := common.GetConfig(common.JwtIssuer)

	token := common.GenerateJwt(&jwt.MapClaims{
		"exp":    time.Now().UTC().Add(time.Duration(exp) * time.Hour).Unix(),
		"issuer": iss,
		"type":   "auth",
	})
	c.SendStatus(http.StatusOK)
	c.Response().Header.Add("token", token)
	return c.JSON(&response.LoginResponse{
		Message: "Logged-in successfully",
		Success: true,
	})
}
