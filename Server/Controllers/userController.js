import asyncHandler from 'express-async-handler';
import bcrypt from 'bcryptjs';
import JWT from 'jsonwebtoken'
import userModel from '../Models/UserModel.js'; 

const userController = {
  // Register
  register: asyncHandler(async (req, res) => { 
    const { userName, email, password } = req.body;
    if(!userName || !email || !password){
        throw new Error("Please provide All required fields");
    }
    const userExists = await userModel.findOne({ email });
    if(userExists){
       throw new Error("User already exists..!");
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const newUser = await userModel.create({
        email,
        userName,
        password : hashedPassword
    });
    //console.log(req.body); 
    res.json({
        userName: newUser.userName,
        email: newUser.email,
        id: newUser._id,
    });
  }),

  // Login
    login: asyncHandler(async(req,res)=>{
        const { email,password } = req.body;
        const userFind = await userModel.findOne({ email });
        if(!userFind){
            throw new Error('Invalid Email or Password....!');
        }
        const isMatch = await bcrypt.compare(password, userFind.password);
        if(!isMatch){
            throw new Error("Invalid Email or Password.....!");
        }
        const Token = JWT.sign({ id:userFind._id}, process.env.JWT_TOKEN_KEY,{
            expiresIn: "30d",
        });
        res.json({
            message: "Login Success",
            Token,
            id: userFind._id,
            email: userFind.email,
            userName: userFind.userName, 
        })
    }), 
  // Profile
  profile: asyncHandler(async(req,res) => {
    //console.log(req.userById);
    const userById = await userModel.findById(req.userById);
    if(!userById){
        throw new Error("User Not Found...!");
    }
   res.json({ userName: userById.userName, email: userById.email });
  }),
  // changePassword
  changeUserPassword: asyncHandler(async(req,res) => { 
    const {newPassword} = req.body;
    const userById = await userModel.findById(req.userById);
    if(!userById){
        throw new Error("User Not Found...!");
    } 

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    userById.password = hashedPassword; 
    await userById.save({
        validateBeforeSave: false,
    });

   res.json({ message: "Password Changed Successfully" });
  }),

    // updateProfile
    updateUserProfile: asyncHandler(async(req,res) => { 
        const { email,userName } = req.body;
        const updateUser = await userModel.findByIdAndUpdate(req.userById,{
            userName,
            email,
        },{
            new: true, 
        }); 
    
       res.json({ message: "User Profile Updated Successfully", updateUser });
      }),
};

export default userController; 