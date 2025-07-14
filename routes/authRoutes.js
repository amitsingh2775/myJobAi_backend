import express from "express"
const router=express.Router()
import {Register,logOut,login,getME,verifyOTP,resendOTP} from "../controllers/authController.js"

import { requiredAuth } from "../middleware/authMiddleware.js"

router.post("/register",Register)
router.post("/verify",verifyOTP)
router.post("/login",login)
router.post("/logout",requiredAuth,logOut)
router.get("/me",requiredAuth,getME)
router.post("/resend-otp", resendOTP);


export default router