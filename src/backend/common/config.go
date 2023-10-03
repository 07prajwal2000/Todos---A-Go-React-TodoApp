package common

import "github.com/spf13/viper"

type ConfigKey string

const (
	JwtSecretKey   ConfigKey = "JWT_SECRET"
	JwtIssuerKey   ConfigKey = "JWT_ISSUER"
	JwtExpiryKey   ConfigKey = "JWT_EXP" // In hours
	DatabaseUrlKey ConfigKey = "DATABASE_URL"
)

func GetConfig(key ConfigKey) string {
	return viper.GetString(string(key))
}
