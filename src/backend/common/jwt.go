package common

import "github.com/golang-jwt/jwt/v5"

var algo = jwt.SigningMethodHS256
var key []byte

func InitializeJwt() {
	key = []byte(GetConfig(JwtSecret))
}

func GenerateJwt(claims *jwt.MapClaims) string {
	token := jwt.NewWithClaims(algo, *claims)
	str, err := token.SignedString(key)
	if err != nil {
		return ""
	}
	return str
}
