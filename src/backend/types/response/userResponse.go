package response

type LoginResponse struct {
	Message string `json:"message"`
	Success bool   `json:"success"`
}