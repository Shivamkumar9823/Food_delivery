import express from "express"
import cors from "cors"
import { connectDB } from "./config/db.js";
import foodRouter from "./routes/foodRoute.js";


//App config
const app = express();
const port = 4000;


// middleware
app.use(express.json()) //whenever we get a req from frontend to backend.that will pass throught the json().
app.use(cors()) //using it we can access the backend from the frontend.


//Db Connction
connectDB();

//api endpoints
app.use("/api/food", foodRouter)
app.use("/images", express.static('uploads'))


app.get("/", (req, res)=>{
      res.send("API working")
})


app.listen(port,()=>{
    console.log(`Server Started on http://localhost:${port}`)
})

// mongodb+srv://shivamkumarsinghsk2020:<db_password>@cluster0.trtts.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0