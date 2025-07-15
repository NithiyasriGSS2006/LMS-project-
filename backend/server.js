import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import connectDB from './configs/mongodb.js';
import { clerkWebhooks } from './controllers/webhooks.js';
import { clerkMiddleware, requireAuth } from '@clerk/express';
import educatorRouter from './routes/educatorRoutes.js';

const app = express();
await connectDB();

// ✅ Global Middlewares
app.use(cors());
app.use(express.json());       // 👈 Important!
app.use(clerkMiddleware());

// ✅ Routes
app.get('/', (req, res) => res.send("API working"));
app.post('/clerk', clerkWebhooks);  // Already has express.json() from global use

// ✅ Protected educator routes
app.use('/api/educator', requireAuth(), educatorRouter);

// ✅ Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});
