import Stripe from 'stripe';
import {Cource} from "../models/cource.model.js"
import { CourcePurchase } from '../models/purchaseCource.model.js';
const stripe=new Stripe(process.env.STRIPE_SECRET_KEY)

export const createCheckoutSession=async(req,res)=>{
    try {
        const userId=req.id;
        const {courceId}=req.body;
        const cource=await Cource.findById(courceId)
        if(!cource)return res.status(404).json({message:"Course not found"})


        const newPurchase=CourcePurchase({
            courceId,
            userId,
            amount:cource.courcePrice,
            status:"pending",
        })

        const session = await stripe.checkout.sessions.create({
            payment_method_types: ["card"],
            line_items: [
              {
                price_data: {
                  currency: "inr",
                  product_data: {
                    name: cource.courceTitle,
                    images: [cource.courceThumbnail],
                  },
                  unit_amount: cource.coursePrice * 100, // Amount in paise (lowest denomination)
                },
                quantity: 1,
              },
            ],
            mode: "payment",
            success_url: `http://localhost:5173/cource-progress/${courceId}`, // once payment successful redirect to course progress page
            cancel_url: `http://localhost:5173/cource-detail/${courceId}`,
            metadata: {
              courceId: courceId,
              userId: userId,
            },
            shipping_address_collection: {
              allowed_countries: ["IN"], // Optionally restrict allowed countries
            },
          });
      
          if (!session.url) {
            return res
              .status(400)
              .json({ success: false, message: "Error while creating session" });
          }
      
          // Save the purchase record
          newPurchase.paymentId = session.id;
          await newPurchase.save();
      
          return res.status(200).json({
            success: true,
            url: session.url, // Return the Stripe checkout URL
          });
    } catch (error) {
        console.log(error);
        
    }
};
export const stripeWebhook = async (req, res) => {
    let event;
  
    try {
      const payloadString = JSON.stringify(req.body, null, 2);
      const secret = process.env.WEBHOOK_ENDPOINT_SECRET;
  
      const header = stripe.webhooks.generateTestHeaderString({
        payload: payloadString,
        secret,
      });
  
      event = stripe.webhooks.constructEvent(payloadString, header, secret);
    } catch (error) {
      console.error("Webhook error:", error.message);
      return res.status(400).send(`Webhook error: ${error.message}`);
    }
  
    // Handle the checkout session completed event
    if (event.type === "checkout.session.completed") {
      console.log("check session complete is called");
  
      try {
        const session = event.data.object;
  
        const purchase = await CourcePurchase.findOne({
          paymentId: session.id,
        }).populate({ path: "courceId" });
  
        if (!purchase) {
          return res.status(404).json({ message: "Purchase not found" });
        }
  
        if (session.amount_total) {
          purchase.amount = session.amount_total / 100;
        }
        purchase.status = "completed";
  
        // Make all lectures visible by setting `isPreviewFree` to true
        if (purchase.courceId && purchase.courceId.lectures.length > 0) {
          await Lecture.updateMany(
            { _id: { $in: purchase.courceId.lectures } },
            { $set: { isPreviewFree: true } }
          );
        }
  
        await purchase.save();
  
        // Update user's enrolledCourses
        await User.findByIdAndUpdate(
          purchase.userId,
          { $addToSet: { enrolledCourses: purchase.courceId._id } }, // Add course ID to enrolledCourses
          { new: true }
        );
  
        // Update course to add user ID to enrolledStudents
        await Course.findByIdAndUpdate(
          purchase.courceId._id,
          { $addToSet: { enrolledStudents: purchase.userId } }, // Add user ID to enrolledStudents
          { new: true }
        );
      } catch (error) {
        console.error("Error handling event:", error);
        return res.status(500).json({ message: "Internal Server Error" });
      }
    }
    res.status(200).send();
  };
  export const getCourseDetailWithPurchaseStatus = async (req, res) => {
    try {
      const { courceId } = req.params;
      const userId = req.id;
  
      const cource = await Cource.findById(courceId)
        .populate({ path: "creator" })
        .populate({ path: "lectures" });
  
      const purchased = await CourcePurchase.findOne({ userId, courceId });
      console.log(purchased);
  
      if (!cource) {
        return res.status(404).json({ message: "course not found!" });
      }
  
      return res.status(200).json({
        cource,
        purchased: !!purchased, 
      });
    } catch (error) {
      console.log(error);
    }
  };