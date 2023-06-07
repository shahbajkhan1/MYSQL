import user from "../model/user.model.js";
import bcrypt from "bcrypt"
import Jwt from "jsonwebtoken";
import transporter from "../servic/mail.js";


export const userAdd = async (req, res) => {
    try {
        const usernameExit = await user.findOne({ where: { username: req.body.username } });
        if (usernameExit) {
            res.send({ status: false, msg: "username already exists", data: {} });
        } else {
            const otp = Math.floor(100000 + Math.random() * 900000);
            req.body.password = await bcrypt.hash(req.body.password, 10);
            req.body.otp = otp;

            const newUser = await user.create(req.body);
            const token = await Jwt.sign({ type: Date().toString(), userId: newUser.id }, 'tokentoken');
            newUser.token = token;
            await newUser.save();

            res.send({ status: true, msg: "user created", data: newUser });
        }
    } catch (error) {
        console.log(error);
        res.status(500).send({ status: false, msg: "Internal server error", data: error });
    }
};

export const userlogin = async (req, res) => {
    try {
        const login = await user.findOne({ where: { username: req.body.username } })
        if (login) {
            const passwordcompare = await bcrypt.compare(req.body.password, login.password)
            if (!passwordcompare) {
                res.send({ status: false, msg: "password wrong", data: {} })
            } else {
                res.send({ status: true, msg: "login user", data: login })
            }
        } else {
            res.send({ status: false, msg: "user not exsit", data: {} })
        }
    } catch (error) {
        console.log(error);
        res.status(500).send({ status: false, msg: "Internal server error", data: error });
    }
};

export const changepassword = async (req, res) => {
    try {
        const finduser = await user.findOne({ where: { id: req.body.id } });
        if (finduser) {
            const passcompare = await bcrypt.compare(req.body.old_password, finduser.password);
            if (passcompare) {
                const passwordhash = {
                    password: await bcrypt.hash(req.body.new_password, 10),
                };
                await user.update(passwordhash, { where: { id: finduser.id } });
                res.send({ status: true, msg: "New password created", data: finduser });
            } else {
                res.send({ status: false, msg: "Wrong password", data: {} });
            }
        } else {
            res.send({ status: false, msg: "User not found", data: {} });
        }
    } catch (error) {
        console.log(error);
        res.status(500).send({ status: false, msg: "Internal server error", data: error });
    }
};

export const sendOtpEmail = async (req, res) => {
    try {
        const otp = Math.floor(100000 + Math.random() * 900000);

        const mailOptions = {
            from: "skshahbaj01@gmail.com",
            to: "skshahbaj01@gmail.com",
            subject: "OTP Verification",
            text: `Your OTP: ${otp}`,
        }
        await transporter.sendMail(mailOptions);

        const userRecord = await user.findOne({ where: { email: req.body.email } });
        if (userRecord) {
            userRecord.otp = otp;
            await userRecord.save();
        }
        res.send({ status: true, msg: 'OTP sent successfully', data: { otp } });
    } catch (error) {
        console.log(error);
        res.status(500).send({ status: false, msg: "Internal server error", data: error });
    }
};

export const verify_email = async (req, res) => {
    try {

        const userRecord = await user.findOne({ where: { email: req.body.email } });
        if (!userRecord) {
            return res.send({ status: false, msg: "User not found", data: {} });
        }
        if (userRecord.otp == req.body.otp) {
            userRecord.verify_email = true;
            await userRecord.save();

            res.send({ status: true, msg: "Email verified successfully", data: userRecord });
        } else {
            res.send({ status: false, msg: "Incorrect OTP", data: {} });
        }
    } catch (error) {
        console.log(error);
        res.status(500).send({ status: false, msg: "Internal server error", data: error });
    }
};

export const forgetpassword = async (req, res) => {
    try {
        const userId = req.body.id;
        const newPassword = req.body.password;

        const hashedPassword = await bcrypt.hash(newPassword, 10);
        const find = await user.findByPk(userId);
        if (find) {
            await user.update({ password: hashedPassword }, { where: { id: userId } });
        }
        res.status(200).send({ status: true, msg: "Password updated successfully" });
    } catch (error) {
        res.status(500).send({ status: false, msg: "Internal server error", data: error });
    }
};