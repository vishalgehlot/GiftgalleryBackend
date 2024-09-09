import express from 'express';
import { signUp, userList, signIn, findByEmail, addUsers, removeUser, updatePassword, resetPassword } from '../controller/user.controller.js';
import { body } from 'express-validator';

const router = express.Router();
router.post("/signUp", signUp);
router.get("/userList", userList);
router.post("/findByEmail", findByEmail);
router.post("/signIn", signIn);
router.delete("/removeUser", removeUser)
router.post("/updatePassword", updatePassword)
router.post("/addUsers", addUsers)
router.post("/resetPassword", resetPassword)

export default router;
