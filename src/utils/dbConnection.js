import { connect } from "mongoose";

export default async function dbConnection() {
  try {
    await connect(process.env.MONGODB_URI);
  } catch (error) {
    console.log(error);
  }
}
