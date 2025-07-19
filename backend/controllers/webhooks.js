import { Webhook } from "svix";
import User from "../models/User.js";
import Stripe from "stripe";
import Course from "../models/Course.js";
import { Purchase } from "../models/Purchase.js";
export const clerkWebhooks = async (req, res) => {
  try {
    const whook = new Webhook(process.env.CLERK_WEBHOOK_SECRET);

    
    await whook.verify(
      JSON.stringify(req.body),
      {
        "svix-id": req.headers["svix-id"],
        "svix-timestamp": req.headers["svix-timestamp"],
        "svix-signature": req.headers["svix-signature"],
      }
    );

    const { data, type } = req.body;
    console.log("Webhook received:", type);

    switch (type) {
      case "user.created": {
        const userData = {
          _id: data.id,
          email: data.email_addresses?.[0]?.email_address ?? "",
          name: `${data.first_name ?? ""} ${data.last_name ?? ""}`.trim(),
          imageUrl: data.image_url,
        };
        await User.create(userData);
        return res.status(200).end();
      }

      case "user.updated": {
        const userData = {
          email: data.email_addresses?.[0]?.email_address ?? "",
          name: `${data.first_name ?? ""} ${data.last_name ?? ""}`.trim(),
          imageUrl: data.image_url,
        };
        await User.findByIdAndUpdate(data.id, userData);
        return res.status(200).end();
      }

      case "user.deleted": {
        await User.findByIdAndDelete(data.id);
        return res.status(200).end();
      }

      default:
        console.warn("Unhandled webhook type:", type);
        return res.status(200).end();
    }
  } catch (error) {
    console.error("Webhook error:", error.message);
    return res.status(400).json({ success: false, message: error.message });
  }
};


const stripeInstance = new Stripe(process.env.STRIPE_SECRET_KEY)

export const stripeWebhooks = async (req, res) => {
  const sig = req.headers['stripe-signature']

  let event

  try {
    event = stripeInstance.webhooks.constructEvent(
      req.body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    )
  } catch (err) {
    return res.status(400).send(`Webhook Error: ${err.message}`)
  }

  switch (event.type) {
    case 'payment_intent.succeeded': {
  try {
    const paymentIntent = event.data.object

    const sessionList = await stripeInstance.checkout.sessions.list({
      payment_intent: paymentIntent.id,
      limit: 1,
    })

    const session = sessionList.data[0]

    if (!session) {
      console.error('No session found for payment_intent.succeeded')
      break
    }

    const purchaseId = session?.metadata?.purchaseId
    if (!purchaseId) {
      console.error('purchaseId not found in metadata of payment_intent.succeeded')
      break
    }

    const purchaseData = await Purchase.findById(purchaseId)
    if (!purchaseData) {
      console.error('Purchase not found')
      break
    }

    const userData = await User.findById(purchaseData.userId)
    const courseData = await Course.findById(purchaseData.courseId)

    if (!userData || !courseData) {
      console.error('User or Course not found')
      break
    }

    if (!courseData.enrolledStudents.includes(userData._id)) {
      courseData.enrolledStudents.push(userData._id)
      await courseData.save()
    }

    if (!userData.enrolledCourses.includes(courseData._id)) {
      userData.enrolledCourses.push(courseData._id)
      await userData.save()
    }

    purchaseData.status = 'completed'
    await purchaseData.save()
      console.log('Saved course:', courseData._id)
      console.log('Saved user:', userData._id)
      console.log('Updated purchase:', purchaseData.status)

    console.log('User enrolled from payment_intent.succeeded')
  } catch (err) {
    console.error('Error processing payment_intent.succeeded:', err.message)
  }
  break
}


    case 'payment_intent.payment_failed': {
      try {
        const paymentIntent = event.data.object

        const sessionList = await stripeInstance.checkout.sessions.list({
          payment_intent: paymentIntent.id,
        })

        const session = sessionList.data[0]
        const purchaseId = session?.metadata?.purchaseId

        if (!purchaseId) {
          console.error('purchaseId not found in failed session metadata')
          break
        }

        const purchaseData = await Purchase.findById(purchaseId)
        if (purchaseData) {
          purchaseData.status = 'failed'
          await purchaseData.save()
        }
      } catch (err) {
        console.error('Error processing payment_intent.payment_failed:', err.message)
      }
      break
    }

    default:
      console.log(`Unhandled event type ${event.type}`)
  }

  res.json({ received: true })
}
