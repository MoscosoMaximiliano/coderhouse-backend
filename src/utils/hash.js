import { genSaltSync, hashSync, compareSync } from "bcrypt";

const CreateHash = (pass) => hashSync(pass, genSaltSync(10))

const VerifyHash = (req, db) => compareSync(req, db)

export {
    CreateHash,
    VerifyHash
}