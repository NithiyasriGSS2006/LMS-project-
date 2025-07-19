import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import connectDB from './configs/mongodb.js';
import { clerkWebhooks,stripeWebhooks } from './controllers/webhooks.js';
import { clerkMiddleware, requireAuth } from '@clerk/express';
import educatorRouter from './routes/educatorRoutes.js';
import connectCloudinary from './configs/cloudinary.js';
import courseRouter from './routes/courseRoute.js';
import userRouter from './routes/userRoute.js';

const app = express();
await connectDB();
await connectCloudinary();

app.use(cors());

app.post('/stripe',express.raw({type:'application/json'}),stripeWebhooks)
app.use(express.json());      
app.use(clerkMiddleware());


app.get('/', (req, res) => res.send("API working"));
app.post('/clerk', clerkWebhooks);  
app.use('/api/educator', educatorRouter);
app.use('/api/course', courseRouter);
app.use('/api/user', userRouter);


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});
