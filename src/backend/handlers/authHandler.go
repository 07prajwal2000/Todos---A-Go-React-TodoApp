package handlers

import (
	"net/http"
	"time"
	"todoapp/common"
	"todoapp/repository"
	"todoapp/services"
	"todoapp/types"
	"todoapp/types/response"

	"github.com/gofiber/fiber/v2"
	"github.com/golang-jwt/jwt/v5"
)

func Login(c *fiber.Ctx) error {
	loginDto := new(types.LoginDto)
	if err := c.BodyParser(&loginDto); err != nil {
		return c.Status(http.StatusBadRequest).JSON(&response.LoginResponse{
			Message: "Unknown data format",
			Success: false,
		})
	}

	repo, err := repository.CreateUserRepository()
	if err != nil {
		return c.Status(http.StatusInternalServerError).JSON(&response.LoginResponse{
			Message: "Unknown server error",
			Success: false,
		})
	}
	response, status := services.LoginUser(loginDto, repo)
	return c.Status(status).JSON(response)
}

func Signup(c *fiber.Ctx) error {
	signupDto := new(types.SignupDto)
	if err := c.BodyParser(&signupDto); err != nil {
		return c.Status(http.StatusBadRequest).JSON(&response.SignupResponse{
			Message: "Unknown data format",
			Success: false,
		})
	}
	repo, err := repository.CreateUserRepository()
	if err != nil {
		return c.Status(http.StatusInternalServerError).JSON(&response.LoginResponse{
			Message: "Unknown server error",
			Success: false,
		})
	}
	response, status := services.SignupUser(signupDto, repo)
	return c.Status(status).JSON(response)
}

func Profile(c *fiber.Ctx) error {
	claims := c.Locals("claims").(jwt.MapClaims)
	idAsStr := claims["id"]
	id := int(idAsStr.(float64))
	repo, err := repository.CreateUserRepository()
	if err != nil {
		return c.Status(http.StatusInternalServerError).JSON(&response.LoginResponse{
			Message: "Unknown server error",
			Success: false,
		})
	}
	response := services.GetProfile(id, repo)
	if !response.Success {
		return c.Status(http.StatusNotFound).JSON(response)
	}
	return c.Status(http.StatusOK).JSON(response)
}

func Authenticate(c *fiber.Ctx) error {
	claims := c.Locals("claims").(jwt.MapClaims)
	return c.JSON(&fiber.Map{
		"email": claims["email"],
		"id":    claims["id"],
	})
}

func Refresh(c *fiber.Ctx) error {
	access := c.Get("Authorization", "")
	refresh := c.Get("Refresh", "")
	ok, token := common.VerifyJwtAccessToken(access)
	validRefresh, refreshClaims := common.VerifyJwtRefreshToken(refresh)

	if !validRefresh {
		return c.Status(http.StatusUnauthorized).JSON(&response.LoginResponse{
			Message: "Logged out",
			Success: false,
		})
	}
	now := time.Now().UTC().Add(-time.Minute * 30)
	exp := token["exp"].(float64)
	tokenStillValid := exp > float64(now.Unix()) // checks if token is still in business
	if ok && token["type"] == "access" && tokenStillValid {
		return c.Status(http.StatusOK).JSON(&response.LoginResponse{
			Message: "Existing token is still valid",
			Success: false,
			Token:   access,
			Refresh: refresh,
		})
	}
	if token["id"] != refreshClaims["id"] || token["email"] != refreshClaims["email"] {
		return c.Status(http.StatusOK).JSON(&response.LoginResponse{
			Message: "Invalid token",
			Success: false,
		})
	}
	id := int(refreshClaims["id"].(float64))
	email := refreshClaims["email"].(string)
	newAccess := common.GenerateAccessToken(id, email)
	return c.Status(http.StatusOK).JSON(&response.LoginResponse{
		Message: "Token refreshed",
		Success: true,
		Token:   newAccess,
		Refresh: refresh,
	})
}
