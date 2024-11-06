import mongoose, { Schema } from "mongoose";


// food Schema
const foodSchema = new mongoose.Schema({
    name:{type:String, required:true},
    description:{type:String, required:true},
    price: {type:Number, required:true},
    image: {type:String, required:true},
    category : {type:String, required:true}
})

const foodModel = mongoose.models.food ||  mongoose.model("food",foodSchema);
//foodModel is created iff model is not created.

 export default foodModel;    