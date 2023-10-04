package services

import (
	"net/http"
	"time"
	"todoapp/common"
	"todoapp/repository"
	"todoapp/types"
	"todoapp/types/response"
)

func LoginUser(user *types.LoginDto, data repository.UserRepository) (*response.LoginResponse, int) {
	id, email, passwordHash, blocked, success := data.GetUserDetailsForLogin(user.Email)
	if !success {
		return &response.LoginResponse{
			Message: "No user found",
			Success: false,
		}, http.StatusNotFound
	}
	if blocked {
		return &response.LoginResponse{
			Message: "User is blocked",
			Success: false,
		}, http.StatusForbidden
	}
	valid := common.ValidatePasswords(user.Password, passwordHash)
	if !valid {
		return &response.LoginResponse{
			Message: "Invalid password",
			Success: false,
		}, http.StatusForbidden
	}
	access := common.GenerateAccessToken(id, email)
	refresh := common.GenerateRefreshToken(id, email)
	return &response.LoginResponse{
		Message: "Logged In",
		Success: true,
		Token:   access,
		Refresh: refresh,
	}, http.StatusOK
}

func SignupUser(userDto *types.SignupDto, data repository.UserRepository) (*response.SignupResponse, int) {
	msg, err := data.GetUserCountByEmail(userDto.Email)
	if err != nil {
		return &response.SignupResponse{
			Message: msg,
			Success: false,
		}, http.StatusBadRequest
	}
	hashedPassword := common.HashPassword(userDto.Password)
	now := time.Now().UTC().Unix()
	user := &types.User{
		FirstName:   userDto.FirstName,
		LastName:    userDto.LastName,
		Email:       userDto.Email,
		Password:    hashedPassword,
		CreatedAt:   now,
		Verified:    false,
		Blocked:     false,
		PaymentType: types.Free,
	}
	err = data.CreateUser(user)
	if err != nil {
		return &response.SignupResponse{
			Message: "Server error",
			Success: false,
		}, http.StatusInternalServerError
	}
	return &response.SignupResponse{
		Message: "User successfully signed up",
		Success: true,
	}, http.StatusCreated
}

func GetProfile(id int, data repository.UserRepository) *response.ProfileResponse {
	user := data.GetUserById(id)
	if user == nil {
		return &response.ProfileResponse{
			Data:    nil,
			Message: "No user found",
			Success: false,
		}
	}
	return &response.ProfileResponse{
		Data:    user,
		Message: "user found",
		Success: true,
	}
}
