import {User} from "../models/user.model.js";
import bcrypt from "bcryptjs";
import { generateToken } from "../utils/generateToken.js";
import { deletemedia, uploadmedia } from "../utils/cloudinary.js";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
  try {
    const {
      name,
      email,
      password,
      phoneNumber,
      dateOfBirth,
      gender,
      address,
      city,
      state,
      pinCode,
      country,
    } = req.body;

    

    // Required fields
    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "Please fill all required fields",
      });
    }

    // Check if user already exists
    const user = await User.findOne({ email });

    if (user) {
      return res.status(400).json({
        success: false,
        message: "User already exists",
      });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    await User.create({
      name,
      email,
      password: hashedPassword,
      phoneNumber,
      dateOfBirth,
      gender,
      address,
      city,
      state,
      pinCode,
      country,
    });

    return res.status(201).json({
      success: true,
      message: "User registered successfully",
    });
  } catch (err) {
    console.error(err);

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
export const login = async (req, res) => {
    try{
        const { email, password } = req.body; 
        if(!email || !password){
            return res.status(400).json({
                success: false,
                message: "Please fill all fields" })
        }
        const user = await User.findOne({ email });
        if(!user){
            return res.status(400).json({
                success: false,
                message: "incorrect email or password" })
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if(!isPasswordValid){
            return res.status(400).json({
                success: false,
                message: "incorrect email or password" })
        }
        generateToken(user, res,`Welcome back ${user.name}`,200);
    }catch(err){
        console.error(err);
        return res.status(500).json({
            success: false,
            message: "Internal server error" })
    }
    }
    export const logout = (req, res) => {
  return res
    .cookie("token", "", {
      maxAge: 0,
      httpOnly: true,
      sameSite: "strict",
    })
    .json({
      success: true,
      message: "Logged out successfully",
    });
};
    export const getuser = async (req, res) => {
        try{
            const userid=req.id;
            const user = await User.findById(userid).select("-password").populate({
  path: "enrolledCourses",
  populate: {
    path: "creator",
    select: "name photoUrl"
  }
});
            if(!user){
                return res.status(404).json({
                    success: false,
                    message: "User not found" })
            }
            return res.status(200).json({
                success: true,
                user })
        }catch(err){
            console.error(err);
            return res.status(500).json({
                success: false,
                message: "Failed to load user" })
        }
    }
export const updateProfile = async (req, res) => {
  try {
    const userid = req.id;

    const {
      name,
      phoneNumber,
      dateOfBirth,
      gender,
      address,
      city,
      state,
      pinCode,
      country,
    } = req.body;

    const profilePhoto = req.file;

    const user = await User.findById(userid);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
        success: false,
      });
    }

    
    const updateddata = {
      name,
      phoneNumber,
      dateOfBirth,
      gender,
      address,
      city,
      state,
      pinCode,
      country,
    };

  let oldPhotoPublicId = null;

if (profilePhoto) {
  if (user.photoUrl) {
    oldPhotoPublicId = user.photoUrl
      .split("/")
      .pop()
      .split(".")[0];
  }
  const cloudresponse = await uploadmedia(
    profilePhoto.path
  );

  updateddata.photoUrl = cloudresponse.secure_url;
}
    const updateduser = await User.findByIdAndUpdate(
  userid,
  updateddata,
  {
    new: true,
    runValidators: true,
  }
).select("-password");

if (oldPhotoPublicId) {
  deletemedia(oldPhotoPublicId).catch((err) => {
    console.error("Old photo deletion failed:", err);
  });
}

    return res.status(200).json({
  success: true,
  message: "Profile updated successfully",
  user: updateduser,
})
  } catch (err) {
  console.error("UPDATE PROFILE ERROR:", err);

  return res.status(500).json({
    success: false,
    message: err.message,
  });
}
};


    export const checkSession = async (req, res) => {
  try {
    const token = req.cookies.token;

    // Guest
    if (!token) {
      return res.status(200).json({
        authenticated: false,
      });
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.SECRET_KEY);

    const user = await User.findById(decoded.userId).select("-password");

    if (!user) {
      return res.status(200).json({
        authenticated: false,
      });
    }

    // Logged in
    return res.status(200).json({
      authenticated: true,
      user,
    });

  } catch (error) {
    return res.status(200).json({
      authenticated: false,
    });
  }
};