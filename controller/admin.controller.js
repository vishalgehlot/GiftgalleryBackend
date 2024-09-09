import Admin from "../model/admin.model.js";
import { validationResult } from "express-validator";
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

export const signUp = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty())
    return res.status(401).json({ Error: errors.array() });

  const { name, email, password, contact } = req.body;

  const admin = new Admin({
    name,
    email,
    password,
    contact
  });

  admin.save()
    .then(result => {
      return res.status(200).json({ message: "Admin sign up successfully...", admin: result });
    })
    .catch(err => {
      console.error(err);
      return res.status(401).json({ message: "Something went wrong..." });
    });
}

export const findByEmail = (req, res, next) => {
  const { email } = req.body;

  Admin.findOne({ email })
    .then(result => {
      if (!result) {
        return res.status(404).json({ message: "Admin not found" });
      }
      return res.status(200).json({ message: "Admin found", admin: result });
    })
    .catch(err => {
      console.error(err);
      return res.status(401).json({ message: "Something went wrong" });
    });
}

export const updatePassword = (req, res, next) => {
  const { email, password } = req.body;

  Admin.findOne({ email })
    .then(admin => {
      if (!admin) {
        return res.status(404).json({ message: "Admin not found" });
      }

      admin.password = password;
      return admin.save();
    })
    .then(() => {
      return res.status(200).json({ message: "Password updated successfully..." });
    })
    .catch(err => {
      console.error(err);
      return res.status(401).json({ message: "Something went wrong" });
    });
}

export const signIn = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const admin = await Admin.findOne({ email });
    if (!admin) {
      return res.status(401).json({ message: "Unauthorized admin..." });
    }

    const isPasswordValid = await admin.checkPassword(password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Unauthorized user access" });
    }

    const token = jwt.sign({ id: admin._id }, 'your_jwt_secret', { expiresIn: '1h' });

    return res.status(200).json({ message: "Sign in successfully...", token });
  } catch (err) {
    console.error(err);
    return res.status(401).json({ message: "Something went wrong" });
  }
}
