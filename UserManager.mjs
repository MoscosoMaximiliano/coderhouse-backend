export class UserManager {
    static #users = []
    constructor(){}

    Create  = ({name, photo, email}) => {
        try {
            if(!name || !photo || !email)
                throw new Error("Please not leave blank values")

            let id = UserManager.#users.length + 1

            UserManager.#users.push({
                id,
                name,
                photo,
                email
            })

            return {
                code: 200,
                msg: `Product created with id: ${id}!`
            }
        } catch (error) {
            return {
                code: 404,
                msg: error.message
            }
        }
    }

    Read = () => UserManager.#users
    ReadOne = (id) => UserManager.#users.find((item) => item.id === id)
}
