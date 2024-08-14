import express from 'express';
import userController from '../Controllers/userController.js';
import isAuthenticated from '../Middlewares/Auth.js';
const userRouter = express.Router();

userRouter.post("/api/users/register", userController.register);
userRouter.post("/api/users/login", userController.login);
userRouter.get("/api/users/profile",isAuthenticated, userController.profile);

userRouter.put("/api/users/changepassword",isAuthenticated, userController.changeUserPassword);
userRouter.put("/api/users/update-profile",isAuthenticated, userController.updateUserProfile);

export default userRouter;
