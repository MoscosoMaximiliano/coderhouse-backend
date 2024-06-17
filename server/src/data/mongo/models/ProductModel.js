import { model, Schema } from 'mongoose'
import mongoosePaginate from "mongoose-paginate-v2";

let collection = 'products'

const schema = new Schema({
    title: { type: String, required: true},
    price: { type: Number, required: true},
    stock: { type: Number, required: true},
    photo: { type: String, default: "https://random.responsiveimages.io/300/300"},
})

schema.plugin(mongoosePaginate)

const Product = model(collection, schema)
export default Product