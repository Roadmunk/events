require('dotenv').config()

module.exports = {
	region: process.env.REGION,
	deployment: process.env.DEPLOYMENT,
	account: process.env.ACCOUNT,
	service: process.env.SERVICE
}