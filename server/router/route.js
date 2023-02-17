import { Router } from 'express';

const router = Router();

//import controllers
import * as controller from '../controllers/appController.js';

// POST
router.route('/register').post(controller.register);
// router.route('/registerMail').post((reg, res) => res.json('register mail'));
router.route('/authenticate').post((reg, res) => res.end());
router.route('/login').post(controller.verifyUser, controller.login);

// GET
router.route('/user/:username').get(controller.getUser);
router.route('/user/:generateOTP').get(controller.generateOTP);
router.route('/user/:verifyOTP').get(controller.verifyOTP);
router.route('/user/:createResetSession').get(controller.createResetSession);
// PUT
router.route('/updateuser').put(controller.updateUser);
router.route('/resetPassword').put(controller.resetPassword);
export default router;
