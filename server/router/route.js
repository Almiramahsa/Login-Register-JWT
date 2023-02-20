import { Router } from 'express';

const router = Router();

//import controllers
import * as controller from '../controllers/appController.js';
import Auth from '../middleware/auth.js';
import { localVariables } from '../middleware/auth.js';

// POST
router.route('/register').post(controller.register);
// router.route('/registerMail').post((reg, res) => res.json('register mail'));
router.route('/authenticate').post((reg, res) => res.end());
router.route('/login').post(controller.verifyUser, controller.login);

// GET
router.route('/user/:username').get(controller.getUser); // user with username
router.route('/generateOTP').get(controller.verifyUser, localVariables, controller.generateOTP); // generate random OTP
router.route('/verifyOTP').get(controller.verifyUser, controller.verifyOTP); // verify generated OTP
router.route('/createResetSession').get(controller.createResetSession); // reset all the variables

// PUT
router.route('/updateuser').put(Auth, controller.updateUser); // is use to update the user profile
router.route('/resetPassword').put(controller.verifyUser, controller.resetPassword); // use to reset password
export default router;
