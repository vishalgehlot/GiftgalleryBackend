import express from 'express'
import { addContact } from '../controller/contactus.controller.js';

const route = express.Router();

route.post('/addContact', addContact);

export default route