// import express from 'express';

// import { signUp, signIn, updatePassword, list } from '../controller/deliveryBoy.controller.js';
// import { body } from 'express-validator';

// const router = express.Router();

// router.post("/signUp", signUp);
// router.post("/signIn", signIn);
// router.post("/updatePassword", updatePassword)
// router.get("/list", list)


// export default router;

import express from 'express';
import { signUp, findByEmail, list, updatePassword, signIn } from '../controller/deliveryBoy.controller.js';
import { check } from 'express-validator';

const router = express.Router();

router.post('/signup', [
  check('name').not().isEmpty(),
  check('email').isEmail(),
  check('password').isLength({ min: 6 }),
  check('contact').isLength({ min: 10, max: 10 })
], signUp);

router.post('/find-by-email', findByEmail);
router.get('/list', list);
router.put('/update-password', updatePassword);
router.post('/signin', signIn);

export default router;

