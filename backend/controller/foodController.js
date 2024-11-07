import foodModel from "../models/foodModel.js";
import fs from 'fs';

// add food item 
const addfood = async (req,res) => {
  
      let image_filename = `${req.file.filename}`;
      const food = new foodModel({
        name:req.body.name,
        description: req.body.description,
        price: req.body.price,
        category:req.body.category,
        image:image_filename
      })
    try{
        await food.save();
        res.json({success:true, message:"food Added successfully!"})
    }
    catch(error){
        console.log(error)
        res.json({success:false, message:"Error"})
    }


}

// all food list 
const listFood = async (req, res) =>{
      try{
        // fetch from the food model
        const foods = await foodModel.find({});
        res.json({success:true, data:foods})  

      } 
      catch(error){
           console.log(error)
           res.json({success:false, message:"Error foodList"})
      } 
}


// remove food item
const removeFood = async (req, res)=>{
    try {
      //searching item in Db
      const food = await foodModel.findById(req.body._id);
      if (!food) {
        return res.json({ success: false, message:"Food item not found" });
      }
      // deleting item from the upload
      fs.unlink(`uploads/${food.image}`)

      await foodModel.findByIdAndDelete(req.body._id);
      return res.json({success:true, message:"food Removed"})
    } 
    catch (error) {
      console.log(error)
      res.json({success:false, message:"Error removing food"})
    }
 
}



export {addfood, listFood, removeFood}