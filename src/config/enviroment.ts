import dotenv from 'dotenv'

dotenv.config()

const env = {
    clientToken: process.env.CLIENT_TOKEN
}

export default env 

export const clientToken = process.env.CLIENT_TOKEN