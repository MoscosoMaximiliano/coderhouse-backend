import { config } from 'dotenv'
import args from './args.js'

const envs = args.env
const pathEnv = (envs) ? ".env.dev" : ".env.prod"
config({ path: pathEnv })


export default {
    PORT: process.env.PORT,
    MONGODB_URI: process.env.MONGODB_URI,
    SECRET_SESSION: process.env.SECRET_SESSION,
    JWT_SECRET: process.env.JWT_SECRET,
    GOOGLE_ID: process.env.GOOGLE_ID,
    GOOGLE_SECRET: process.env.GOOGLE_SECRET,
};
