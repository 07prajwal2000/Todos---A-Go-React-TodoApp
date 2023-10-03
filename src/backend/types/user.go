package types

type SubscriptionType int8

const (
	Free       SubscriptionType = 1
	Pro        SubscriptionType = 2
	Enterprise SubscriptionType = 3
)

type LoginDto struct {
	Email    string `json:"email"`
	Password string `json:"password"`
}

type SignupDto struct {
	FirstName string `json:"firstName"`
	LastName  string `json:"lastName"`
	Email     string `json:"email"`
	Password  string `json:"password"`
}

type User struct {
	Id          int              `json:"id"`
	FirstName   string           `json:"firstName"`
	LastName    string           `json:"lastName"`
	Email       string           `json:"email"`
	Password    string           `json:"passwordHash"`
	CreatedAt   int64            `json:"createdAt"`
	Verified    bool             `json:"verified"`
	Blocked     bool             `json:"blocked"`
	PaymentType SubscriptionType `json:"paymentType"`
}
