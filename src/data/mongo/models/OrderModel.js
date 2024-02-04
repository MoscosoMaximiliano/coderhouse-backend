import { model, Schema, Types } from 'mongoose'

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

// Middleware MongoDB
schema.pre('find', () => {
    this.populate("product_id", "title price photo")
})


// -__v remove the version key
schema.pre('find', () => {
    this.populate("user_id", "-password -role -createAt -updatedAt -__v")
})

const Order = model(collection, schema)
export default Order