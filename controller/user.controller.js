import User from "../model/user.model.js"
import { validationResult } from 'express-validator';
import jwt from 'jsonwebtoken';

export const signUp = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(401).json({ errors: errors.array() });
  }

  try {
    const newUser = await User.create({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      contact: req.body.contact
    });

    return res.status(200).json({ data: newUser, message: "User Created." });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ err: "Internal Server Error.", err });
  }
};

export const addUsers = async (req, res, next) => {
  const users = req.body;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(401).json({ errors: errors.array() });
  }

  try {
    for (let user of users) {
      const newUser = new User({
        name: user.name,
        email: user.email,
        password: user.password,
        contact: user.contact
      });
      await newUser.save();
    }
    res.status(200).json({ message: "All users added into table" });
  } catch (err) {
    console.error(err);
    res.status(400).json({ message: "Internal server error" });
  }
};

export const userList = async (req, res, next) => {
  try {
    const users = await User.find();
    res.status(200).json({ users });
  } catch (err) {
    console.error(err);
    res.status(401).json({ message: "Something went wrong" });
  }
};

export const findByEmail = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    res.status(200).json({ user });
  } catch (err) {
    console.error(err);
    res.status(401).json({ message: "Something went wrong" });
  }
};

export const removeUser = async (req, res, next) => {
  try {
    const result = await User.deleteOne({ email: req.body.email });
    res.status(200).json({ message: "User removed successfully", result });
  } catch (err) {
    console.error(err);
    res.status(401).json({ message: "Something went wrong" });
  }
};

export const updatePassword = async (req, res, next) => {
  try {
    const { email, password, newPassword } = req.body;
    const user = await User.findOne({ email });

    if (!user || !(await user.checkPassword(password))) {
      return res.status(401).json({ message: "Unauthorized user" });
    }

    user.password = newPassword;
    await user.save();
    res.status(200).json({ message: "Password updated successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

export const resetPassword = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ message: "Unauthorized user" });
    }

    user.password = password;
    await user.save();
    res.status(200).json({ message: "Password changed successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

export const signIn = async (request, response, next) => {
  const { email, password } = request.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return response.status(401).json({ error: "Invalid Email or Password" });
    }

    const passwordMatch = await user.checkPassword(password);

    if (passwordMatch) {
      const token = jwt.sign({ userId: user._id }, 'secret_key', { expiresIn: '1h' });
      return response.status(200).json({ message: "Sign In Success", token });
    } else {
      return response.status(401).json({ error: "Unauthorized error" });
    }
  } catch (error) {
    console.error(error);
    return response.status(500).json({ error: "Internal Server Error", message: error.message });
  }
};