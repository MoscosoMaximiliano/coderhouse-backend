import crypto from "crypto"

import {WriteFile, GetAllData, FileCheck} from "../../../utils.js"

class OrdersManager {
    static path = "./src/data/fs/files/orders.json"
    constructor(){
        FileCheck(OrdersManager.path)
    }

    Create  = async ({pid, uid, quantity, state}) => {
        try {
            const orders = await GetAllData(OrdersManager.path)
            let newOrder = {oid: crypto.randomBytes(12).toString("hex"), pid, uid, quantity, state}

            orders.push(newOrder)

            await WriteFile(OrdersManager.path, orders)

            return newOrder.id
        } catch (error) {
            throw error
        }
    }

    ReadByUser = async (uid) => {
        try {
            const orders = await GetAllData(OrdersManager.path) 
            const ordersMatch = orders.find((item) => item.uid === uid)

            if(!ordersMatch)
                throw new Error("Error getting the order, this doesn't exist!")
            
            return ordersMatch
        } catch (error) {
            throw error
        }
    }

    Destroy = async (oid) => {
        try {
            const orders = await GetAllData(OrdersManager.path)
            const filteredorders = orders.filter((x) => x.oid !== oid)

            await WriteFile(OrdersManager.path, filteredorders)

            return "Success"

        } catch (error) {
            throw error
        }

    }
    
}

const orders = new OrdersManager()
export default orders