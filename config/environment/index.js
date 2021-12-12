
import dotenv from 'dotenv'

dotenv.config()

const env = {
	PORT: process.env.PORT || 3001,
	BASE_URL: '',
	API_URL: '',
	ENVIRONMENT: {
		development: process.env.NODE_ENV === 'development',
		test: process.env.NODE_ENV === 'test',
		staging: process.env.NODE_ENV === 'staging',
		production: process.env.NODE_ENV === 'production',
	},
	MONGODB: {
		url: process.env.MONGO_DB_URL,
	},
	MAIL: {
		email: process.env.EMAIL_USER,
		password: process.env.EMAIL_PASS,
	},
	JWT_SECRET: process.env.JWT_SECRET,
	CLIENT_NAME: process.env.CLIENT_NAME,
	CLIENT_URL: process.env.CLIENT_URL
}

export default env
