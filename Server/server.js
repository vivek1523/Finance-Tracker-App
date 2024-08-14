import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors' 
import userRouter from './Routes/userRouter.js';
import mongoose from 'mongoose';
import errorHandler from './Middlewares/ErrorHandler.js';
import categoryRouter from './Routes/categoryRoute.js';
import transactionRoute from './Routes/transactionRoute.js';

dotenv.config(); 

const app = express();
const PORT = process.env.PORT || 6000;
 
app.use(express.json());

app.use(cors({
  origin: 'https://finance-tracker-app-frontend-urre.onrender.com',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

app.use('/', userRouter);
app.use("/", categoryRouter);
app.use("/", transactionRoute) 
 

app.use(errorHandler);

mongoose.connect("mongodb+srv://vivekram4560:kRUbcnEktJ3jl0FT@cluster0.ez1rj.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
  .then(() => {
    console.log("MongoDB Connected Successfully");
  })
  .catch((error) => {
    console.log(error);
  });

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
