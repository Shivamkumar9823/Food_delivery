import express from "express"
import { addfood, listFood, removeFood } from "../controller/foodController.js"
import multer from "multer"


const foodRouter = express.Router();

//Image Storage Engine..
const storage =  multer.diskStorage({
      destination:"uploads",
      filename:(req, file, cb)=>{
        return cb(null,`${Date.now()}${file.originalname}`)
    }
})
// multer.diskStorage(): Configures how and where the uploaded files will be stored on the server...

const upload = multer({ storage:storage })
//Creates an instance of multer that uses the storage engine you defined earlier.


foodRouter.post("/add", upload.single("image"), addfood)
foodRouter.get("/list", listFood)
foodRouter.post("/remove", removeFood)

//addfood: This is the next middleware or controller function that gets executed after the file upload. It is responsible for handling the rest of the logic related to adding a food item (e.g., saving the food details in the database, etc.).


export default foodRouter;