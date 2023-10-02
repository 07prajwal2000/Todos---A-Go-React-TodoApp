package common

import "github.com/spf13/viper"

type ConfigKey string

const (
	JwtSecret ConfigKey = "JWT_SECRET"
	JwtIssuer ConfigKey = "JWT_ISSUER"
	JwtExpiry ConfigKey = "JWT_EXP" // In hours
)

func GetConfig(key ConfigKey) string {
	return viper.GetString(string(key))
}
