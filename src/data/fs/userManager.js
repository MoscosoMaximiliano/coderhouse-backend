import crypto from "crypto"

import {__dirname, WriteFile, GetAllData, FileCheck} from "../../../utils.js"

class UserManager {
    static path = "./src/data/fs/files/users.json"
    constructor(){
        FileCheck(UserManager.path)
    }

    Create  = async ({name, photo, email}) => {
        try {
            const users = await GetAllData(UserManager.path)
            let newUser = {id: crypto.randomBytes(12).toString("hex"), name, photo, email}

            users.push(newUser)

            await WriteFile(UserManager.path, users)

            return newUser.id
        } catch (error) {
            throw error
        }
    }

    Read = async () => {
        try {
            return await GetAllData(UserManager.path)
        } catch (error) {
            throw error
        }
    }

    ReadOne = async (id) => {
        try {
            const users = await GetAllData(UserManager.path) 
            const user = users.find((item) => item.id === id)

            if(!user)
                throw new Error("Error getting the user, this doesn't exist!")
            
            return user
        } catch (error) {
            throw error
        }
    }

    Destroy = async (id) => {
        try {
            const users = await GetAllData(UserManager.path)
            const filteredUsers = users.filter((x) => x.id !== id)

            await WriteFile(UserManager.path, filteredUsers)

            return "Success"

        } catch (error) {
            throw error
        }

    }
    
    Update = async (id, data) => {
        try {
            let users = await GetAllData(UserManager.path)
    
            const userId = users.findIndex((user) => user.id === id)
    
            if (userId === -1)
                throw new Error("User not founded")
    
            users[userId] = {...data, id}
    
            await WriteFile(UserManager.path, users)
            
            return `Updated the user with ID: ${users[userId].id}`
        } catch (error) {
            throw error
        }
    }
}

const users = new UserManager()
export default users