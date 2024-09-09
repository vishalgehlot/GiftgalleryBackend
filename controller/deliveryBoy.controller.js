import DeliveryBoy from '../model/deliveryBoy.model.js';
import { validationResult } from 'express-validator';
import jwt from 'jsonwebtoken';

export const signUp = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(401).json({ Error: errors.array() });
  }
  try {
    const deliveryBoy = new DeliveryBoy({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      contact: req.body.contact
    });
    const result = await deliveryBoy.save();
    return res.status(200).json({ message: "DeliveryBoy signed up successfully...", deliveryBoy: result });
  } catch (err) {
    console.log(err);
    return res.status(401).json({ message: "Something went wrong..." });
  }
};

export const findByEmail = async (req, res, next) => {
  try {
    const result = await DeliveryBoy.findOne({ email: req.body.email });
    return res.status(200).json({ message: result });
  } catch (err) {
    return res.status(401).json({ message: "Something went wrong" });
  }
};

export const list = async (req, res, next) => {
  try {
    const result = await DeliveryBoy.find();
    return res.status(200).json({ users: result });
  } catch (err) {
    return res.status(401).json({ message: "Something went wrong" });
  }
};

export const updatePassword = async (req, res, next) => {
  console.log("called...");
  const email = req.body.email;
  try {
    const deliveryBoy = await DeliveryBoy.findOne({ email: email });
    if (!deliveryBoy) {
      return res.status(404).json({ message: "DeliveryBoy not found" });
    }
    deliveryBoy.password = req.body.password;
    await deliveryBoy.save();
    return res.status(200).json({ message: "Password updated successfully..." });
  } catch (err) {
    console.log(err);
    return res.status(401).json({ message: "Something went wrong" });
  }
};

export const signIn = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const user = await DeliveryBoy.findOne({ email: email });
    console.log(user);
    if (user) {
      const isPasswordValid = await user.checkPassword(password);
      console.log(password);
      if (isPasswordValid) {
        return res.status(200).json({ message: "Sign in successfully....", deliveryBoy: user });
      }
      console.log(err);
      return res.status(401).json({ message: "Unauthorized user access" });
    }
    return res.status(401).json({ message: "Unauthorized deliveryBoy..." });
  } catch (err) {
    return res.status(500).json({ message: "Something went wrong", err });
  }
};
