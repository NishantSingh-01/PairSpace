import dotenv from 'dotenv'
dotenv.config()

const PORT:string= process.env.PORT || '8006'
const ACCESS_TOKEN_SECRET:string|undefined= process.env.ACCESS_TOKEN_SECRET 

export {PORT, ACCESS_TOKEN_SECRET}
