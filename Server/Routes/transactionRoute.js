import express from 'express'; 
import isAuthenticated from '../Middlewares/Auth.js'; 
import transactionController from '../Controllers/transactionController.js';
const transactionRoute = express.Router();

transactionRoute.post("/api/transaction/create", isAuthenticated,transactionController.create);
transactionRoute.get("/api/transaction/lists", isAuthenticated,transactionController.transactionLists);
transactionRoute.put("/api/transaction/update/:id", isAuthenticated,transactionController.update);
transactionRoute.delete("/api/transaction/delete/:id", isAuthenticated,transactionController.delete); 

export default transactionRoute;
