function isValidPass(formPassword, dbPassword) {

  console.log(formPassword, dbPassword)
  if (formPassword !== dbPassword) {
    const error = new Error("Invalid credentials");
    error.statusCode = 401;
    throw error;
  }
}

export default isValidPass;
