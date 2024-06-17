import path from 'path'
import { fileURLToPath } from 'url'
import fs from "fs"

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const WriteFile = async (path, data) => {
    await fs.promises.writeFile(
        path,
        JSON.stringify(data, null, 2)
    );
}

const GetAllData = async (filePath) => {
    try {
        const completePath = path.join(__dirname, filePath)
        let data = await fs.promises.readFile(completePath, 'utf-8')
        data = JSON.parse(data)
        
        return data
        
    } catch (error) {
        throw error
    }
}

const FileCheck = (filePath) => {
    try {
        const completePath = path.join(__dirname, filePath)
        if (!fs.existsSync(completePath))
            fs.writeFileSync(completePath, JSON.stringify([], null, 2))
    } catch (error) {
        console.log(error.message);
    }
    
}

export {
    __dirname,
    WriteFile,
    GetAllData,
    FileCheck
}