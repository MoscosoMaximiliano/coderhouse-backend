import { model, Schema } from 'mongoose'

let collection = 'users'

const schema = new Schema(
    {
        name: { type: String, required: true},
        email: { type: String, required: true},
        password: { type: String, required: true},
        photo: { type: String, default: "https://random.responsiveimages.io/300/300"},
        role: { type: Number, default: 0}
    },
    {timestamps: true}
)

const User = model(collection, schema)
export default User