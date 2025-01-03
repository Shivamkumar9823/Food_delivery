import orderModel from "../models/orderModel.js";
import  userModel  from "../models/userModel.js";
import Stripe from "stripe"

const STRIPE_SECRET_KEY ="sk_test_51QaLYGRsnbYXift47t6SC7MVhJmyPy4kmnpEPk4UwmHZF90ZRpLrk2dZ93LcQuR2MtPqAksU617kqW3VfJipcFB9005HGxNPk5";
const stripe = new Stripe(STRIPE_SECRET_KEY)

//placing user order for frontend
const placeOrder = async (req,res) =>{
    console.log("request received.",req.body);
    console.log("request received.",req.headers);
    const frontend_url = "http://localhost:5173"
    try {
       const newOrder = new orderModel({
        userId:req.body.userId,
        items:req.body.items,
        amount:req.body.amount,
        address:req.body.address
       })
       await newOrder.save();
       await userModel.findByIdAndUpdate(req.body.userId,{cartData:{}});//clear the cartData;

       const line_items = req.body.items.map((item)=>({
        price_data:{
            currency:"inr",
            product_data:{name:item.name},
            unit_amount:item.price*100*80
        },
        quantity:item.quantity
       }))

       line_items.push({
        price_data:{
            currency:"inr",
            product_data:{
                name:"Delivery charges"
            },
            unit_amount:2*100*80
        },
        quantity:1
       })

       const session = await stripe.checkout.sessions.create({
        line_items:line_items,
        mode:'payment',
        success_url:`${frontend_url}/verify?success=true&orderId=${newOrder._id}`,
        cancel_url:`${frontend_url}/verify?success=false&orderId=${newOrder._id}`
       })
       res.json({success:true,session_url:session.url})

        
    } catch (error) {
        console.log(error);
        res.json({success:false,message:"Error"});
        
    }
}

const verifyOrder = async (req, res) =>{
    const {orderId, success} = req.body;
    try {
        if(success=="true"){
            await orderModel.findByIdAndUpdate(orderId,{payment:true});
            res.json({success:true, message:"paid"})
        }
        else{
            await orderModel.findByIdAndDelete(orderId);
            res.json({success:false, message:"Not paid"})
        }

    } catch (error) {
        console.log(error);
        res.json({success:false, message:"error"})
    }
}

//orders
const userOrders = async (req, res) =>{
    try {
        const orders = await orderModel.find({userId: req.body.userId});
        res.json({success:true, data:orders})
    } catch (error) {
        console.log(error);
        res.json({success:false, message:"Error"})
        
    }
 
}

//Listing orders for admin
const listOrders = async (req,res)=>{
    try {
        const orders = await orderModel.find({}); // fetching all orders from orderModel by all users.
        res.json({success:true,data:orders})

    } catch (error) {
        console.log(error);
        res.json({success:false,message:"Error"})
    }
}


//updating order status by admin
const updateStatus = async (req, res) =>{
    try{
        await orderModel.findByIdAndUpdate(req.body.orderId,{status:req.body.status})

        res.json({success:true, message:"status updated"})

    }
    catch(error){
        console.log(error);
        res.json({success:false,message:"Error"});
    }
}



export {placeOrder, verifyOrder, userOrders, listOrders, updateStatus}