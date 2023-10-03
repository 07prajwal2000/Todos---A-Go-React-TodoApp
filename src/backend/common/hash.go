package common

import (
	"crypto/sha256"
	"encoding/base64"
)

func ValidatePasswords(userPassword string, passwordHash string) bool {
	hash := sha256.Sum256([]byte(userPassword))
	hashPass := base64.StdEncoding.EncodeToString(hash[:])
	return hashPass == passwordHash
}

func HashPassword(password string) string {
	hash := sha256.Sum256([]byte(password))
	return base64.StdEncoding.EncodeToString(hash[:])
}
