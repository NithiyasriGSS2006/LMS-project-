import User from '../models/User.js'
import { Purchase } from "../models/Purchase.js";
import Stripe from 'stripe'
import Course from '../models/Course.js';
export const getUserData = async (req,res)=>{
      try{
        
        const {userId} = req.auth();
        const user = await User.findById(userId)

        if(!user)
              return res.json({success:false,message:'user not found'})
        
        res.json({success:true,user})
      }catch(error)
      {
           res.json({success:false,message: error.message})
      }
}

export const userEnrolledCourses = async (req, res) => {
  try {
    const { userId } = req.auth();
   console.log("AUTH:", req.auth());
    const userData = await User.findById(userId);

    if (!userData) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    res.json({ success: true, enrolledCourses: userData.enrolledCourses });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};



export const purchaseCourse = async (req, res) => {
  try {
    const { courseId } = req.body;
    const { origin } = req.headers;

    if (!courseId) {
      return res.status(400).json({ success: false, message: "courseId is required in the body" });
    }

    if (!origin || !origin.startsWith('http')) {
      return res.status(400).json({ success: false, message: "Invalid origin URL: must include http:// or https://" });
    }

    const userId = req.auth.userId;
    const userData = await User.findById(userId);
    const courseData = await Course.findById(courseId);

    if (!userData || !courseData) {
      return res.status(404).json({ success: false, message: "User or Course not found" });
    }

    const finalAmount = parseFloat(
      (courseData.coursePrice - courseData.discount * courseData.coursePrice / 100).toFixed(2)
    );

    const newPurchase = await Purchase.create({
      courseId: courseData._id,
      userId,
      amount: finalAmount,
    });

    const stripeInstance = new Stripe(process.env.STRIPE_SECRET_KEY);
    const currency = process.env.CURRENCY.toLowerCase(); // e.g. "usd", "inr"

    const session = await stripeInstance.checkout.sessions.create({
      success_url: `${origin}/my-enrollments`,
      cancel_url: `${origin}/`,
      line_items: [
        {
          price_data: {
            currency: currency,
            product_data: {
              name: courseData.courseTitle,
            },
            unit_amount: Math.floor(finalAmount * 100), // Stripe expects amount in cents/paise
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      metadata: {
        purchaseId: newPurchase._id.toString(),
      },
    });
    
    res.json({ success: true, session_url: session.url });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
