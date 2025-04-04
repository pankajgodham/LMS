import { User } from "../models/user.model.js";
import bcrypt from "bcryptjs";
import { generateToken } from "../utils/generatetoken.js";
import { deleteMediaFromClodinary, uploadMedia } from "../utils/cloudinary.js";
export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "Please fill in all fields",
      });
    }
    const user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({
        success: false,
        message: "Email already in use",
      });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    await User.create({
      name,
      email,
      password: hashedPassword,
    });
    res.status(201).json({
      success: true,
      message: "User created successfully",
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message: "failed to register",
    });
  }
};
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ success: false, message: "Please fill in all fields" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ success: false, message: "Incorrect email or password" });
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      return res.status(400).json({ success: false, message: "Incorrect email or password" });
    }

    generateToken(res, user);

    const userData = { _id: user._id, name: user.name, email: user.email };
    return res.status(200).json({
      success: true,
      message: `Welcome back ${user.name}`,
      user: userData,
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: "Failed to login" });
  }
};

export const logout=async(_,res)=>{
  try {
    return res.status(200).cookie("token",'',{maxAge:0}).json({
      message:"Logout successfully",
      success:true

    })
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "failed to Login",
    });
  }
}

export const getUserProfile = async (req, res) => {
  try {
    const userId=req.id;
   
    
    const user=await User.findById(userId).select("-password");
   
    
    if(!user){
      return res.status(404).json({
        
        message: "profile not found",
        success: false,
      });
    }
    res.status(200).json({
      success: true,
       user,

    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "failed to Login",
    });
  }
}

export const updateProfile=async(req,res)=>{
  try {
    const userId=req.id;
    console.log(userId);
    const {name}=req.body;
    const profilePhoto=req.file;

    const user=await User.findById(userId);
    if(!user){  
      return res.status(404).json({
        
        message: "user not found",
        success: false,
      });
    }

    if(user.photoUrl){
      const publicId=user.photoUrl.split( "/").pop().split('.')[0];
      deleteMediaFromClodinary(publicId);
    }

    const cloudResponse=await uploadMedia(profilePhoto.path)
    const photoUrl=cloudResponse.secure_url;
    const updatedData={name,photoUrl};
    const updateduser=await User.findByIdAndUpdate(userId,updatedData,{new:true}).select('-password');
      
   return res.status(200).json({
      success: true,
       user:updateduser,
      message:"profile updated successfully"
    })

  } catch (error) {
    console.log(error);
    
    return res.status(500).json({
      success: false,
      message: "failed to Update Profile",
    });
  }
}
// export const myProfile = async (req, res) => {
//   try {
//     const userId = req.id;
//     let user = await User.findById(userId);
//     if (!user) {
//       return res.status(400).json({
//         error: "user not found",
//         success: false,
//       });
//     }
    
    
//     return res.status(200).json({
//       success:true,
//       user
//     });
//   } catch (error) {
//     console.log(error);
//   }
// };
