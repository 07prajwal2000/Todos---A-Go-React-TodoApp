package common

import (
	"math/rand"
	"strconv"
	"time"

	"github.com/golang-jwt/jwt/v5"
)

var algo = jwt.SigningMethodHS256
var key []byte
var accessTokenExpiry int
var refreshExpiry int // 1 month
var JwtIssuer string

func InitializeJwt() {
	key = []byte(GetConfig(JwtSecretKey))
	accessTokenExpiry, _ = strconv.Atoi(GetConfig(JwtExpiryKey))
	JwtIssuer = GetConfig(JwtIssuerKey)
	refreshExpiry = int(time.Hour * 24 * 30)
}

func GenerateJwt(claims *jwt.MapClaims) string {
	// token := jwt.NewWithClaims(algo, *claims)
	// str, err := token.SignedString(key)
	token := jwt.New(algo)
	tokenClaims := token.Claims.(jwt.MapClaims)
	for k, v := range *claims {
		tokenClaims[k] = v
	}
	str, err := token.SignedString(key)

	if err != nil {
		return ""
	}
	return str
}

func GenerateAccessToken(id int, email string) string {
	nonce := rand.Int31n(10_000_000)
	return GenerateJwt(&jwt.MapClaims{
		"id":    id,
		"email": email,
		"iss":   JwtIssuer,
		"exp":   time.Now().UTC().Add(time.Hour * time.Duration(accessTokenExpiry)).Unix(),
		"type":  "access",
		"nonce": nonce,
	})
}

func GenerateRefreshToken(id int, email string) string {
	nonce := rand.Int31n(10_000_000)
	return GenerateJwt(&jwt.MapClaims{
		"id":    id,
		"email": email,
		"iss":   JwtIssuer,
		"exp":   time.Now().UTC().Add(time.Duration(refreshExpiry)).Unix(),
		"type":  "refresh",
		"nonce": nonce,
	})
}

func VerifyJwtAccessToken(token string) (bool, jwt.MapClaims) {
	jwtToken, _ := jwt.Parse(token, func(t *jwt.Token) (interface{}, error) {
		return key, nil
	})
	return jwtToken.Valid, jwtToken.Claims.(jwt.MapClaims)
}

func VerifyJwtRefreshToken(token string) (bool, jwt.MapClaims) {
	jwtToken, _ := jwt.Parse(token, func(t *jwt.Token) (interface{}, error) {
		return key, nil
	})
	return jwtToken.Valid, jwtToken.Claims.(jwt.MapClaims)
}
