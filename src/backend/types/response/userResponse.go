package response

import "todoapp/types"

type LoginResponse struct {
	Message string `json:"message"`
	Success bool   `json:"success"`
	Token   string `json:"accessToken"`
	Refresh string `json:"refreshToken"`
}

type SignupResponse struct {
	Message string `json:"message"`
	Success bool   `json:"success"`
}

type ProfileResponse struct {
	Data    *types.User `json:"data"`
	Message string      `json:"message"`
	Success bool        `json:"success"`
}
