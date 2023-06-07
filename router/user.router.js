import  Express  from "express";
import { changepassword, forgetpassword, sendOtpEmail, userAdd, userlogin, verify_email } from "../controller/user.con.js";

const userRoute = Express.Router();
userRoute.route('/user/add').post(userAdd)
userRoute.route('/user/login').get(userlogin)
userRoute.route('/user/password/change').put(changepassword)
userRoute.route('/user/otp/send').post(sendOtpEmail)
userRoute.route('/user/otp/verify').get(verify_email)
userRoute.route('/user/forgetpassword').put(forgetpassword)

export default userRoute