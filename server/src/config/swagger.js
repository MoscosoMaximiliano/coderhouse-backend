import { __dirname } from "../../utils.js"

const swaggerOptions = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'E-commerce API',
            version: '1.0.0',
            description: "Documentation of the E-Commerce Backend API"
        },
    },
    apis: [ `${__dirname}/src/docs/*.yaml` ]
}

export default swaggerOptions