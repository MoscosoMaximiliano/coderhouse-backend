import fs from "fs";

export class UserManager {
    static path = "./app/fs/files/users.json"
    constructor(){
        UserManager.FileCheck()
    }

    static FileCheck = () => {
        try {
            if (!fs.existsSync(UserManager.path))
                fs.writeFileSync(UserManager.path, JSON.stringify([], null, 2))
        } catch (error) {
            console.log(error);
        }
        
    }

    static GetUsers = async () => {
        const users = await JSON.parse(fs.readFileSync(UserManager.path, 'utf-8'))

        if(!users)
            return []
        
        return users
    }

    Create  = async ({name, photo, email}) => {
        try {
            if(!name || !photo || !email)
                throw new Error("Please not leave blank values")

            const users = await UserManager.GetUsers()


            let newUser = {id: users.length + 1, name, photo, email}

            users.push(newUser)

            await fs.promises.writeFile(
                UserManager.path,
                JSON.stringify(users, null, 2)
              );

            return {
                code: 200,
                msg: `Product created with id: ${newUser.id}!`
            }
        } catch (error) {
            return {
                code: 404,
                msg: error.message
            }
        }
    }

    Read = async () => {
        try {
            const users = await UserManager.GetUsers()

            if (users.length === 0)
                throw new Error("No Users!")            

            return {
                code: 200,
                data: JSON.stringify(users, null, 2)
            }
        } catch (error) {
            return {
                code: 404,
                msg: error.message
            }
        }
    }

    ReadOne = async (id) => {
        try {
            const users = await UserManager.GetUsers() 
            const user = users.find((item) => item.id === id)

            if(!user)
                throw new Error("Error getting the user, this doesn't exist!")
            
            return {
                code: 200,
                data: JSON.stringify(user, null, 2)
            }
        } catch (error) {
            return {
                code: 404,
                msg: error.message
            }
        }
    }
}
