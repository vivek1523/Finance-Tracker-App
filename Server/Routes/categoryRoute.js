import express from 'express'; 
import isAuthenticated from '../Middlewares/Auth.js';
import categoryController from '../Controllers/categoryController.js';
const categoryRouter = express.Router();

categoryRouter.post("/api/categories/create", isAuthenticated,categoryController.create);
categoryRouter.get("/api/categories/lists", isAuthenticated,categoryController.lists);
categoryRouter.put("/api/categories/update/:id", isAuthenticated,categoryController.update);
categoryRouter.delete("/api/categories/delete/:id", isAuthenticated,categoryController.delete); 

export default categoryRouter;