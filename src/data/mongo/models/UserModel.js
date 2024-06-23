import { model, Schema } from 'mongoose'
import mongoosePaginate from "mongoose-paginate-v2";
import bcrypt from "bcrypt";

let collection = 'users'

const schema = new Schema(
	{
		name: { type: String, required: true },
		email: { type: String, required: true, unique: true, index: true },
		password: { type: String, required: true },
		photo: { type: String, default: "https://random.responsiveimages.io/300/300" },
		role: { type: Number, default: 0 },
		verifiedCode: { type: String, require: true },
		resetPasswordToken: { type: String },
		resetPasswordExpires: { type: Date },
	},
	{ timestamps: true }
)

schema.plugin(mongoosePaginate)

schema.pre('save', async function(next) {
	if (!this.isModified('password')) return next();

	try {
		const salt = await bcrypt.genSalt(10);
		this.password = await bcrypt.hash(this.password, salt);
		next();
	} catch (err) {
		next(err);
	}
});

const User = model(collection, schema)
export default User