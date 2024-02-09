import { model, Schema, Types } from 'mongoose'
import mongoosePaginate from "mongoose-paginate-v2";

let collection = 'orders'

const schema = new Schema(
    {
        product_id: { type: Types.ObjectId, required: true, ref: "products"},
        user_id: { type: Types.ObjectId, required: true, ref: "users"},
        quantity: { type: Number, default: 1},
        state: { type: String,
            enum: ["reserved", "paid", "delivered"],
            default: "reserved"
        },
    },
    {timestamps: true}
)

schema.plugin(mongoosePaginate)

// Middleware MongoDB
schema.pre('find', () => {
    this.populate("products_id", "title price photo")
})


// -__v remove the version key
schema.pre('find', () => {
    this.populate("users_id", "-password -role -createAt -updatedAt -__v")
})

const Order = model(collection, schema)
export default Order