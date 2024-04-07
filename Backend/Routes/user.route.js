import express from "express";
const routes = express.Router();
import bcrypt from "bcryptjs";
import User from "../Models/user.model.js";
import jwt from "jsonwebtoken";
import Admin from "../Models/admin.model.js";
import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.MY_EMAIL,
    pass: process.env.MY_PASSWORD,
  },
});

routes.get("/", (req, res) => {
  res.send("User routes Working");
});

routes.post("/register", async (req, res) => {
  try {
    const { name, email, address, dob, aadharCard } = req.body;

    if (!name || !email || !aadharCard || !dob || !address) {
      return res
        .status(400)
        .json({ isOk: false, message: "All fields are required" });
    }

    const isUserExist = await User.findOne({ email });

    if (isUserExist) {
      return res
        .status(400)
        .json({ isOk: false, message: "User already exist" });
    }

    const newUser = await User.create({
      name: name,
      email: email,
      aadharCard: aadharCard,
      dob: dob,
      address: address,
    });

    if (!newUser) {
      return res
        .status(500)
        .json({ isOk: false, message: "User cannot be created" });
    }

    return res
      .status(200)
      .json({ isOk: true, message: "User created successfully" });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ isOk: false, message: "Internal Server Error" });
  }
});

routes.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res
        .status(400)
        .json({ isOk: false, message: "Email and password are required" });
    }

    const isUserExist = await Admin.findOne({ email });
    if (!isUserExist) {
      return res
        .status(400)
        .json({ isOk: false, message: "User doesnot exist with this email" });
    }

    const isPasswordMatch = await bcrypt.compare(
      password,
      isUserExist.password
    );
    if (!isPasswordMatch) {
      return res
        .status(400)
        .json({ isOk: false, message: "Password is incorrect" });
    }

    const accessToken = await jwt.sign(
      { id: isUserExist._id },
      process.env.ASSESSTOKEN_SECRET_KEY,
      { expiresIn: "3d" }
    );

    const refreshToken = await jwt.sign(
      { id: isUserExist._id },
      process.env.REFRESHTOKEN_SECRET_KEY,
      { expiresIn: "10d" }
    );

    if (!accessToken) {
      return res.status(400).json({
        isOk: false,
        message: "Access token not generated",
      });
    }

    if (!refreshToken) {
      return res.status(400).json({
        isOk: false,
        message: "Refresh token not generated",
      });
    }

    res.cookie("access_token", accessToken, { httpOnly: true });
    res.cookie("refresh_token", refreshToken, { httpOnly: true });

    res.status(200).json({
      isOk: true,
      message: "User logged in successfully",
      accessToken,
      refreshToken,
    });
    
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ isOk: false, message: "Internal Server Error" });
  }
});

routes.get("/allusers", async function (req, res) {
  try {
    const allusers = await User.find();
    if (allusers.length == 0) {
      return res.status(200).json({
        isOk: true,
        message: "No users found",
      });
    }
    return res
      .status(200)
      .json({ isOk: true, users: allusers, message: "All users found" });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ isOk: false, message: "Internal Server Error" });
  }
});

routes.put("/updateuser/:id", async (req, res) => {
  try {
    const { id } = req.params;
    // console.log("ID is : "+id);
    const { name, email, aadharCard, address, dob } = req.body;

    const updatedUser = await User.findByIdAndUpdate(
      { _id: id },
      { name, email, aadharCard, address, dob }
    );

    if (!updatedUser) {
      return res.status(500).json({ isOk: false, message: "user not updated" });
    }
    return res.status(200).json({ isOk: true, message: "user updated" });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ isOk: false, message: "Internal Server Error" });
  }
});

routes.delete("/deleteuser/:id", async (req, res) => {
  const { id } = req.params;

  try {
    // Fetch the user details from the database
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ isOk: false, message: "User not found" });
    }

    // Delete the user from the database
    await User.findByIdAndDelete(id);

    // Send email notification to the user
    const mailOptions = {
      from: process.env.MY_EMAIL,
      to: user.email,
      subject: "Generated UUID",
      text: `Dear ${user.name},\nYour account has been approved by admin and your UUID is ${id}`,
    };

    // Send the email
    await transporter.sendMail(mailOptions);

    // Return success response
    return res
      .status(200)
      .json({ isOk: true, message: "User deleted and email sent" });
  } catch (error) {
    console.error("Error deleting user:", error);
    // If an error occurs, send an internal server error response
    return res
      .status(500)
      .json({ isOk: false, message: "Internal Server Error" });
  }
});

export default routes;
