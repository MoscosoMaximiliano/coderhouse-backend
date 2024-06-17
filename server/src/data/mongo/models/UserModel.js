import { model, Schema } from 'mongoose'
import mongoosePaginate from "mongoose-paginate-v2";

let collection = 'users'

const schema = new Schema(
    {
        name: { type: String, required: true },
        email: { type: String, required: true, unique: true, index: true },
        password: { type: String, required: true },
        photo: { type: String, default: "https://random.responsiveimages.io/300/300" },
        role: { type: Number, default: 0 },
        verifiedCode: { type: String, require: true }
    },
    { timestamps: true }
)

schema.plugin(mongoosePaginate)

const User = model(collection, schema)
export default User