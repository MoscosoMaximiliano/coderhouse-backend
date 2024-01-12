import { Router } from "express";
import UserManager from "../../data/fs/userManager.js";
import UserHandler from "../../middleware/userHandler.js";

const usersRouter = Router()

usersRouter.post("/", UserHandler, async(req, res, next) => {
    try {
        const response = await UserManager.Create(req.body)
        
        return res.json({
            statusCode: 201,
            response
        })
    } catch (error) {
        return next(error)
    }
})
usersRouter.get("/", async (req, res, next) => {
    try {
        const response = await UserManager.Read()
        return res.json({
            statusCode: 200,
            response
        })
    } catch (error) {
        return next(error)
    }
})
usersRouter.get("/:uid", async (req, res, next) => {
    try {
        const response = await UserManager.ReadOne(req.params.uid)
        return res.json({
            statusCode: 200,
            response
        })
    } catch (error) {
        return next(error)
    }
})

//? No va en la entrega
// usersRouter.put("/:uid", userHandler, async (req, res, next) => {
//     try {
//         const response = await UserManager.Update(req.params.uid, req.body)
    
//         return res.json({
//             statusCode: 200,
//             response
//         }) 
//     } catch (error) {
//         return next(error)
//     }
// })

// usersRouter.delete("/:uid", async (req, res, next) => {
//     try {
//         const response = await UserManager.Destroy(req.params.uid)
//         return res.json({
//             statusCode: 200,
//             response
//         })
//     } catch (error) {
//         return next(error)
//     }
// })


export default usersRouter