import { __dirname } from "../../utils.js"

const swaggerOptions = {
    swaggerDefinition: {
        openapi: '3.0.0',
        info: {
            title: 'E-commerce API',
            version: '1.0.0'
        },
    },
    apis: [ `${__dirname}/src/docs/*.yaml` ]
}

export default swaggerOptions